# Open-Meteo Weather API Explorer

A simple Node.js script to fetch weather data for a single city provided as a command-line parameter using the Open-Meteo weather API. The script uses the city name to automatically find coordinates and retrieve current/hourly/daily weather forecasts.

## Overview

This script demonstrates the recommended workflow for working with the Open-Meteo API:
1. **Geocoding** - Convert city name to coordinates using the free geocoding API
2. **Weather Data** - Fetch weather using the retrieved coordinates
3. **Display** - Show current, hourly, and daily forecasts

## Prerequisites

- **Node.js** installed (v14 or higher)
- **Internet connection** to access the Open-Meteo APIs
- No API key required (free public API)

## Installation

1. Navigate to the `nodejstest` directory
2. No dependencies need to be installed - the script uses Node.js built-in `fetch` API

## Running the Script

### Basic Usage

```bash
node weather-api.js <city-name>
```

### Examples

```bash
# Single-word city names
node weather-api.js Quebec
node weather-api.js Toronto
node weather-api.js London

# Multi-word city names (use quotes)
node weather-api.js "Rio de Janeiro"
node weather-api.js "New York"
node weather-api.js "Los Angeles"
```

### Error Handling

If you run the script without a city name parameter:

```bash
node weather-api.js
```

Output:
```
❌ Error: City name is required!

Usage:  node weather-api.js <city-name>

Examples:
  node weather-api.js Quebec
  node weather-api.js "Rio de Janeiro"
  node weather-api.js Toronto
```

The script will exit with code 1, indicating an error.

## Expected Output

## Expected Output

When you provide a valid city name, the script displays:

### Sample Output

```
🌦️  OPEN-METEO WEATHER API

======================================================================
🌍 Fetching weather for: Quebec
======================================================================

📍 Step 1: Converting city name to coordinates...
✅ Found: Québec, Quebec, Canada
   Latitude: 46.81228
   Longitude: -71.21454
   Timezone: America/Toronto

🌡️  Step 2: Fetching weather data...
✅ Weather data retrieved successfully!

======================================================================
📊 WEATHER DATA
======================================================================

📍 Location: Québec, Quebec
   Coordinates: 46.81228°, -71.21454°
   Timezone: America/Toronto

🌡️  CURRENT WEATHER:
   Temperature: -6.7°C
   Weather Code: 0 (0=Clear, 1=Mainly clear, 2=Partly cloudy, 3=Overcast)
   Time: 2026-04-08T01:45

📈 HOURLY FORECAST (next 12 hours):
    0:00 → -3.8°C
    1:00 → -5.4°C
    2:00 → -7.1°C
    ... (continues for 12 hours)

📅 DAILY FORECAST (next 7 days):
   2026-04-08 → High: 0.3°, Low: -13° (Code: 3)
   2026-04-09 → High: 5.7°, Low: -6.8° (Code: 3)
   ... (continues for 7 days)

======================================================================
✨ Done!
======================================================================
```

### Output Sections

1. **Step 1: Geocoding** - Converts city name to coordinates
   - Shows resolved city name with region and country
   - Displays coordinates and timezone

2. **Step 2: Weather Retrieval** - Fetches weather data
   - Uses the coordinates from Step 1
   - Retrieves current, hourly, and daily forecast data

3. **Weather Data Display**
   - **Location Info** - City, coordinates, timezone
   - **Current Weather** - Temperature, weather code, time
   - **Hourly Forecast** - Next 12 hours of temperature predictions
   - **Daily Forecast** - Next 7 days with high/low temperatures

## Key Findings

### ✅ What Works

1. **Coordinate-based requests** - Direct API calls with latitude/longitude
2. **Geocoding API** - Free city name lookup service
3. **Combined workflow** - Query city name → get coordinates → fetch weather

### ❌ What Doesn't Work

- **Direct city name in forecast API** - The forecast endpoint only accepts lat/long
- Example: `?location=Quebec` will fail

## Performance & Rate Limiting

- Open-Meteo has generous free tier limits
- No authentication/API key required
- No delays needed between requests in typical use

## Customization

The script accepts any city name as a command-line parameter. To extend the script with additional weather data:

Edit the `getWeatherForCity` function to include additional parameters:

```javascript
// Current parameters in the script:
// - hourly: temperature_2m
// - current: temperature_2m, weather_code
// - daily: temperature_2m_max, temperature_2m_min, weather_code

// Add more like:
const weatherUrl = `https://api.open-meteo.com/v1/forecast
  ?latitude=${location.latitude}
  &longitude=${location.longitude}
  &hourly=temperature_2m,precipitation,wind_speed_10m
  &current=temperature_2m,weather_code,wind_speed_10m
  &daily=temperature_2m_max,temperature_2m_min,precipitation_sum`;
```

## Troubleshooting

### City not found
- Ensure the city name is spelled correctly
- Try the English spelling (e.g., "Sao Paulo" instead of "São Paulo")
- Very small towns may not be in the geocoding database
- Try the nearest major city instead

### Requests timing out
- Check your internet connection
- Open-Meteo servers might be temporarily down (rare)
- Try again in a few moments

### Script won't run
- Ensure Node.js is installed: `node --version`
- Check you're in the correct directory with the script
- Ensure you have internet connectivity

### Incorrect coordinates
- Using quotes correctly for multi-word cities is important
- Example: `node weather-api.js "Los Angeles"` (not `Los Angeles` without quotes)

## Saving Output

To save the output to a file:

```bash
# Save output only
node weather-api.js Quebec > weather.txt

# Save output and errors
node weather-api.js Quebec > weather.txt 2>&1
```

## API Endpoints Reference

### Geocoding API
```
GET https://geocoding-api.open-meteo.com/v1/search
?name={city_name}
&count=1
&language=en
&format=json
```

Response includes:
- `name` - City name
- `admin1` - State/Province
- `country` - Country name
- `latitude` - Latitude coordinate
- `longitude` - Longitude coordinate
- `timezone` - IANA timezone

### Forecast API
```
GET https://api.open-meteo.com/v1/forecast
?latitude={lat}
&longitude={lon}
&hourly=temperature_2m
&current=temperature_2m,weather_code
&daily=temperature_2m_max,temperature_2m_min,weather_code
```

**Available Data Fields:**
- `hourly`: temperature_2m, precipitation, wind_speed_10m, humidity_2m, cloud_cover, weather_code, pressure_msl
- `current`: temperature_2m, weather_code, wind_speed_10m, is_day, relative_humidity_2m
- `daily`: temperature_2m_max, temperature_2m_min, precipitation_sum, weather_code

## Documentation & Resources

- **Open-Meteo Weather API**: https://open-meteo.com/en/docs
- **Open-Meteo Geocoding API**: https://open-meteo.com/en/docs/geocoding-api
- **Weather Code Reference**: https://open-meteo.com/en/docs
- **Free tier**: No API key required, generous limits

## License & Attribution

Data provided by Open-Meteo (https://open-meteo.com)

---

**Happy weather querying!** 🌦️
