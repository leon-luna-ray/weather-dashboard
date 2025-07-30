<template>
  <div class="h-dvh flex justify-between flex-col">
    <div>
      <Header />
      <Menu v-if="ui.isMenuOpen" />
      <Dashboard v-else />
    </div>
    <Footer />
    <div :class="['bg-effect', weather.bgColorClass]"></div>
  </div>
</template>

<script setup>
import { onMounted, nextTick, ref, watch } from 'vue';
import { useMotionPreference } from '@/composables/useMotionPreference';
// import { useGeolocation } from '@vueuse/core'

import { useWeatherStore } from './stores/weather'
import { useSearchStore } from './stores/search'
import { useUiStore } from '@/stores/ui';
import { useUserStore } from '@/stores/user';
// import { useLocation } from '@/composables/useLocation';

import Dashboard from '@/components/Dashboard.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Menu from '@/components/Menu.vue';

// Stores
const weather = useWeatherStore();
const search = useSearchStore();
const user = useUserStore();
const ui = useUiStore();

// Composables
// const { getCurrentLocation } = useLocation();

useMotionPreference();

// Lifecycle
onMounted(async () => {
  await nextTick();
  // if (localStorage.getItem('wd-rldev-prev')) {
  //   const prevCity = JSON.parse(localStorage.getItem('wd-rldev-prev'))[0].name;
  //   const prevId = JSON.parse(localStorage.getItem('wd-rldev-prev'))[0].id;
  //   weather.fetchData(prevCity, prevId);
  //   search.setSearchHistory(JSON.parse(localStorage.getItem('wd-rldev-prev')));
  // }
  // else {
  weather.fetchData('paris');
  // }
})
</script>
