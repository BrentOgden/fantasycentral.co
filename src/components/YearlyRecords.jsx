import React, { useState, useEffect } from 'react';
import '../customCss/LeagueRecords.css';
import sheetsData from '../sheetsData.json';

function SheetData2() {
  const [data, setData] = useState([]);
  const [topIndex, setTopIndex] = useState(null);

  useEffect(() => {
    const sheetData = sheetsData["Sheet14"];

    if (sheetData && sheetData.length > 0) {
      setData(sheetData);

      const key = "Points"; // Change to the actual stat column if different

      const topRowIndex = sheetData.reduce((maxIndex, current, index, array) => {
        const currentValue = parseFloat(current[key] || "0");
        const maxValue = parseFloat(array[maxIndex][key] || "0");
        return currentValue > maxValue ? index : maxIndex;
      }, 0);

      setTopIndex(topRowIndex);
    }
  }, []);

  const fullHeaders = data.length ? Object.keys(data[0]) : [];
  const headers = fullHeaders.slice(0, 4); // ✅ Limit to first 4 columns

  return (
    <table className="api-table">
      <thead className="headerBackground p-4 bg-gradient-to-r from-red-900 via-black to-red-700">
        <tr className='p-4 bg-gradient-to-r from-red-900 via-black to-red-700'>
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

export default SheetData2;
