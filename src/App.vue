<script setup>
import { onBeforeMount } from 'vue';
import { useWeatherStore } from './stores/weather'
import CurrentPanel from './components/CurrentPanel.vue';
import ForecastPanel from './components/ForecastPanel.vue';
import Sidebar from './components/Sidebar.vue';

// State
const weatherStore = useWeatherStore();

// Lifecycle
onBeforeMount(() => {
  if (!window.localStorage.getItem('wd-rldev-prev')) {
    weatherStore.fetchData('portland');
  }
  else {
    const prevCity = JSON.parse(localStorage.getItem('wd-rldev-prev'))[0];
    weatherStore.fetchData(prevCity);
  }
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
