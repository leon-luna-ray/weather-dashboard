<script setup>
import { computed, onBeforeMount, reactive, ref } from 'vue';
import axios from 'axios'

const apiKey = import.meta.env.VITE_APP_API_KEY
const baseApiUrl = `https://api.openweathermap.org`

// State
const state = reactive({
  isLoading: false,
  error: null,
  data: null,
});
const city = ref('portland');
const coorinates = ref({
  lat: 0,
  lon: 0,
});

// Computed
const cityName = computed(() => {
  return state.data.city.name;
})

// Methods
const forecastQueryStr = (query) => {
  return `${baseApiUrl}/data/2.5/forecast?q=${query}&appid=${apiKey}`
}
const currentDataStr = (lat, lon) => {
  return `${baseApiUrl}/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
}
const coordinatesQueryStr = (query) => {
  // {city name},{state code},{country code}
  return `${baseApiUrl}/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`
}
const fetchForecastData = async (query) => {
  state.isLoading = true;
  try {
    const response = await axios.get(coordinatesQueryStr(query));

    coorinates.value.lat = response.data[0].lat;
    coorinates.value.lon = response.data[0].lon;


    // const forecast = await axios.get(oneCallQueryStr(coorinates.value.lat, coorinates.value.lon))
    // console.log(forecast)
    console.log(oneCallQueryStr(coorinates.value.lat, coorinates.value.lon))
  } catch (error) {
    state.error = error.message;
  } finally {
    state.isLoading = false;
  }
};

// Lifecycle
onBeforeMount(() => {
  fetchForecastData(city.value);
})
</script>

<template>
  <div v-if="state.data">
    <h1>Weather Dashboard</h1>
    <h2>{{ cityName }}</h2>
  </div>
</template>