import React, { useState, useEffect } from 'react';
import '../customCss/LeagueRecords.css';
import sheetsData from '../sheetsData.json';

function SheetData7() {
  const [data, setData] = useState([]);
  const [topIndex, setTopIndex] = useState(null);

  useEffect(() => {
    const sheetData = sheetsData["Sheet4"];

    if (sheetData && sheetData.length > 0) {
      setData(sheetData);

      const key = "13"; // Column for "Losses"

      const topRowIndex = sheetData.reduce((maxIndex, current, index, array) => {
        const currentVal = parseInt(current[key] || "0", 10);
        const maxVal = parseInt(array[maxIndex][key] || "0", 10);
        return currentVal > maxVal ? index : maxIndex;
      }, 0);

      setTopIndex(topRowIndex);
    }
  }, []);

  const columnTitles = {
    "13": "Losses", 
    "2005": "Year", 
    "Ryan VanBuskirk": "Owner"
  };

  const headers = data.length ? Object.keys(data[0]) : [];

  return (
    <table className="api-table">
      <thead className="headerBackground p-4 bg-gradient-to-r from-red-900 via-black to-red-700">
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{columnTitles[header] || header}</th>
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

export default SheetData7;
