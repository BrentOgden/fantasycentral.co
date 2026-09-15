import weeklyData from './weeklyData.json';

const fallbackStandings = [
    {
        id: 1,
        teamName: "Big Nix Energy",
        ownerName: "Brent Ogden",
        playoffPoints: 329.25,
        teamLogo: "brent2026.png",
        teamUrl: "https://fantasy.espn.com/football/team?leagueId=249295&teamId=1",
        record: {
            record: "8-6",
            winPercentage: ".571"
        },
        division: "Owners",
        rank: 2,
        playoffRank: 4,
        
    },
    {
        id: 2,
        teamName: "Smoking Split Lickers",
        ownerName: "Jeremy Ogden",
        playoffPoints: 'DNQ',
        teamLogo: "jeremy2024logo.jpg",
        teamUrl: "https://fantasy.espn.com/football/team?leagueId=249295&teamId=21",
        record: {
            record: "6-8",
            winPercentage: ".429"
        },
        division: "Owners",
        rank: 9,
    },
    {
        id: 3,
        teamName: "The *Show Stopper* Stoppers",
        ownerName: "Tom Courtney ",
        playoffPoints: 352.2,
        teamLogo: "tom2026.jpeg",
        teamUrl: "https://fantasy.espn.com/football/team?leagueId=249295&teamId=23",
        record: {
            record: "9-5",
            winPercentage: ".643"
        },
        division: "Owners",
        rank: 4,
        playoffRank: 3,
    },
    {
        id: 4,
        teamName: "*Show Stopper*",
        ownerName: "Kristen Hazen",
        playoffPoints: 'DNQ',
        teamLogo: "kristen_logo.svg",
        teamUrl: "https://fantasy.espn.com/football/team?leagueId=249295&teamId=24",
        record: {
            record: "5-9",
            winPercentage: ".357"
        },
        division: "Owners",
        rank: 10,
    },
    {
        id: 5,
        teamName: "For Kyren Out Loud",
        ownerName: "Met Nagatani",
        playoffPoints: 432,
        teamLogo: "met_logo.jpg",
        teamUrl: "https://fantasy.espn.com/football/team?leagueId=249295&teamId=26",
        record: {
            record: "8-6",
            winPercentage: ".571"
        },
        division: "Owners",
        rank: 5,
        playoffRank: 1,
    },
    {
        id: 6,
        teamName: "Half Chubb",
        ownerName: "Casey Splane",
        playoffPoints: 'DNQ',
        teamLogo: "pat_logo.svg",
        teamUrl: "https://fantasy.espn.com/football/team?leagueId=249295&seasonId=2024&teamId=30",
        record: {
            record: "7-7",
            winPercentage: ".500"
        },
        division: "Owners",
        rank: 7,
    },
    {
        id: 7,
        teamName: "Parker The Show",
        ownerName: "Nick Hazen",
        playoffPoints: 'DNQ',
        teamLogo: "nick_logo.svg",
        teamUrl: "https://fantasy.espn.com/football/team?leagueId=249295&teamId=7",
        record: {
            record: "6-8",
            winPercentage: ".429"
        },
        division: "Players",
        rank: 8,
    },
    {
        id: 8,
        teamName: "Degenerates",
        ownerName: "Kyle Kohlscheen",
        playoffPoints: 405.25,
        teamLogo: "kyle2026.jpeg",
        teamUrl: "https://fantasy.espn.com/football/team?leagueId=249295&teamId=17",
        record: {
            record: "11-3",
            winPercentage: ".786"
        },
        division: "Players",
        rank: 1,
        playoffRank: 2,
    },
    {
        id: 9,
        teamName: "Got that Dog in Him",
        ownerName: "Justin Gutierrez",
        playoffPoints: 196.2,
        teamLogo: "justin2026.png",
        teamUrl: "https://fantasy.espn.com/football/team?leagueId=249295&teamId=18",
        record: {
            record: "9-5",
            winPercentage: ".643"
        },
        division: "Players",
        rank: 3,
    },
    {
        id: 10,
        teamName: "Slap And Tickle",
        ownerName: "Cody Box",
        playoffPoints: 142.6,
        teamLogo: "cody_logo.svg",
        teamUrl: "https://fantasy.espn.com/football/team?leagueId=249295&teamId=25",
        record: {
            record: "7-7",
            winPercentage: ".500"
        },
        division: "Players",
        rank: 6,
    },
    {
        id: 11,
        teamName: "Commando Rice @ Dice",
        ownerName: "Freeman Puthavongsa",
        playoffPoints: 'DNQ',
        teamLogo: "https://a-static.besthdwallpaper.com/demon-slayer-tanjiro-s-water-breathing-dragon-form-wallpaper-720x1280-42478_184.jpg",
        teamUrl: "https://fantasy.espn.com/football/team?leagueId=249295&teamId=28",
        record: {
            record: "5-9",
            winPercentage: ".357"
        },
        division: "Players",
        rank: 11,
    },
    {
        id: 12,
        teamName: "Rebuilding Year",
        ownerName: "Garret Weber",
        playoffPoints: 'DNQ',
        teamLogo: "garret_logo.svg",
        teamUrl: "https://fantasy.espn.com/football/team?leagueId=249295&teamId=29",
        record: {
            record: "3-11",
            winPercentage: ".214"
        },
        division: "Players",
        rank: 12,
    }
    
];

const generatedById = new Map(
    weeklyData.espn.standings.map((team) => [Number(team.id), team])
);

export default fallbackStandings.map((team) => {
    const espnTeamId = Number(team.teamUrl.match(/[?&]teamId=(\d+)/)?.[1]);
    const generated = generatedById.get(espnTeamId);
    return generated
        ? {
            ...team,
            teamName: generated.teamName || team.teamName,
            ownerName: generated.ownerName || team.ownerName,
            division: generated.division || team.division,
            rank: generated.rank ?? team.rank,
            record: { ...team.record, ...generated.record },
        }
        : team;
});
