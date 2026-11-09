# Project 7: NASA API - Space Explorer App
NASA releases a new "Astronomy Picture of the Day" (APOD) every day—spotlighting breathtaking images of galaxies, stars, planets, and more.

Your task is to build an interactive web app that fetches and displays these photos using [NASA's API](https://api.nasa.gov/). Users will pick a date range and instantly view stunning photos from across the cosmos, along with titles and descriptions.

You'll get to use your skills to build something that's actually connected to real-world data from one of the most iconic organizations in the world.

## Starter Files
- The provided files include a NASA logo, date inputs, a button, a placeholder for your gallery, and basic layout and styling to help you get started.
- It also includes built-in logic (in `dateRange.js`) to handle the valid APOD date range—from June 16, 1995 to today. No need to modify it.
- All your custom JavaScript should go in `script.js`. That's where you'll write the code that fetches data and displays your gallery.

## Run the app with your NASA API key
The API key is read by the Node.js backend and is not included in browser JavaScript.

1. Install [Node.js](https://nodejs.org/) 18 or newer.
2. In the project folder, run `npm install`.
3. Copy `.env.example` to a new file named `.env`.
4. Replace the example value in `.env` with your NASA API key.
5. Run `npm start`, then open `http://localhost:3000`.

Keep `.env` private; it is ignored by Git. Do not use Live Server to open the page, because the app needs the Node.js server to make APOD requests.

When deploying, use a hosting provider that can run Node.js and add `NASA_API_KEY` as a server-side environment variable in its settings. GitHub Pages only hosts static files and cannot run this backend. A personal key has a higher request limit than `DEMO_KEY`, but it is still rate-limited.
