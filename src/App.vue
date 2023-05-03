<script setup>
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
import axios from 'axios'

import CurrentPanel from './components/CurrentPanel.vue';

const apiKey = import.meta.env.VITE_APP_API_KEY
const baseApiUrl = `https://api.openweathermap.org`

// State
const city = ref('portland');
const useMetricUnits = ref(false);

const state = reactive({
  error: null,
  current: null,
  forecast: null,
  uv: null,
});

// Computed
const cityName = computed(() => {
  const { name } = state.current || '';
  return name;
})
const coordinates = computed(() => {
  const { coord } = state.current || {};
  return coord;
})
const currentDescription = computed(() => {
  return state.current?.weather[0].description;
})
const currentHumidity = computed(() => {
  return `${state.current?.main.humidity}%`;
})
const currentWeather = computed(() => {
  return state.current.weather[0].main;
})
const currentIconUrl = computed(() => {
  const iconCode = state.current.weather[0].icon || '#'
  return `http://openweathermap.org/img/w/${iconCode}.png`;
})
const currentWindSpeed = computed(() => {
  // Todo add km/h
  return `${Math.round(state.current.wind.speed)} mph`;
})
const forecastNoonData = computed(() => {
  const indecies = [2, 10, 18, 26, 34];
  return state.forecast?.list.filter((item, index) => indecies.includes(index));
});
const temperatureCurrent = computed(() => {
  const { temp } = state.current?.main || {};
  return Math.round(temp);
})
const temperatureMax = computed(() => {
  return Math.round(state.current?.main.temp_max);
})
const temperatureMin = computed(() => {
  return Math.round(state.current?.main.temp_min);
})
const temperatureUnits = computed(() => {
  return useMetricUnits.value ? 'metric' : 'imperial';
})
const temperatureUnitTitle = computed(() => {
  return useMetricUnits.value ? 'celsius' : 'fahrenheit';
})
const temperatureUnitSymbol = computed(() => {
  return useMetricUnits.value ? '°C' : '°F';
})
const UVIndex = computed(() => {
  if (!state.uv) return null;
  return state.uv.value;
})
const UVColorClass = computed(() => ({
  'bg-green-400 text-white': UVIndex.value < 4,
  'bg-yellow-400': UVIndex.value >= 4 && UVIndex.value <= 8,
  'bg-red-400 text-white': UVIndex.value > 8,
}))

// Methods
const formatDate = (str) => {
  const date = new Date(str);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
}

const roundNumber = (num) => {
  return Math.round(num);
}
const formatIconUrl = (iconCode) => {
  return `http://openweathermap.org/img/w/${iconCode}.png`;
}
const toggleTemptrueUnits = () => {
  useMetricUnits.value = !useMetricUnits.value;
}
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

// Lifecycle
onBeforeMount(async () => {
  state.current = await fetchCurrentData(city.value);
  state.forecast = await fetchForecastData(city.value);
})

// Watchers
watch(coordinates, async () => {
  state.uv = await fetchUvData();
});
</script>

<template>
  <div class="container flex flex-col justify-center">
    <h1>Weather Dashboard</h1>
    <div v-if="state.current" class="current-panel">

      <h2>{{ cityName }}</h2>

      <div class="current">
        <span>Current Conditions</span>
        <h3>{{ temperatureCurrent }} {{ temperatureUnitSymbol }}</h3>
        <div class="img-wrap">
          <img :src="currentIconUrl" :alt="`${currentWeather} icon`">
        </div>
        <p>{{ currentDescription }}</p>
        <ul>
          <li v-if="state.uv" :class="['w-max', UVColorClass]">UV Index: {{ state.uv.value }}</li>
          <li>Humidity {{ currentHumidity }}</li>
          <li>Wind {{ currentWindSpeed }}</li>
          <li>Max {{ temperatureMax }}{{ temperatureUnitSymbol }}</li>
          <li>Min {{ temperatureMin }}{{ temperatureUnitSymbol }}</li>
        </ul>
      </div>

    </div>
    <div class="forecast py-5">
      <h3>Forecast</h3>
      <div class="cards flex gap-5">
        <div v-for="item in forecastNoonData" class="card forecast-day">
          <div class="date">{{ formatDate(item.dt_txt) }}</div>
          <div class="img-wrap">
            <img :src="formatIconUrl(item.weather[0].icon)" />
          </div>
          <ul>
            <li>Temp {{ roundNumber(item.main.temp) }}{{ temperatureUnitSymbol }}</li>
            <li>Humidity {{ item.main.humidity }}%</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>