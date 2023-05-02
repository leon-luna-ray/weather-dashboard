<script setup>
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
import axios from 'axios'

const apiKey = import.meta.env.VITE_APP_API_KEY
const baseApiUrl = `https://api.openweathermap.org`

// State
const state = reactive({
  error: null,
  current: null,
  forecast: null,
  uv: null,
});
const city = ref('portland');

// Computed
const cityName = computed(() => {
  if (!state.current) return null;
  return state.current.name;
})
const coordinates = computed(() => {
  if (!state.current) return null;
  return state.current.coord;
})
const UVIndex = computed(() => {
  if (!state.uv) return null;
  return state.uv.value;
})

// Methods
const fetchCurrentData = async (query) => {
  const queryStr = `${baseApiUrl}/data/2.5/weather?q=${query}&appid=${apiKey}`;

  try {
    const response = await axios.get(queryStr);
    state.current = response.data;
  } catch (error) {
    state.error = error.message;
  }
};
const fetchForecastData = async (query) => {
  const queryStr = `${baseApiUrl}/data/2.5/forecast?q=${query}&appid=${apiKey}`;

  try {
    const response = await axios.get(queryStr);
    state.forecast = response.data;
  } catch (error) {
    state.error = error.message;
  }
};
const fetchUvData = async () => {
  if (coordinates.value) {
    const queryStr = `${baseApiUrl}/data/2.5/uvi?lat=${coordinates.value.lat}&lon=${coordinates.value.lon}&appid=${apiKey}`;

    try {
      const response = await axios.get(queryStr);
      state.uv = response.data;
    } catch (error) {
      state.error = error.message;
    }
  }
};

// Lifecycle
onBeforeMount(() => {
  fetchCurrentData(city.value);
  fetchForecastData(city.value);
})

// Watchers
watch(coordinates, fetchUvData)
</script>

<template>
  <div v-if="state.forecast">
    <h1>Weather Dashboard</h1>
    <h2>{{ cityName }}</h2>
  </div>
</template>