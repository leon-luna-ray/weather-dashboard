<script setup>
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia'
import { useWeatherStore } from './stores/weather'
import { useSearchStore } from './stores/search'
import CurrentPanel from './components/CurrentPanel.vue';
import ForecastPanel from './components/ForecastPanel.vue';
import Sidebar from './components/Sidebar.vue';

// State
const weatherStore = useWeatherStore();
const searchStore = useSearchStore();
const { currentCity } = storeToRefs(searchStore);

// Lifecycle
onBeforeMount(async () => {
  await weatherStore.fetchData(currentCity.value);
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