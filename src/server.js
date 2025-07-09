const express = require('express');
let fetch;
import('node-fetch').then(module => {
    fetch = module.default;
});

const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/fetch-data', async (req, res) => {
    try {
        // You'll implement the getAccessToken() function later
        const token = await getAccessToken();
        const sheetId = "1yQFArN8lOXTe7Y-dO450kdRqLFS8L2zkf2pcNNL34fU";
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet12!A1:Z1000?access_token=${token}`;

        const response = await fetch(url);
        const data = await response.json();
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({error: 'Failed to fetch data'});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
async function getAccessToken() {
    // Implement your token refresh logic here
    return 'your_access_token'; // Replace this with the actual access token
}
const cors = require('cors');

// ...

app.use(cors());
