// src/hooks/useEspnTeams.js
import { useState, useEffect } from 'react'

export default function useEspnTeams(leagueId, seasonId = 2024) {
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // VITE or CRA env lookup
    const swid = import.meta.env.VITE_APP_ESPN_SWID
        ?? process.env.REACT_APP_ESPN_SWID
    const espnS2 = import.meta.env.VITE_APP_ESPN_S2
        ?? process.env.REACT_APP_ESPN_S2



    useEffect(() => {
        async function fetchTeams() {
            setLoading(true)
            setError(null)

            try {
                // ← switch base host to lm-api-reads
                const baseUrl = `https://lm-api-reads.fantasy.espn.com/ffl` +
                    `/seasons/${seasonId}/segments/0/leagues/${leagueId}`

                const views = [
                    'mTeam',
                    'mStandings',
                    'mSettings',
                    'mScoreboard',
                    'mMatchup'
                ]
                    .map(v => `view=${v}`)
                    .join('&')

                const url = [
                    baseUrl,
                    `?${views}`,
                    `&SWID=${encodeURIComponent(swid)}`,
                    `&espn_s2=${encodeURIComponent(espnS2)}`
                ].join('')

                const res = await fetch(url, {
                    // If you find CORS issues, you can also try sending SWID & s2 in a cookie header:
                    // headers: { 'Cookie': `SWID=${swid}; espn_s2=${espnS2};` }
                })
                if (!res.ok) throw new Error(`HTTP ${res.status}`)

                const data = await res.json()

                const mapped = data.teams.map(team => ({
                    id: team.id,
                    teamName: `${team.location} ${team.nickname}`,
                    ownerName: team.owners?.map(o => `${o.firstName} ${o.lastName}`).join(', '),
                    price: team.valuesByStat?.find(s => s.statId === 23)?.value || 0,
                    teamLogo: team.logo,
                    teamUrl: `https://fantasy.espn.com/football/team?leagueId=${leagueId}&teamId=${team.id}`,
                    record: {
                        record: `${team.record.overallWins}-${team.record.overallLosses}`,
                        winPercentage: `.${String(team.record.percentage).split('.')[1]}`
                    },
                    division: data.settings.divisionOrder
                        .find(d => d.teams.includes(team.id))?.name || '',
                    rank: team.record.overallRank
                }))

                setTeams(mapped)
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        if (leagueId && swid && espnS2) {
            fetchTeams()
        } else {
            setLoading(false)
            setError('Missing leagueId, SWID or espn_s2')
        }
    }, [leagueId, seasonId, swid, espnS2])

    return { teams, loading, error }
}
