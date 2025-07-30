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
import { onMounted } from 'vue';
import { useMotionPreference } from '@/composables/useMotionPreference';

import { useWeatherStore } from './stores/weather'
import { useUiStore } from '@/stores/ui';
import { useUserStore } from '@/stores/user';

import Dashboard from '@/components/Dashboard.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Menu from '@/components/Menu.vue';

// Stores
const ui = useUiStore();
const user = useUserStore();
const weather = useWeatherStore();

// Composables
useMotionPreference();

// Lifecycle
onMounted(() => {
  if (!user.searchHistory.length) {
    weather.fetchData(null, 'Los Angeles');
    return;
  };
  weather.fetchData(user.searchHistory[0].id, user.searchHistory[0].name);
})
</script>
