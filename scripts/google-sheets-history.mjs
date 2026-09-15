import fs from 'node:fs/promises';
import path from 'node:path';
import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID || '1yQFArN8lOXTe7Y-dO450kdRqLFS8L2zkf2pcNNL34fU';
const LOG_SHEET = '_Automation Log';
const DATA_SHEETS = ['Sheet1', 'Sheet2', 'Sheet3', 'Sheet4', 'Sheet5', 'Sheet6', 'Sheet7', 'Sheet8', 'Sheet9', 'Sheet10', 'Sheet11', 'Sheet12', 'Sheet13', 'Sheet14', 'VPs'];

const numeric = (value) => Number(String(value ?? '').replace(/[$,*\s]/g, '')) || 0;
const clean = (value) => String(value ?? '').trim();
const rounded = (value) => Number(numeric(value).toFixed(2));
const ownerKey = (value) => clean(value).toLowerCase().replace(/[^a-z0-9]/g, '');
const firstName = (value) => clean(value).split(/\s+/)[0];
const vpLegacyOwnerByFranchise = new Map([
  ['0005', 'Kyle'],
  ['0006', 'Brandon'],
]);
const byNumberDesc = (key) => (a, b) => numeric(b[key]) - numeric(a[key]) || clean(a.Owner).localeCompare(clean(b.Owner));
const byNumberAsc = (key) => (a, b) => numeric(a[key]) - numeric(b[key]) || clean(a.Owner).localeCompare(clean(b.Owner));

function rowsToObjects(values = []) {
  const [headers = [], ...rows] = values;
  return rows.filter((row) => row.some((cell) => clean(cell))).map((row) => Object.fromEntries(headers.map((header, index) => [clean(header), row[index] ?? ''])));
}

function objectsToRows(headers, rows) {
  return [headers, ...rows.map((row) => headers.map((header) => row[header] ?? ''))];
}

function mergeCareerTotals(existing, seasonSnapshot, previousSnapshot, metric) {
  const totals = new Map(existing.map((row) => [ownerKey(row.Owner), { ...row, Owner: clean(row.Owner) }]));
  const previous = new Map((previousSnapshot?.espn || []).map((row) => [ownerKey(row.ownerName), numeric(row[metric])]));
  for (const team of seasonSnapshot.espn) {
    const key = ownerKey(team.ownerName);
    const row = totals.get(key) || { Owner: clean(team.ownerName) };
    row[metric] = rounded(numeric(row[metric]) + numeric(team[metric]) - (previous.get(key) || 0));
    totals.set(key, row);
  }
  return [...totals.values()];
}

function upsertSeasonRows(rows, season, seasonTeams, field, limit, ascending = false) {
  const kept = rows.filter((row) => String(row.Year) !== String(season));
  const current = seasonTeams.map((team) => ({ [field]: rounded(team[field]), Owner: clean(team.ownerName), Year: String(season) }));
  return [...kept, ...current].sort(ascending ? byNumberAsc(field) : byNumberDesc(field)).slice(0, limit);
}

function upsertWeeklyRecord(rows, season, week, result, limit, ascending = false) {
  const label = `${season} Week ${week}`;
  const kept = rows.filter((row) => clean(row.Year) !== label);
  kept.push({ Points: rounded(result.score), Owner: clean(result.ownerName), Year: label });
  return kept.sort(ascending ? byNumberAsc('Points') : byNumberDesc('Points')).slice(0, limit);
}

function buildSnapshot(espn, mfl, week) {
  const highPointWins = new Map();
  for (const weekly of espn.completedWeeks) {
    const highest = [...weekly.results].sort((a, b) => b.score - a.score)[0];
    if (highest) highPointWins.set(ownerKey(highest.ownerName), (highPointWins.get(ownerKey(highest.ownerName)) || 0) + 1);
  }
  return {
    week,
    espn: espn.standings.map((team) => ({
      ownerName: clean(team.ownerName), Wins: numeric(team.wins), Losses: numeric(team.losses),
      Points: rounded(team.pointsFor), Times: highPointWins.get(ownerKey(team.ownerName)) || 0,
    })),
    mfl: mfl.standings.map((team) => ({ ownerName: clean(team.ownerName), franchiseId: team.franchiseId, victoryPoints: numeric(team.record.victoryPoints) })),
  };
}

async function ensureLogSheet(sheets, metadata) {
  if (metadata.data.sheets.some((sheet) => sheet.properties.title === LOG_SHEET)) return;
  await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests: [{ addSheet: { properties: { title: LOG_SHEET, hidden: true } } }] } });
  await sheets.spreadsheets.values.update({ spreadsheetId: SPREADSHEET_ID, range: `'${LOG_SHEET}'!A1:D1`, valueInputOption: 'RAW', requestBody: { values: [['Season', 'Week', 'Processed At', 'Snapshot JSON']] } });
}

