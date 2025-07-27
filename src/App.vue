<script setup>
import { onBeforeMount } from 'vue';
import { useMotionPreference } from '@/composables/useMotionPreference';
import { useGeolocation } from '@vueuse/core'

import { useWeatherStore } from './stores/weather'
import { useSearchStore } from './stores/search'

import Dashboard from '@/components/Dashboard.vue';
import Header from '@/components/Header.vue';
// Stores
const weatherStore = useWeatherStore();
const searchStore = useSearchStore();

// Geolocation
const { coords, isSupported, isReady, error } = useGeolocation({
  enableHighAccuracy: true,
});

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
  <div class="h-dvh">
    <div class="bg-effect"></div>
    <Header />
    <Dashboard />
  </div>
</template>
