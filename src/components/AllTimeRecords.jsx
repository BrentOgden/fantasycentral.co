import React, { useState, useEffect } from 'react';
import '../customCss/LeagueRecords.css';
import sheetsData from '../sheetsData.json';

function SheetData() {
  const [data, setData] = useState([]);
  const [topIndex, setTopIndex] = useState(null);

  useEffect(() => {
    const sheetData = sheetsData["Sheet12"];

    if (sheetData && sheetData.length > 0) {
      setData(sheetData);

      const getPercentValue = (row) => {
        const raw = row["Winning %"] || "0%";
        return parseFloat(raw.replace('%', '')) || 0;
      };

      const getTotalGames = (row) => {
        const wins = parseInt(row["Wins"] || "0", 10);
        const losses = parseInt(row["Losses"] || "0", 10);
        return wins + losses;
      };

      // Find the index of the row with the highest Winning % among those with at least 150 games
      const qualifyingRows = sheetData
        .map((row, index) => ({ index, row }))
        .filter(({ row }) => getTotalGames(row) >= 150);

      if (qualifyingRows.length > 0) {
        const topRow = qualifyingRows.reduce((max, current) =>
          getPercentValue(current.row) > getPercentValue(max.row) ? current : max
        );
        setTopIndex(topRow.index);
      }
    }
  }, []);

  const headers = data.length ? Object.keys(data[0]) : [];

  return (
    <table className="api-table">
      <thead className='p-4 bg-gradient-to-r from-red-900 via-black to-red-700'>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index} className={index === topIndex ? 'highlight-row' : ''}>
            {headers.map((header, idx) => (
              <td key={idx}>{entry[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SheetData;
