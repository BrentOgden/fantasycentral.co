// src/pages/Results.jsx
import React from 'react'

export default function Results() {
  // Manually entered data
  const submissions = [
    { name: 'Kristen', wins: 24, runDiff: -250, winPercentage: 0.222, gamesBack: 41 },
    { name: 'Garret',   wins: 25, runDiff: -251, winPercentage: 0.224, gamesBack: 46 },
    { name: 'Justin', wins: 28, runDiff: -235, winPercentage: 0.256, gamesBack: 41 },
    { name: 'Brent', wins: 25, runDiff: -220, winPercentage: 0.230, gamesBack: 40 },
    { name: 'Kyle', wins: 27, runDiff: -225, winPercentage: 0.250, gamesBack: 27.5 },
    { name: 'Tom', wins: 26, runDiff: -255, winPercentage: 0.240, gamesBack: 42 },
    { name: 'Jeremy', wins: 30, runDiff: -251, winPercentage: 0.250, gamesBack: 42 },
    { name: 'Met', wins: 33, runDiff: -270, winPercentage: 0.275, gamesBack: 50 },
    { name: 'Cody', wins: 20, runDiff: -120, winPercentage: 0.230, gamesBack: 48 },
    { name: 'Freeman', wins: n/a, runDiff: n/a, winPercentage: n/a, gamesBack: n/a },
    { name: 'Casey', wins: n/a, runDiff: n/a, winPercentage: n/a, gamesBack: n/a },
    { name: 'Nick', wins: n/a, runDiff: n/a, winPercentage: n/a, gamesBack: n/a },

    // …add more rows as needed
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Draft Order Challenge Submissions
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Wins</th>
              <th className="px-4 py-2 border-b">Run Diff</th>
              <th className="px-4 py-2 border-b">Win %</th>
              <th className="px-4 py-2 border-b">Games Back</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-2 border-b">{row.name}</td>
                <td className="px-4 py-2 border-b text-center">{row.wins}</td>
                <td className="px-4 py-2 border-b text-center">{row.runDiff}</td>
                <td className="px-4 py-2 border-b text-center">
                  {row.winPercentage.toFixed(3)}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {row.gamesBack}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
