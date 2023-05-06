<script setup>
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '../stores/weather'
import { useSearchStore } from '../stores/search'
// State
const weatherStore = useWeatherStore();
const searchStore = useSearchStore();
</script>

<template>
    <div>
        <h2>Hello world this is serach history</h2>
    </div>
</template>