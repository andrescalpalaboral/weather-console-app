const fs = require("fs");
const axios = require("axios");
const env_vars = require("../config");
class Searches {
  dbPath = "./db/places.json";
  locationHistory = [];

  constructor() {
    this.readOfJsonFile();
  }

  get mapboxParams() {
    return {
      access_token: env_vars.mapbox_api_key,
      limit: 5,
      lenguage: "es",
      autocomplete: true,
    };
  }

  get openWeatherParams() {
    return {
      appid: env_vars.open_weather_api,
      units: "metric",
    };
  }

  async location(location = "") {
    const axiosInstance = axios.create({
      baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
      params: this.mapboxParams,
    });
    const response = await axiosInstance.get();
    return response.data.features.map((place) => ({
      id: place.id,
      name: place.place_name,
      longitude: place.center[0],
      latitude: place.center[1],
    }));
  }

  async getWeather(lat = "", lon = "") {
    const axiosInstance = axios.create({
      baseURL: "https://api.openweathermap.org/data/2.5/weather",
      params: { ...this.openWeatherParams, lat, lon },
    });

    const response = await axiosInstance.get();
    const { weather, main } = response.data;
    return {
      description: weather[0].description,
      max_temperature: main.temp_max,
      min_temperature: main.temp_min,
      temperature: main.temp,
    };
  }

  savePlaceInHistory(place = "") {
    if (!this.locationHistory.includes(place)) {
      this.locationHistory = this.locationHistory.splice(0, 4);
      this.locationHistory.unshift(place);
      this.saveInJsonFile();
    }

    return this.locationHistory;
  }

  saveInJsonFile() {
    const payload = {
      history: this.locationHistory,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readOfJsonFile() {
    if (fs.existsSync(this.dbPath)) {
      const fileData = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
      const fileJson = JSON.parse(fileData);
      this.locationHistory = fileJson.history;
    }
  }
}

module.exports = Searches;
