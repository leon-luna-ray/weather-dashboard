<template>
    <button @click="getCurrentLocation">
        <slot></slot>
    </button>
</template>
<script setup>
// Geolocation
import { useGeolocation } from '@vueuse/core';
import { useWeatherStore } from '@/stores/weather';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
const weather = useWeatherStore();

const { coords, locatedAt, error, resume, pause } = useGeolocation();

const getCurrentLocation = () => {
    resume();

    if (error.value) {
        alert('Geolocation error:', error.value);
        return;
    }

    weather.userGeoCoords = { lat: coords.value.latitude, lon: coords.value.longitude };
    weather.fetchDataByCoords(weather.userGeoCoords.lat, weather.userGeoCoords.lon);
    pause();

    ui.isMenuOpen = false;
};
</script>