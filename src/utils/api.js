// src/utils/api.js

const BASE_URL = 'http://localhost:5173'; // Adjust this to your backend's URL

export async function fetchData(sheetName) {
  const response = await fetch(`${BASE_URL}/fetch-data?sheetName=${sheetName}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}
