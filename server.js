require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
// This key stays on the server instead of being sent to the browser.
const nasaApiKey = process.env.NASA_API_KEY;

if (!nasaApiKey) {
  throw new Error('Set NASA_API_KEY in your .env file before starting the server.');
}

app.get('/api/apod', async (request, response, next) => {
  const { start_date: startDate, end_date: endDate } = request.query;
  const today = new Date().toISOString().slice(0, 10);

  // Check the dates here too, because browser-side checks can be bypassed.
  if (
    !isValidDate(startDate) ||
    !isValidDate(endDate) ||
    startDate < '1995-06-16' ||
    endDate > today ||
    startDate > endDate
  ) {
    response.status(400).json({
      error: 'Choose a valid date range between June 16, 1995 and today.'
    });
    return;
  }

  try {
    // Add the private key only to the request sent from this server to NASA.
    const params = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
      api_key: nasaApiKey
    });
    const nasaResponse = await fetch(
      `https://api.nasa.gov/planetary/apod?${params}`
    );
    const apodItems = await nasaResponse.json();

    response.status(nasaResponse.status).json(apodItems);
  } catch (error) {
    next(error);
  }
});

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/style.css', express.static(path.join(__dirname, 'style.css')));

app.use((error, request, response, next) => {
  console.error('APOD request failed:', error);
  response.status(502).json({ error: "Could not reach NASA's APOD API." });
});

app.listen(port, () => {
  console.log(`Space Explorer is running at http://localhost:${port}`);
});

function isValidDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}
