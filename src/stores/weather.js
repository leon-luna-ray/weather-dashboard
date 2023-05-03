import { computed, reactive, ref, watch } from "vue";
import { defineStore } from "pinia";
import axios from 'axios'

export const useWeatherStore = defineStore("weather", () => {
  // State
  const useMetricUnits = ref(false);
  const state = reactive({
    error: null,
    current: null,
    forecast: null,
    uv: null,
  });

  // API Calls
  const fetchCurrentData = async (query) => {
    const queryStr = `${baseApiUrl}/data/2.5/weather?q=${query}&units=${temperatureUnits.value}&appid=${apiKey}`;

    try {
      const response = await axios.get(queryStr);
      return response.data;
    } catch (error) {
      return error.message;
    }
  };
  const fetchForecastData = async (query) => {
    const queryStr = `${baseApiUrl}/data/2.5/forecast?q=${query}&units=${temperatureUnits.value}&appid=${apiKey}`;

    try {
      const response = await axios.get(queryStr);
      return response.data;
    } catch (error) {
      return error.message;
    }
  };
  const fetchUvData = async () => {
    if (coordinates.value) {
      const queryStr = `${baseApiUrl}/data/2.5/uvi?lat=${coordinates.value.lat}&lon=${coordinates.value.lon}&appid=${apiKey}`;

      try {
        const response = await axios.get(queryStr);
        return response.data;
      } catch (error) {
        return error.message;
      }
    }
  };

  // Setters
  const toggleTemperatureUnits = () => {
    useMetricUnits.value = !useMetricUnits.value;
  };

  // Methods
  const formatDate = (str) => {
    const date = new Date(str);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  const roundNumber = (num) => {
    return Math.round(num);
  };
  const formatIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  // Computed
  const cityName = computed(() => {
    const { name } = state.current || "";
    return name;
  });
  const coordinates = computed(() => {
    const { coord } = state.current || {};
    return coord;
  });
  const currentDescription = computed(() => {
    return state.current?.weather[0].description;
  });
  const currentHumidity = computed(() => {
    return `${state.current?.main.humidity}%`;
  });
  const currentWeather = computed(() => {
    return state.current.weather[0].main;
  });
  const currentIconUrl = computed(() => {
    const iconCode = state.current.weather[0].icon || "#";
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  });
  const currentWindSpeed = computed(() => {
    const units = useMetricUnits.value ? "km/h" : "mph";
    return `${Math.round(state.current.wind.speed)} ${units}`;
  });
  const forecastNoonData = computed(() => {
    const indecies = [2, 10, 18, 26, 34];
    return state.forecast?.list.filter((item, index) =>
      indecies.includes(index)
    );
  });
  const temperatureCurrent = computed(() => {
    const { temp } = state.current?.main || {};
    return Math.round(temp);
  });
  const temperatureMax = computed(() => {
    return Math.round(state.current?.main.temp_max);
  });
  const temperatureMin = computed(() => {
    return Math.round(state.current?.main.temp_min);
  });
  const temperatureUnits = computed(() => {
    return useMetricUnits.value ? "metric" : "imperial";
  });
  const temperatureUnitTitle = computed(() => {
    return useMetricUnits.value ? "celsius" : "fahrenheit";
  });
  const temperatureUnitSymbol = computed(() => {
    return useMetricUnits.value ? "°C" : "°F";
  });
  const UVIndex = computed(() => {
    if (!state.uv) return null;
    return state.uv.value;
  });
  const UVColorClass = computed(() => ({
    'bg-green-400 text-white': UVIndex.value < 4,
    'bg-yellow-400': UVIndex.value >= 4 && UVIndex.value <= 8,
    'bg-red-400 text-white': UVIndex.value > 8,
}))

  // Watchers
  watch(coordinates, async () => {
    state.uv = await fetchUvData();
  });

  return {
    currentDescription,
    currentIconUrl,
    currentHumidity,
    currentWeather,
    currentWindSpeed,
    temperatureCurrent,
    temperatureMax,
    temperatureMin,
    temperatureUnitSymbol,
    UVIndex,
    UVColorClass,
    fetchCurrentData,
    fetchCurrentData,
    fetchForecastData,
  };
});
