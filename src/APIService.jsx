const axios = require('axios');
const fs = require('fs');

const SPREADSHEET_ID = '1yQFArN8lOXTe7Y-dO450kdRqLFS8L2zkf2pcNNL34fU';
const API_KEY = 'AIzaSyBBoEwOh6xBj834Jqmj9T8KoEfJt5aOXyE';

// Fetch sheet names from the Google Sheet
async function fetchSheetNames() {
    try {
        const response = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?fields=sheets.properties.title&key=${API_KEY}`);
        return response.data.sheets.map(sheet => sheet.properties.title);
    } catch (err) {
        console.error('Error fetching sheet names:', err.message);
        return [];
    }
}

async function fetchDataFromSheet(sheetName) {
    try {
        const response = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}?key=${API_KEY}`);
        return {
            name: sheetName,
            data: convertToJSON(response.data.values)
        };
    } catch (err) {
        console.error(`Error fetching data from sheet ${sheetName}:`, err.message);
        return null;
    }
}

// Convert the rows to JSON format
function convertToJSON(rows) {
    const headers = rows[0];
    return rows.slice(1).map(row => {
        let obj = {};
        row.forEach((cell, index) => {
            obj[headers[index]] = cell;
        });
        return obj;
    });
}

(async () => {
    const sheetNames = await fetchSheetNames();
    const dataPromises = sheetNames.map(name => fetchDataFromSheet(name));
    const sheetsData = await Promise.all(dataPromises);

    const jsonData = {};
    sheetsData.forEach(sheet => {
        if(sheet) {
            jsonData[sheet.name] = sheet.data;
        }
    });

    fs.writeFileSync('sheetsData.json', JSON.stringify(jsonData, null, 2));
    console.log('Data saved to sheetsData.json');
})();
