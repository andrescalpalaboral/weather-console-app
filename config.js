require("dotenv").config();

const env_vars = {
  mapbox_api_key: process.env.MAPBOX_TOKEN,
  open_weather_api: process.env.OPENWEATHER_KEY,
};

module.exports = env_vars;
