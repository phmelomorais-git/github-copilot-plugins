---
name: weathernodejs
description: 'Fetch weather data for any city using Node.js and Open-Meteo API. Use for: getting current weather, hourly/daily forecasts, validating geocoding, testing weather APIs. Keywords: weather, API, city name, forecast, temperature, NodeJS. Example: "Get current weather for Quebec"'
argument-hint: 'City name (e.g., Quebec, "Rio de Janeiro", Tokyo)'
---

# Weather Data with Node.js
Fetch real-time weather data for any city

## When to Use
- Get current temperature and weather conditions for a city

## Script Location
.github\skills\weathernodejs\script\weather-api.js

## Procedure

### Step 1: Prepare City Name
- Use English spelling (e.g., "Paris" not "París")
- Wrap multi-word cities in quotes: `"New York"`
- Check spelling if city is not found

### Step 2: Run the Script
node .github\skills\weathernodejs\script\weather-api.js <city-name>


## Troubleshooting

| Issue | Solution |
|-------|----------|
| City not found | Check spelling, use English name |
| Script won't run | Ensure Node.js installed: `node --version` |
| Network timeout | Check internet connection |
| Multi-word city fails | Wrap in quotes: `"New York"` |

