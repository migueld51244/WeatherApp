# Weather App

A weather forecasting web app built as part of The Odin Project curriculum. This project uses HTML, CSS, JavaScript, and the Visual Crossing Weather API to let users search for a city and view current weather conditions, hourly updates, and a multi-day forecast.

## Overview

This app was designed to practice working with:

- API integration
- DOM manipulation
- asynchronous JavaScript
- dynamic UI updates
- responsive styling
- modular JavaScript structure

The project includes a clean weather dashboard with a search field, detailed statistics, unit switching, and a weather-themed background that changes based on the current conditions.

## Features

- Search weather by location
- Display current temperature and weather description
- Show humidity, wind speed, sunrise, sunset, pressure, and more
- View a 7-day forecast
- View hourly conditions throughout the day
- Toggle between Celsius and Fahrenheit
- Loading state and validation for empty, invalid, or missing searches
- Dynamic weather background based on conditions

## Tech Stack

- HTML
- CSS
- JavaScript
- Webpack
- Visual Crossing API
- date-fns

## Project Structure

```text
WeatherApp/
├── src/
│   ├── assets/
│   ├── modules/
│   ├── index.js
│   ├── style.css
│   └── template.html
├── package.json
├── webpack.config.js
├── .gitignore
└── README.md
```

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npx webpack serve
```

5. Open the local URL shown in the terminal in your browser.

## Build for Production

```bash
npx webpack
```

This will generate the production bundle in the dist folder.

## API

This project uses the Visual Crossing Weather API to fetch weather data for the entered location.

## The Odin Project

This project was created as part of The Odin Project JavaScript curriculum and focuses on building a real-world weather application using JavaScript and external API data.

## Notes

- A valid API key is required for the app to return weather information.
- If the weather service is unavailable or a location cannot be found, the app displays an error message.

## License

This project is for educational purposes and is not intended for commercial use. Student app.
