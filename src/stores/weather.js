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
  const isCurrentLoaded = computed(() => {
    return current.value !== null;
  });
  const cityName = computed(() => {
    return current.value?.name || null;
  });
  const currentDescription = computed(() => {
    return current.value?.weather[0].description;
  });
  const currentHumidity = computed(() => {
    return `${current.value?.main.humidity}%`;
  });
  const currentIconUrl = computed(() => {
    const iconCode = current.value?.weather[0].icon || '#';
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  });
  const currentWindSpeed = computed(() => {
    const units = useMetricUnits.value ? 'km/h' : 'mph';
    return `${Math.round(current.value?.wind.speed)} ${units}`;
  });
  const forecastNoonData = computed(() => {
    const indecies = [2, 10, 18, 26, 34];
    return forecast.value?.list.filter((item, index) =>
      indecies.includes(index)
    );
  });
  const temperatureCurrent = computed(() => {
    return Math.round(current.value?.main.temp) || null;
  });
  const temperatureMax = computed(() => {
    return Math.round(current.value?.main.temp_max) || null;
  });
  const temperatureMin = computed(() => {
    return Math.round(current.value?.main.temp_min) || null;
  });
  const temperatureUnits = computed(() => {
    return useMetricUnits.value ? 'metric' : 'imperial';
  });
  const temperatureUnitSymbol = computed(() => {
    return useMetricUnits.value ? '°C' : '°F';
  });
  const UVIndex = computed(() => {
    return uv.value?.value || null;
  });
  const UVColorClass = computed(() => ({
    'bg-green-400 text-white': UVIndex.value < 4,
    'bg-yellow-400': UVIndex.value >= 4 && UVIndex.value <= 8,
    'bg-red-400 text-white': UVIndex.value > 8,
  }));

  // API Calls
  const fetchData = async (city) => {
    const weatherQueryStr = `${baseApiUrl}/data/2.5/weather?q=${city}&units=${temperatureUnits.value}&appid=${apiKey}`;
    try {
      const response = await axios.get(weatherQueryStr);
      current.value = response.data;
      if (current.value.coord) {
        fetchUvData(current.value.coord);
      }
    } catch (error) {
      console.error(error.msg);
    }
    const forecastQueryStr = `${baseApiUrl}/data/2.5/forecast?q=${city}&units=${temperatureUnits.value}&appid=${apiKey}`;
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
    cityName,
    currentDescription,
    currentIconUrl,
    currentHumidity,
    currentWindSpeed,
    forecastNoonData,
    isCurrentLoaded,
    temperatureCurrent,
    temperatureMax,
    temperatureMin,
    temperatureUnitSymbol,
    UVIndex,
    UVColorClass,
    fetchData,
  };
});
