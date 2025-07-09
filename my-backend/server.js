const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { config } = require('dotenv');
const queryString = require('querystring');

config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'https://localhost:5173'  // This should match the domain of your React app
}));


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://fantasycentral.co/auth/callback';

let REFRESH_TOKEN; 
let accessToken;
let accessTokenExpiry;

async function refreshAccessToken() {
    const tokenEndpoint = 'https://oauth2.googleapis.com/token';
    const requestBody = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: REFRESH_TOKEN,
        grant_type: 'refresh_token'
    };

    try {
        const response = await axios.post(tokenEndpoint, queryString.stringify(requestBody), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        accessToken = response.data.access_token;
        accessTokenExpiry = Date.now() + (response.data.expires_in * 1000) - 5000;

        // Here, consider updating the access token in your database

        return accessToken;
    } catch (error) {
        console.error("Error refreshing access token:", error.response ? error.response.data : error.message);
        throw error;
    }
}

app.get('/auth/start', (req, res) => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/spreadsheets&access_type=offline&prompt=consent`;
    res.redirect(authUrl);
});
app.get('/fetch-data/:sheetName', async (req, res) => {
    if (Date.now() > accessTokenExpiry) {
        try {
            await refreshAccessToken();
        } catch (error) {
            return res.status(500).send('Failed to refresh access token.');
        }
    }

    const sheetId = '1yQFArN8lOXTe7Y-dO450kdRqLFS8L2zkf2pcNNL34fU'; 
    const sheetName = req.params.sheetName;
    const rangeParam = req.query.range || "A1:F1000";  // Use the range from the query parameter or default to A1:F1000
    const fullRange = `${sheetName}!${rangeParam}`;

    try {
        const response = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${fullRange}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from Google Sheets:", error.response ? error.response.data : error.message);
        res.status(500).send('Failed to fetch data from Google Sheets.');
    }
});

app.get('/auth/callback', async (req, res) => {
    const authCode = req.query.code;

    if (!authCode) {
        res.status(400).send('No code provided');
        return;
    }

    const tokenEndpoint = 'https://oauth2.googleapis.com/token';
    const requestBody = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: authCode,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI
    };

    try {
        const response = await axios.post(tokenEndpoint, queryString.stringify(requestBody), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        accessToken = response.data.access_token;
        REFRESH_TOKEN = response.data.refresh_token || REFRESH_TOKEN;
        accessTokenExpiry = Date.now() + (response.data.expires_in * 1000) - 5000;

        // Here, consider saving the access and refresh tokens to a database

        res.send('Successfully authenticated!');

    } catch (error) {
        console.error("Error in OAuth callback:", error.response ? error.response.data : error.message);
        res.status(500).send('Authentication failed.');
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});
