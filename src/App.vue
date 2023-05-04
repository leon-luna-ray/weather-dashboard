<script setup>
import { onBeforeMount, ref, } from 'vue';
import { useWeatherStore } from './stores/weather'
import CurrentPanel from './components/CurrentPanel.vue';
import ForecastPanel from './components/ForecastPanel.vue';

// State
const weatherStore = useWeatherStore();
const city = ref('portland');

// Lifecycle
onBeforeMount(async () => {
  await weatherStore.fetchData(city.value);
})
</script>

<template>
  <div class="container flex flex-col justify-center">
    <h1>Weather Dashboard</h1>
    <CurrentPanel />
    <ForecastPanel />
  </div>
</template>