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

// Computed
const cityName = computed(() => {
  return state.data.city.name;
})

// Methods
const fetchForecastData = async (query) => {
  state.isLoading = true;
  const queryStr = `${baseApiUrl}/data/2.5/forecast?q=${query}&appid=${apiKey}`;

  try {
    const response = await axios.get(queryStr);
    state.data = response.data;
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