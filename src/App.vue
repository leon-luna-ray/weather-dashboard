<script setup>
import { onBeforeMount, ref, } from 'vue';
import { useWeatherStore } from './stores/weather'
import CurrentPanel from './components/CurrentPanel.vue';
import ForecastPanel from './components/ForecastPanel.vue';
import Sidebar from './components/Sidebar.vue';

// State
const weatherStore = useWeatherStore();
const city = ref('portland');

// Lifecycle
onBeforeMount(async () => {
  await weatherStore.fetchData(city.value);
})
</script>

<template>
  <div id="app-main">
    <Sidebar />
    <main>
      <CurrentPanel />
      <ForecastPanel />
    </main>
  </div>
</template>