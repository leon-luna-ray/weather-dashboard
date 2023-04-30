<script setup>
import { computed, onBeforeMount, reactive, ref } from 'vue';
import axios from 'axios'

const apiKey = import.meta.env.VITE_APP_API_KEY
const baseApiUrl = `http://api.openweathermap.org`

// State
const state = reactive({
  isLoading: false,
  error: null,
  data: null,
});
const city = ref('portland');

// Computed
const cityName = computed(() => {
  return state.data.city.name;
})

// Methods
const forecastQueryStr = (query) => {
  return `${baseApiUrl}/data/2.5/forecast?q=${query}&appid=${apiKey}`
}
const coordinatesQueryStr = (query) => {
  // {city name},{state code},{country code}
  return `${baseApiUrl}/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`
}
const fetchForecastData = async (query) => {
  state.isLoading = true;

  try {
    const response = await axios.get(forecastQueryStr(query));
    state.data = response.data;
  } catch (error) {
    state.error = error.message;
  } finally {
    state.isLoading = false;
  }
};

onBeforeMount(async () => {
  fetchForecastData(city.value);
})
</script>

<template>
  <div v-if="state.data">
    <h1>Weather Dashboard</h1>
    <h2>{{ cityName }}</h2>
  </div>
</template>