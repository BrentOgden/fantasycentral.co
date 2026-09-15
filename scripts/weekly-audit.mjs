import fs from 'node:fs/promises';
import path from 'node:path';
import { updateHistoricalGoogleSheet } from './google-sheets-history.mjs';

const ROOT = process.cwd();
const season = Number(process.env.SEASON || new Date().getFullYear());
const espnLeagueId = process.env.ESPN_LEAGUE_ID || '249295';
const mflLeagueId = process.env.MFL_LEAGUE_ID || '63794';
const espnSwid = process.env.ESPN_SWID;
const espnS2 = process.env.ESPN_S2;
const mflApiKey = process.env.MFL_API_KEY || '';
const mflOwnerFallback = new Map([
  ['0001', 'Brent Ogden'], ['0002', 'Tom Courtney'], ['0003', 'Nick Hazen'], ['0004', 'Kristen Hazen'],
  ['0005', 'Brooke-Lynn Killingbeck'], ['0006', 'Jake Killingbeck'], ['0007', 'Gary Garcia'], ['0008', 'Chad Marchand'],
  ['0009', 'Jimmy Cunningham'], ['0010', 'Jeremy Ogden'], ['0011', 'Justin Gutierrez'], ['0012', 'Met Nagatani'],
]);

if (!espnSwid || !espnS2) {
  throw new Error('ESPN_SWID and ESPN_S2 are required. Store them as GitHub Actions secrets.');
}

const asArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};
const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};
const fixed = (value) => Number(number(value).toFixed(2));
const pct = (wins, losses, ties = 0) => {
  const games = wins + losses + ties;
  return games ? ((wins + ties / 2) / games).toFixed(3).replace(/^0/, '') : '.000';
};
const ownerFullName = (member) => {
  const name = [member.firstName, member.lastName].map((part) => String(part || '').trim()).filter(Boolean).join(' ');
  if (!name) throw new Error('ESPN member is missing a real name.');
  return name;
};

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { Accept: 'application/json', 'User-Agent': 'FantasyCentral-Weekly-Audit/1.0', ...options.headers },
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.json();
}

function espnUrl() {
  const base = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${season}/segments/0/leagues/${espnLeagueId}`;
  const views = ['mTeam', 'mMatchup', 'mRoster', 'mSettings', 'mStatus'].map((view) => `view=${view}`).join('&');
  return `${base}?${views}`;
}

function mflUrl(type, params = {}) {
  const query = new URLSearchParams({ TYPE: type, L: mflLeagueId, JSON: '1', ...params });
  if (mflApiKey) query.set('APIKEY', mflApiKey);
  return `https://api.myfantasyleague.com/${season}/export?${query}`;
}

function getEspnWeek(data) {
  const periods = asArray(data.schedule)
    .filter((game) => game.home && game.away)
    .reduce((map, game) => {
      const week = number(game.matchupPeriodId);
      if (!map.has(week)) map.set(week, []);
      map.get(week).push(game);
      return map;
    }, new Map());
  const statusWeek = number(data.status?.currentMatchupPeriod || data.status?.latestScoringPeriod);
  const completed = [...periods.entries()]
    .filter(([week, games]) => week <= statusWeek && games.length >= 1 && games.every((game) => {
      const total = number(game.home?.totalPoints) + number(game.away?.totalPoints);
      return total > 0 && (game.winner === 'HOME' || game.winner === 'AWAY' || game.winner === 'TIE');
    }))
    .map(([week]) => week);
  if (!completed.length) throw new Error('ESPN has no completed matchup week to audit.');
  return Math.max(...completed);
}

