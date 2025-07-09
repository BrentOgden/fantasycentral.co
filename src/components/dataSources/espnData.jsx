// src/components/TeamsList.jsx
import React, { useState, useEffect } from 'react'
import Card from '../Card'                 // ← import your Card

export default function TeamsList({ leagueId, seasonId = 2023 }) {
  const [teams, setTeams]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // use the correct env lookup for your build tool:
  const swid   = import.meta?.env?.VITE_APP_ESPN_SWID   || process.env.REACT_APP_ESPN_SWID
  const espnS2 = import.meta?.env?.VITE_APP_ESPN_S2     || process.env.REACT_APP_ESPN_S2

  useEffect(() => {
    async function loadTeams() {
      try {
        const baseUrl = `https://fantasy.espn.com/apis/v3/games/ffl/` +
                        `seasons/${seasonId}/segments/0/leagues/${leagueId}`
        const views = [
          'mTeam',
          'mSettings',
          'mMatchup',
          'mScoreboard',
          'mStandings'
        ].map(v => `view=${v}`).join('&')

        // Append your cookies as query params (bypasses CORS credential headaches)
        const url = `${baseUrl}?${views}` +
                    `&SWID=${encodeURIComponent(swid)}` +
                    `&espn_s2=${encodeURIComponent(espnS2)}`

        const res = await fetch(url)
        if (!res.ok) throw new Error(`Status ${res.status}`)
        const data = await res.json()

        const mapped = data.teams.map(team => ({
          id:         team.id,
          teamName:   `${team.location} ${team.nickname}`,
          ownerName:  team.owners?.map(o => `${o.firstName} ${o.lastName}`).join(', '),
          price:      team.valuesByStat?.find(s => s.statId === 23)?.value || 0,
          teamLogo:   team.logo,
          teamUrl:    `https://fantasy.espn.com/football/team?leagueId=${leagueId}&teamId=${team.id}`,
          record: {
            record:        `${team.record.overallWins}-${team.record.overallLosses}`,
            winPercentage: `.${String(team.record.percentage).split('.')[1]}`
          },
          division:   data.settings.divisionOrder
                          .find(d => d.teams.includes(team.id))
                          ?.name || '',
          rank:       team.record.overallRank
        }))

        setTeams(mapped)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [leagueId, seasonId, swid, espnS2])

  if (loading) return <p>Loading teams…</p>
  if (error)   return <p className="text-red-500">Error: {error}</p>

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {teams.map(item => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  )
}
