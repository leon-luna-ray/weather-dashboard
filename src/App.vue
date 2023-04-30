<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import axios from 'axios'

const key = import.meta.env.VITE_APP_API_KEY

// State
const weatherData = ref(null);

// Computed
const cityName = computed(()=>{
  return weatherData.value.city.name;
})

onBeforeMount(async () => {
  const query = `https://api.openweathermap.org/data/2.5/forecast?q=portland&appid=${key}`
  const res = await axios.get(query)
  weatherData.value = res.data
})
</script>

<template>
  <div v-if="weatherData">
    <h1>Weather Dashboard</h1>
    <h2>{{ cityName }}</h2>
  </div>
</template>