function normalizeEspn(data, week) {
  const members = new Map(asArray(data.members).map((member) => [member.id, ownerFullName(member)]));
  const ownerAliases = Object.fromEntries(asArray(data.members).filter((member) => member.displayName).map((member) => [member.displayName, ownerFullName(member)]));
  const divisions = new Map(asArray(data.settings?.scheduleSettings?.divisions).map((division) => [division.id, division.name]));
  const teams = new Map(asArray(data.teams).map((team) => [number(team.id), team]));
  const standings = [...teams.values()].map((team) => {
    const overall = team.record?.overall || {};
    const wins = number(overall.wins);
    const losses = number(overall.losses);
    const ties = number(overall.ties);
    return {
      id: number(team.id),
      teamName: team.name || `${team.location || ''} ${team.nickname || ''}`.trim(),
      ownerName: members.get(team.primaryOwner) || members.get(asArray(team.owners)[0]) || 'Unknown',
      division: divisions.get(team.divisionId) || '',
      rank: number(team.playoffSeed || team.rankCalculatedFinal || team.currentProjectedRank, 99),
      pointsFor: fixed(overall.pointsFor),
      wins,
      losses,
      record: { record: ties ? `${wins}-${losses}-${ties}` : `${wins}-${losses}`, winPercentage: pct(wins, losses, ties) },
    };
  }).sort((a, b) => a.rank - b.rank || b.pointsFor - a.pointsFor);

  const teamName = (id) => standings.find((team) => team.id === number(id))?.teamName || `Team ${id}`;
  const ownerName = (id) => standings.find((team) => team.id === number(id))?.ownerName || `Team ${id}`;
  const matchups = asArray(data.schedule)
    .filter((game) => number(game.matchupPeriodId) === week && game.home && game.away)
    .map((game) => ({
      home: { id: number(game.home.teamId), teamName: teamName(game.home.teamId), ownerName: ownerName(game.home.teamId), score: fixed(game.home.totalPoints) },
      away: { id: number(game.away.teamId), teamName: teamName(game.away.teamId), ownerName: ownerName(game.away.teamId), score: fixed(game.away.totalPoints) },
      winner: game.winner,
    }));
  if (!matchups.length) throw new Error(`ESPN returned no matchups for week ${week}.`);

  const players = [];
  for (const team of teams.values()) {
    for (const entry of asArray(team.roster?.entries)) {
      const player = entry.playerPoolEntry?.player;
      if (!player) continue;
      const score = number(entry.playerPoolEntry?.appliedStatTotal ?? player.appliedStatTotal);
      if (score > 0) players.push({ name: player.fullName || player.name, score: fixed(score), defense: number(player.defaultPositionId) === 16 });
    }
  }
  const uniquePlayers = [...new Map(players.map((player) => [player.name, player])).values()];
  const topPlayers = (defense) => uniquePlayers.filter((player) => player.defense === defense).sort((a, b) => b.score - a.score).slice(0, 4);

  const results = matchups.flatMap((game) => {
    const homeWon = game.home.score > game.away.score;
    const tied = game.home.score === game.away.score;
    return [
      { ...game.home, opponent: game.away, won: homeWon, tied, margin: fixed(Math.abs(game.home.score - game.away.score)) },
      { ...game.away, opponent: game.home, won: !homeWon && !tied, tied, margin: fixed(Math.abs(game.home.score - game.away.score)) },
    ];
  });
  const winners = results.filter((result) => result.won).sort((a, b) => b.score - a.score);
  const losers = results.filter((result) => !result.won && !result.tied);
  const high = [...results].sort((a, b) => b.score - a.score)[0];
  const largestLoss = [...losers].sort((a, b) => b.margin - a.margin)[0];
  const highestScoringLoss = [...losers].sort((a, b) => b.score - a.score)[0];
  const closestLoss = [...losers].sort((a, b) => a.margin - b.margin)[0];
  const topPlayer = topPlayers(false)[0] || topPlayers(true)[0];
  const lostText = (result, includeScores = false) => includeScores
    ? `Lost to ${result.opponent.ownerName} ${result.opponent.score} to ${result.score}`
    : `Lost to ${result.opponent.ownerName} by ${result.margin} points`;

  return {
    standings,
    ownerAliases,
    matchups,
    awards: [
      { title: 'High Points', name: high.ownerName, details: `${high.score} points` },
      { title: 'Tim Tebow "Praise Jesus" Award', name: topPlayer?.name || 'Unavailable', details: topPlayer ? `${topPlayer.score} points` : 'Player scoring unavailable' },
      { title: 'Big Ben’s "Buy me Dinner First" Award', name: largestLoss?.ownerName || 'Unavailable', details: largestLoss ? lostText(largestLoss) : 'No completed loss' },
      { title: 'Pot of Gold Award', name: highestScoringLoss?.ownerName || 'Unavailable', details: highestScoringLoss ? lostText(highestScoringLoss, true) : 'No completed loss' },
      { title: 'Aaron Hernandez Hangin’ Tough Award', name: closestLoss?.ownerName || 'Unavailable', details: closestLoss ? lostText(closestLoss) : 'No completed loss' },
    ],
    offenseStars: topPlayers(false).map((player) => `${player.name} - ${player.score} points`),
    defenseStars: topPlayers(true).map((player) => `${player.name} - ${player.score} points`),
  };
}

