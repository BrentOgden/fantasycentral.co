import React, { useState, useEffect } from 'react';
import '../customCss/LeagueRecords.css';
import sheetsData from '../sheetsData.json';

function SheetData3() {
  const [data, setData] = useState([]);
  const [topIndex, setTopIndex] = useState(null);

  useEffect(() => {
    const sheetData = sheetsData["Sheet13"];

    if (sheetData && sheetData.length > 0) {
      setData(sheetData);

      // Determine the top result by highest "Points" (adjust this key as needed)
      const topRowIndex = sheetData.reduce((maxIndex, current, index, array) => {
        const key = "Points"; // <-- change this to the correct column
        const currentVal = parseFloat(current[key] || "0");
        const maxVal = parseFloat(array[maxIndex][key] || "0");
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

export default SheetData3;
