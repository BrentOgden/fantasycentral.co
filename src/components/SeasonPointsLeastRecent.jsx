import React, { useState, useEffect } from 'react';
import '../customCss/LeagueRecords.css';
import sheetsData from '../sheetsData.json';

function SheetData9() {
  const [data, setData] = useState([]);
  const [topIndex, setTopIndex] = useState(null);

  useEffect(() => {
    const sheetData = sheetsData["Sheet6"];

    if (sheetData && sheetData.length > 0) {
      setData(sheetData);

      const key = "Total Points"; // ⬅️ Adjust to match the actual stat column name

      const topRowIndex = sheetData.reduce((maxIndex, current, index, array) => {
        const currentVal = parseFloat((current[key] || "0").toString().replace(/[^0-9.-]+/g, ''));
        const maxVal = parseFloat((array[maxIndex][key] || "0").toString().replace(/[^0-9.-]+/g, ''));
        return currentVal > maxVal ? index : maxIndex;
      }, 0);

      setTopIndex(topRowIndex);
    }
  }, []);

  const headers = data.length ? Object.keys(data[0]) : [];

  return (
    <table className="api-table">
      <thead className="headerBackground p-4 bg-gradient-to-r from-red-900 via-black to-red-700">
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

export default SheetData9;
