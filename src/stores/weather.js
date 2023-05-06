import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const apiKey = import.meta.env.VITE_APP_API_KEY;
const baseApiUrl = `https://api.openweathermap.org`;

export const useWeatherStore = defineStore('weather', () => {
  // State
  const useMetricUnits = ref(false);
  const current = ref(null);
  const forecast = ref(null);
  const uv = ref(null);

  // Computed
  const currentCityName = computed(() => {
    return current.value?.name || null;
  });
  const currentCityId = computed(() => {
    return current.value?.id || null;
  });
  const temperatureUnits = computed(() => {
    return useMetricUnits.value ? 'metric' : 'imperial';
  });
  const temperatureUnitSymbol = computed(() => {
    return useMetricUnits.value ? '°C' : '°F';
  });

  // API Calls
  const fetchData = async (city, id) => {
    const weatherQueryStr = id
      ? `${baseApiUrl}/data/2.5/weather?id=${id}&units=${temperatureUnits.value}&appid=${apiKey}`
      : `${baseApiUrl}/data/2.5/weather?q=${city}&units=${temperatureUnits.value}&appid=${apiKey}`;
    try {
      const response = await axios.get(weatherQueryStr);
      current.value = response.data;
      if (current.value.coord) {
        fetchUvData(current.value.coord);
      }
    } catch (error) {
      console.error(error.msg);
    }
    const forecastQueryStr = id
      ? `${baseApiUrl}/data/2.5/forecast?id=${id}&units=${temperatureUnits.value}&appid=${apiKey}`
      : `${baseApiUrl}/data/2.5/forecast?q=${city}&units=${temperatureUnits.value}&appid=${apiKey}`;
    try {
      const response = await axios.get(forecastQueryStr);
      forecast.value = response.data;
    } catch (error) {
      console.error(error.msg);
    }
  };
  const fetchUvData = async (coord) => {
    const uvQueryStr = `${baseApiUrl}/data/2.5/uvi?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`;
    try {
      const response = await axios.get(uvQueryStr);
      uv.value = response.data;
    } catch (error) {
      console.error(error.msg);
    }
  };

  return {
    current,
    currentCityName,
    currentCityId,
    forecast,
    temperatureUnitSymbol,
    uv,
    useMetricUnits,
    fetchData,
  };
});