export async function updateHistoricalGoogleSheet({ season, week, espn, mfl, root }) {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is required to update the historical Google Sheet.');
  let credentials;
  try { credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON); } catch { throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON.'); }
  const auth = new google.auth.GoogleAuth({ credentials, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const metadata = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID, fields: 'sheets.properties' });
  await ensureLogSheet(sheets, metadata);

  const ranges = [...DATA_SHEETS.map((name) => `'${name}'!A1:AZ200`), `'${LOG_SHEET}'!A1:D1000`];
  const response = await sheets.spreadsheets.values.batchGet({ spreadsheetId: SPREADSHEET_ID, ranges, valueRenderOption: 'UNFORMATTED_VALUE' });
  const valuesBySheet = new Map(response.data.valueRanges.map((range) => [range.range.match(/^'?(.*?)'?!(?:.*)$/)?.[1], range.values || []]));
  const data = Object.fromEntries(DATA_SHEETS.map((name) => [name, rowsToObjects(valuesBySheet.get(name))]));
  const sheet14Raw = valuesBySheet.get('Sheet14') || [];
  const sheet14Extras = new Map(sheet14Raw.slice(1).map((row) => [ownerKey(row[1]), row.slice(4)]));
  const logRows = valuesBySheet.get(LOG_SHEET) || [];
  const priorLog = logRows.slice(1).filter((row) => Number(row[0]) === season).sort((a, b) => Number(b[1]) - Number(a[1]))[0];
  const previousSnapshot = priorLog?.[3] ? JSON.parse(priorLog[3]) : null;
  const snapshot = buildSnapshot(espn, mfl, week);

  const careerWins = mergeCareerTotals(data.Sheet12, snapshot, previousSnapshot, 'Wins');
  const careerLosses = mergeCareerTotals(careerWins, snapshot, previousSnapshot, 'Losses');
  const career = careerLosses.map((row) => ({
    'Winning %': numeric(row.Wins) + numeric(row.Losses) ? numeric(row.Wins) / (numeric(row.Wins) + numeric(row.Losses)) : 0,
    Wins: numeric(row.Wins), Losses: numeric(row.Losses), Owner: clean(row.Owner),
  }));
  data.Sheet12 = [...career].sort((a, b) => numeric(b['Winning %']) - numeric(a['Winning %']));
  data.Sheet1 = [...career].sort(byNumberDesc('Wins')).map((row) => ({ Wins: row.Wins, Owner: row.Owner, 'Winning %': row['Winning %'] }));
  data.Sheet2 = [...career].sort(byNumberDesc('Losses')).map((row) => ({ Losses: row.Losses, Owner: row.Owner, 'Winning %': row['Winning %'] }));
  data.Sheet3 = mergeCareerTotals(data.Sheet3, snapshot, previousSnapshot, 'Times').sort(byNumberDesc('Times'));

  const currentTeams = snapshot.espn;
  data.Sheet4 = upsertSeasonRows(data.Sheet4, season, currentTeams, 'Points', 48);
  data.Sheet7 = upsertSeasonRows(data.Sheet7, season, currentTeams, 'Wins', 23);
  data.Sheet8 = upsertSeasonRows(data.Sheet8, season, currentTeams, 'Losses', 27);
  const currentWeek = espn.completedWeeks.find((entry) => entry.week === week)?.results || espn.currentWeekResults;
  const high = [...currentWeek].sort((a, b) => b.score - a.score)[0];
  const low = [...currentWeek].sort((a, b) => a.score - b.score)[0];
  if (high) data.Sheet9 = upsertWeeklyRecord(data.Sheet9, season, week, high, 28);
  if (low) data.Sheet11 = upsertWeeklyRecord(data.Sheet11, season, week, low, 11, true);

  const careerPoints = mergeCareerTotals(data.Sheet14, snapshot, previousSnapshot, 'Points').map((row) => {
    const previousOwner = (previousSnapshot?.espn || []).some((team) => ownerKey(team.ownerName) === ownerKey(row.Owner));
    const currentOwner = snapshot.espn.some((team) => ownerKey(team.ownerName) === ownerKey(row.Owner));
    const seasons = numeric(row.Seasons) + (currentOwner && !previousOwner ? 1 : 0);
    return { Points: rounded(row.Points), Owner: clean(row.Owner), Seasons: seasons, 'Average/Season': seasons ? rounded(numeric(row.Points) / seasons) : 0 };
  });
  data.Sheet14 = careerPoints.sort(byNumberDesc('Points'));

  const vpRows = data.VPs;
  if (!previousSnapshot) {
    for (const row of vpRows) for (let weekNumber = 1; weekNumber <= 14; weekNumber += 1) row[`Week ${weekNumber}`] = '';
  }
  for (const team of snapshot.mfl) {
    const currentOwner = firstName(team.ownerName);
    const currentKey = ownerKey(currentOwner);
    let matches = currentKey ? vpRows.filter((item) => ownerKey(item.Owner) === currentKey) : [];
    if (matches.length === 0) {
      const legacyKey = ownerKey(vpLegacyOwnerByFranchise.get(team.franchiseId));
      if (legacyKey) matches = vpRows.filter((item) => ownerKey(item.Owner) === legacyKey);
    }
    if (matches.length > 1) throw new Error(`Ambiguous VPs owner match for ${team.ownerName || team.franchiseId}.`);
    const row = matches[0];
    if (!row) throw new Error(`Could not map MFL owner ${team.ownerName || team.franchiseId} to the VPs sheet.`);
    row.Owner = currentOwner;
    const otherWeeks = Object.entries(row).filter(([keyName]) => /^Week \d+$/.test(keyName) && keyName !== `Week ${week}`).reduce((sum, [, value]) => sum + numeric(value), 0);
    row[`Week ${week}`] = rounded(team.victoryPoints - otherWeeks);
    row['Year 2'] = rounded(Object.entries(row).filter(([keyName]) => /^Week \d+$/.test(keyName)).reduce((sum, [, value]) => sum + numeric(value), 0));
    row['Seasons (of 3)'] = 2;
    row.VPs = rounded(numeric(row['Year 1']) + numeric(row['Year 2']) + numeric(row['Year 3']));
  }
  data.VPs.sort(byNumberDesc('VPs'));

  const writes = [
    ['Sheet1', ['Wins', 'Owner', 'Winning %']], ['Sheet2', ['Losses', 'Owner', 'Winning %']], ['Sheet3', ['Times', 'Owner']],
    ['Sheet4', ['Points', 'Owner', 'Year']], ['Sheet7', ['Wins', 'Owner', 'Year']], ['Sheet8', ['Losses', 'Owner', 'Year']],
    ['Sheet9', ['Points', 'Owner', 'Year']], ['Sheet11', ['Points', 'Owner', 'Year']], ['Sheet12', ['Winning %', 'Wins', 'Losses', 'Owner']],
    ['Sheet14', ['Points', 'Owner', 'Seasons', 'Average/Season']],
    ['VPs', ['VPs', 'Owner', 'Seasons (of 3)', 'Year 1', 'Year 2', 'Year 3', ...Array.from({ length: 14 }, (_, index) => `Week ${index + 1}`)]],
  ];
  const columnName = (count) => {
    let value = count;
    let result = '';
    while (value > 0) { value -= 1; result = String.fromCharCode(65 + (value % 26)) + result; value = Math.floor(value / 26); }
    return result;
  };
  const valueUpdates = writes.map(([name, headers]) => {
    if (name !== 'Sheet14') return { range: `'${name}'!A1`, values: objectsToRows(headers, data[name]), width: headers.length };
    const extraWidth = Math.max(0, ...[...sheet14Extras.values()].map((extras) => extras.length));
    return {
      range: `'${name}'!A1`,
      values: [[...headers, ...Array(extraWidth).fill('')], ...data[name].map((row) => [...headers.map((header) => row[header] ?? ''), ...(sheet14Extras.get(ownerKey(row.Owner)) || [])])],
      width: headers.length + extraWidth,
    };
  });
  await sheets.spreadsheets.values.batchClear({ spreadsheetId: SPREADSHEET_ID, requestBody: { ranges: valueUpdates.map((update) => `${update.range}:${columnName(update.width)}200`) } });
  await sheets.spreadsheets.values.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { valueInputOption: 'USER_ENTERED', data: valueUpdates.map(({ range, values }) => ({ range, values })) } });
  await sheets.spreadsheets.values.append({ spreadsheetId: SPREADSHEET_ID, range: `'${LOG_SHEET}'!A:D`, valueInputOption: 'RAW', insertDataOption: 'INSERT_ROWS', requestBody: { values: [[season, week, new Date().toISOString(), JSON.stringify(snapshot)]] } });

  await fs.writeFile(path.join(root, 'src/sheetsData.json'), `${JSON.stringify(data, null, 2)}\n`);
  return { spreadsheetId: SPREADSHEET_ID, updatedTabs: writes.map(([name]) => name), logSheet: LOG_SHEET };
}
