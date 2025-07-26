<script setup>
import { onBeforeMount } from 'vue';
import { useMotionPreference } from '@/composables/useMotionPreference';
// import { useGeolocation } from '@vueuse/core'


import { useWeatherStore } from './stores/weather'
import { useSearchStore } from './stores/search'
import CurrentPanel from './components/CurrentPanel.vue';
import ForecastPanel from './components/ForecastPanel.vue';
import Sidebar from './components/Sidebar.vue';

// Stores
const weatherStore = useWeatherStore();
const searchStore = useSearchStore();

// Composables
useMotionPreference();

// Lifecycle
onBeforeMount(() => {
  if (localStorage.getItem('wd-rldev-prev')) {
    const prevCity = JSON.parse(localStorage.getItem('wd-rldev-prev'))[0].name;
    const prevId = JSON.parse(localStorage.getItem('wd-rldev-prev'))[0].id;
    weatherStore.fetchData(prevCity, prevId);
    searchStore.setSearchHistory(JSON.parse(localStorage.getItem('wd-rldev-prev')));
  }
  else {
    weatherStore.fetchData('portland');
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