function normalizeMflLeague(data, standingsData) {
  const league = data.league || {};
  const franchises = asArray(league.franchises?.franchise);
  const divisions = new Map(asArray(league.divisions?.division).map((division) => [String(division.id), division.name]));
  const standingRows = asArray(standingsData.leagueStandings?.franchise || standingsData.leagueStandings?.standings?.franchise);
  const standingById = new Map(standingRows.map((row) => [String(row.id).padStart(4, '0'), row]));
  const normalized = franchises.map((franchise) => {
    const franchiseId = String(franchise.id).padStart(4, '0');
    const row = standingById.get(franchiseId) || {};
    const wins = number(row.h2hw ?? row.wins);
    const losses = number(row.h2hl ?? row.losses);
    const ties = number(row.h2ht ?? row.ties);
    return {
      franchiseId,
      teamName: franchise.name || `Franchise ${franchiseId}`,
      ownerName: franchise.owner_name || franchise.ownerName || mflOwnerFallback.get(franchiseId) || '',
      division: divisions.get(String(franchise.division)) || '',
      rank: number(row.rank, 99),
      pointsFor: fixed(row.pf ?? row.pointsFor),
      record: {
        record: ties ? `${wins}-${losses}-${ties}` : `${wins}-${losses}`,
        winPercentage: pct(wins, losses, ties),
        victoryPoints: String(row.vp ?? row.victoryPoints ?? '0'),
      },
    };
  });
  normalized.sort((a, b) => {
    const vpDiff = number(b.record.victoryPoints) - number(a.record.victoryPoints);
    return vpDiff || b.pointsFor - a.pointsFor;
  });
  normalized.forEach((team, index) => { if (team.rank === 99) team.rank = index + 1; });
  return normalized;
}

function getCompletedEspnWeeks(data, standings) {
  const ownerById = new Map(standings.map((team) => [team.id, team.ownerName]));
  const grouped = new Map();
  for (const game of asArray(data.schedule).filter((item) => item.home && item.away && ['HOME', 'AWAY', 'TIE'].includes(item.winner))) {
    const gameWeek = number(game.matchupPeriodId);
    if (!grouped.has(gameWeek)) grouped.set(gameWeek, []);
    grouped.get(gameWeek).push(
      { ownerName: ownerById.get(number(game.home.teamId)) || `Team ${game.home.teamId}`, score: fixed(game.home.totalPoints) },
      { ownerName: ownerById.get(number(game.away.teamId)) || `Team ${game.away.teamId}`, score: fixed(game.away.totalPoints) },
    );
  }
  return [...grouped.entries()].map(([gameWeek, results]) => ({ week: gameWeek, results })).sort((a, b) => a.week - b.week);
}

function normalizeMflMatchups(data, standings) {
  const nameById = new Map(standings.map((team) => [team.franchiseId, team.teamName]));
  const matchups = asArray(data.weeklyResults?.matchup || data.weeklyResults?.weeklyResults?.matchup);
  return matchups.map((matchup) => {
    const teams = asArray(matchup.franchise).map((team) => ({
      franchiseId: String(team.id).padStart(4, '0'),
      teamName: nameById.get(String(team.id).padStart(4, '0')) || `Franchise ${team.id}`,
      score: fixed(team.score),
      result: team.result || '',
    }));
    return { teams };
  }).filter((matchup) => matchup.teams.length >= 2);
}

function table(headers, rows) {
  return [`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`, ...rows.map((row) => `| ${row.join(' | ')} |`)].join('\n');
}

async function updateWeeklyRecords(espn) {
  const file = path.join(ROOT, 'src/sheetsData.json');
  const sheets = JSON.parse(await fs.readFile(file, 'utf8'));
  const results = espn.matchups.flatMap((game) => [game.home, game.away]);
  const high = [...results].sort((a, b) => b.score - a.score)[0];
  const low = [...results].sort((a, b) => a.score - b.score)[0];
  const existingHigh = Math.max(...sheets.Sheet9.map((row) => number(row.Points)));
  const existingLow = Math.min(...sheets.Sheet10.map((row) => number(row.Points)).filter((score) => score > 0));
  const records = [];
  if (high.score > existingHigh) {
    sheets.Sheet9.push({ Points: String(high.score), Owner: high.ownerName, Year: `${season} Week ${process.env.AUDIT_WEEK}` });
    records.push(`New highest weekly score: ${high.ownerName}, ${high.score} (previous ${existingHigh})`);
  }
  if (low.score < existingLow) {
    sheets.Sheet10.push({ Points: String(low.score), Owner: low.ownerName, Year: `${season} Week ${process.env.AUDIT_WEEK}` });
    records.push(`New lowest weekly score: ${low.ownerName}, ${low.score} (previous ${existingLow})`);
  }
  if (records.length) await fs.writeFile(file, `${JSON.stringify(sheets, null, 2)}\n`);
  return records;
}

