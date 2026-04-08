/**
 * Open-Meteo Weather API Explorer
 * Fetches weather data for a single city provided as a command-line parameter
 * API Documentation: https://open-meteo.com/en/docs
 */

// Get city name from command-line arguments
const cityName = process.argv[2];

// Check if city name was provided
if (!cityName) {
  console.log('\n❌ Error: City name is required!\n');
  console.log('Usage:  node weather-api.js <city-name>\n');
  console.log('Examples:');
  console.log('  node weather-api.js Quebec');
  console.log('  node weather-api.js "Rio de Janeiro"');
  console.log('  node weather-api.js Toronto\n');
  process.exit(1);
}

/**
 * Get weather data for a city name
 * Workflow: City Name → Geocoding → Weather Data
 */
async function getWeatherForCity(cityName) {
  console.log('\n' + '='.repeat(70));
  console.log(`🌍 Fetching weather for: ${cityName}`);
  console.log('='.repeat(70));
  
  // Step 1: Geocode the city name to get coordinates
  console.log('\n📍 Step 1: Converting city name to coordinates...');
  const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
  
  try {
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();
    
    if (!geocodeData.results || geocodeData.results.length === 0) {
      console.log(`❌ Error: City "${cityName}" not found in geocoding database`);
      console.log('💡 Tip: Try with a different city name or check spelling\n');
      process.exit(1);
    }
    
    const location = geocodeData.results[0];
    console.log(`✅ Found: ${location.name}${location.admin1 ? ', ' + location.admin1 : ''}${location.country ? ', ' + location.country : ''}`);
    console.log(`   Latitude: ${location.latitude}`);
    console.log(`   Longitude: ${location.longitude}`);
    console.log(`   Timezone: ${location.timezone || 'N/A'}`);
    
    // Step 2: Fetch weather using the coordinates
    console.log('\n🌡️  Step 2: Fetching weather data...');
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code`;
    
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();
    
    if (!weatherResponse.ok) {
      console.log(`❌ Error: Failed to fetch weather data`);
      process.exit(1);
    }
    
    console.log('✅ Weather data retrieved successfully!\n');
    
    // Step 3: Display the weather data
    console.log('='.repeat(70));
    console.log('📊 WEATHER DATA');
    console.log('='.repeat(70));
    
    console.log(`\n📍 Location: ${location.name}${location.admin1 ? ', ' + location.admin1 : ''}`);
    console.log(`   Coordinates: ${location.latitude}°, ${location.longitude}°`);
    console.log(`   Timezone: ${location.timezone}`);
    
    console.log(`\n🌡️  CURRENT WEATHER:`);
    console.log(`   Temperature: ${weatherData.current.temperature_2m}°${weatherData.current_units.temperature_2m}`);
    console.log(`   Weather Code: ${weatherData.current.weather_code} (0=Clear, 1=Mainly clear, 2=Partly cloudy, 3=Overcast)`);
    console.log(`   Time: ${weatherData.current.time}`);
    
    console.log(`\n📈 HOURLY FORECAST (next 12 hours):`);
    if (weatherData.hourly && weatherData.hourly.temperature_2m) {
      for (let i = 0; i < Math.min(12, weatherData.hourly.temperature_2m.length); i++) {
        console.log(`   ${i.toString().padStart(2, ' ')}:00 → ${weatherData.hourly.temperature_2m[i]}°${weatherData.hourly_units.temperature_2m}`);
      }
    }
    
    console.log(`\n📅 DAILY FORECAST (next 7 days):`);
    if (weatherData.daily && weatherData.daily.temperature_2m_max) {
      for (let i = 0; i < Math.min(7, weatherData.daily.temperature_2m_max.length); i++) {
        const date = weatherData.daily.time[i];
        const maxTemp = weatherData.daily.temperature_2m_max[i];
        const minTemp = weatherData.daily.temperature_2m_min[i];
        const code = weatherData.daily.weather_code[i];
        console.log(`   ${date} → High: ${maxTemp}°, Low: ${minTemp}° (Code: ${code})`);
      }
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('✨ Done!');
    console.log('='.repeat(70) + '\n');
    
  } catch (error) {
    console.log(`❌ Request failed: ${error.message}\n`);
    process.exit(1);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('\n🌦️  OPEN-METEO WEATHER API\n');
  await getWeatherForCity(cityName);
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
