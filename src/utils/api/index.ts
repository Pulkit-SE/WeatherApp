// api.ts - Simple WeatherStack API utility file

import axios from 'axios';

// WeatherStack API constants
const WEATHER_API_ENDPOINT = 'https://api.weatherstack.com/current';
const API_KEY = '0f0888fdd75929f4788406189293ac10';

// Define weather data interfaces
interface WeatherResponse {
  current?: {
    temperature: number;
    weather_descriptions: string[];
    humidity: number;
    wind_speed: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    feelslike: number;
    visibility: number;
    uv_index: number;
    observation_time: string;
  };
  location?: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
  };
  success?: boolean;
  error?: {
    code: number;
    type: string;
    info: string;
  };
}

// Error handler function
const handleError = (error: any) => {
  // Network error
  if (!error.response) {
    return {
      success: false,
      error: 'Network error. Please check your connection.',
    };
  }

  // API error with response
  return {
    success: false,
    error: error.response.data?.error?.info || 'An unknown error occurred',
  };
};

// Weather API
const weatherApi = {
  /**
   * Get current weather for a location
   * @param query - City name, IP address, or coordinates
   * @param units - Units of measurement (m = Metric, f = Fahrenheit, s = Scientific)
   */
  getCurrentWeather: async (
    query: string,
    units: 'm' | 'f' | 's' = 'm',
  ): Promise<WeatherResponse> => {
    try {
      const params = {
        access_key: API_KEY,
        query,
        units,
      };

      const response = await axios.get(WEATHER_API_ENDPOINT, {params});

      if (response.data.error) {
        return {
          success: false,
          error: response.data.error,
        };
      }

      return {
        ...response.data,
        success: true,
      };
    } catch (error) {
      return handleError(error);
    }
  },
};

export default weatherApi;