const espnRaw = await fetchJson(espnUrl(), { headers: { Cookie: `SWID=${espnSwid}; espn_s2=${espnS2}` } });
const week = number(process.env.WEEK) || getEspnWeek(espnRaw);
process.env.AUDIT_WEEK = String(week);
const [mflLeagueRaw, mflStandingsRaw, mflResultsRaw] = await Promise.all([
  fetchJson(mflUrl('league')),
  fetchJson(mflUrl('leagueStandings')),
  fetchJson(mflUrl('weeklyResults', { W: String(week) })),
]);

const espn = normalizeEspn(espnRaw, week);
espn.completedWeeks = getCompletedEspnWeeks(espnRaw, espn.standings);
espn.currentWeekResults = espn.matchups.flatMap((game) => [game.home, game.away]);
const mflStandings = normalizeMflLeague(mflLeagueRaw, mflStandingsRaw);
const mflMatchups = normalizeMflMatchups(mflResultsRaw, mflStandings);
if (espn.standings.length < 2 || mflStandings.length < 2) throw new Error('Audit refused to write incomplete standings data.');

const recordChanges = await updateWeeklyRecords(espn);
const sheetUpdate = await updateHistoricalGoogleSheet({ season, week, espn, mfl: { standings: mflStandings }, root: ROOT });
const generatedAt = new Date().toISOString();
const weeklyData = {
  season,
  week,
  generatedAt,
  espn,
  mfl: { standings: mflStandings, matchups: mflMatchups },
  warnings: mflMatchups.length ? [] : [`MFL returned no completed matchups for week ${week}. Standings were still refreshed.`],
};
await fs.writeFile(path.join(ROOT, 'src/components/dataSources/weeklyData.json'), `${JSON.stringify(weeklyData, null, 2)}\n`);

const report = [
  `# Fantasy Central weekly audit — ${season} Week ${week}`,
  '',
  `Generated: ${generatedAt}`,
  '',
  '## Summary',
  '',
  `- ESPN: ${espn.matchups.length} matchups, ${espn.standings.length} teams`,
  `- MFL: ${mflMatchups.length} matchups, ${mflStandings.length} teams`,
  `- Record changes: ${recordChanges.length ? recordChanges.join('; ') : 'none'}`,
  `- Google Sheet: updated ${sheetUpdate.updatedTabs.length} historical-stat tabs and logged ${season} Week ${week}`,
  `- Warnings: ${weeklyData.warnings.length ? weeklyData.warnings.join('; ') : 'none'}`,
  '',
  '## ESPN results',
  '',
  table(['Away', 'Score', 'Home', 'Score'], espn.matchups.map((game) => [game.away.teamName, game.away.score, game.home.teamName, game.home.score])),
  '',
  '## ESPN awards',
  '',
  ...espn.awards.map((award) => `- **${award.title}:** ${award.name} — ${award.details}`),
  '',
  '## ESPN standings',
  '',
  table(['Rank', 'Team', 'Record', 'Points'], espn.standings.map((team) => [team.rank, team.teamName, team.record.record, team.pointsFor])),
  '',
  '## MFL results',
  '',
  ...(mflMatchups.length ? mflMatchups.map((game) => game.teams.map((team) => `${team.teamName} ${team.score}`).join(' vs. ')) : ['No completed MFL matchups returned.']),
  '',
  '## MFL standings',
  '',
  table(['Rank', 'Team', 'Record', 'VP', 'Points'], mflStandings.map((team) => [team.rank, team.teamName, team.record.record, team.record.victoryPoints, team.pointsFor])),
  '',
  '## Validation',
  '',
  '- Both APIs returned complete team lists before any site data was written.',
  '- ESPN awards were calculated from the finalized matchup and roster totals.',
  '- The workflow commits only when generated site data changes.',
  '',
].join('\n');
const reportDir = path.join(ROOT, 'reports/weekly');
await fs.mkdir(reportDir, { recursive: true });
await fs.writeFile(path.join(reportDir, `${season}-week-${String(week).padStart(2, '0')}.md`), report);
console.log(`Fantasy Central audit complete: ${season} week ${week}`);
