import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const apiKey = import.meta.env.VITE_APP_API_KEY;
const baseApiUrl = `https://api.openweathermap.org`;

export const useWeatherStore = defineStore('weather', () => {
  // State
  const isMetric = ref(false);
  const userGeoCoords = ref({ lat: null, lon: null });
  const current = ref(null);
  const forecast = ref(null);
  const uv = ref(null);

  // Computed
  const isCurrentLocation = computed(() => {
    return userGeoCoords.value.lat !== null && userGeoCoords.value.lon !== null;
  });
  const temperatureUnits = computed(() => {
    return isMetric.value ? 'metric' : 'imperial';
  });
  const temperatureUnitSymbol = computed(() => {
    return isMetric.value ? '°C' : '°F';
  });
  const currentCityName = computed(() => {
    return current.value?.name || null;
  });
  const currentCityId = computed(() => {
    return current.value?.id || null;
  });
  const currentDescription = computed(() => {
    return current.value?.weather[0].description || null;
  });
  const currentHumidity = computed(() => {
    return `${current.value?.main.humidity}%`;
  });
  const currentIconUrl = computed(() => {
    const iconCode = current.value?.weather[0].icon || '#';
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  });
  const currentWindSpeed = computed(() => {
    const units = isMetric.value ? 'km/h' : 'mph';
    return `${Math.round(current.value?.wind.speed)} ${units}`;
  });
  const currentTemperature = computed(() => {
    return Math.round(current.value?.main.temp) || null;
  });
  const currentMaxTemperature = computed(() => {
    return Math.round(current.value?.main.temp_max) || null;
  });
  const currentMinTemperature = computed(() => {
    return Math.round(current.value?.main.temp_min) || null;
  });
  const currentUvIndex = computed(() => {
    return uv.value?.value || null;
  });
  const uvColorClass = computed(() => ({
    'bg-green-400': currentUvIndex.value < 4,
    'bg-yellow-400': currentUvIndex.value >= 4 && currentUvIndex.value <= 8,
    'bg-red-400': currentUvIndex.value > 8,
  }));
  const bgColorClass = computed(() => ({
    'blue': current.value?.weather[0].main?.toLowerCase() === 'clouds',
  }));
  // API Calls
  const fetchData = async (city, id) => {
    const weatherQueryStr = id
      ? `${baseApiUrl}/data/2.5/weather?id=${id}&units=${temperatureUnits.value}&appid=${apiKey}`
      : `${baseApiUrl}/data/2.5/weather?q=${city}&units=${temperatureUnits.value}&appid=${apiKey}`;
    try {
      const response = await axios.get(weatherQueryStr);
      current.value = response.data;
      console.log('Current Weather Data:', current.value);
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
  const fetchDataByCoords = async (lat, lon) => {
    const weatherQueryStr = `${baseApiUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${temperatureUnits.value}&appid=${apiKey}`;
    try {
      const response = await axios.get(weatherQueryStr);
      current.value = response.data;
      console.log('Current Weather Data by Coords:', current.value);
      if (current.value.coord) {
        fetchUvData(current.value.coord);
      }
    } catch (error) {
      console.error(error.msg);
    }
    const forecastQueryStr = `${baseApiUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${temperatureUnits.value}&appid=${apiKey}`;
    try {
      const response = await axios.get(forecastQueryStr);
      forecast.value = response.data;
    } catch (error) {
      console.error(error.msg);
    }
  };

  watch(isMetric, (newValue) => {
    if(!newValue) return;
    fetchData(currentCityName.value, currentCityId.value);
  });

  return {
    current,
    isCurrentLocation,
    userGeoCoords,
    currentCityName,
    currentCityId,
    currentDescription,
    currentHumidity,
    currentIconUrl,
    currentWindSpeed,
    currentTemperature,
    currentMaxTemperature,
    currentMinTemperature,
    currentUvIndex,
    uvColorClass,
    forecast,
    temperatureUnits,
    temperatureUnitSymbol,
    uv,
    isMetric,
    bgColorClass,
    fetchData,
    fetchDataByCoords,
  };
});
