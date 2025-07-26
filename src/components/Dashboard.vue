<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../stores/weather'

// State
const weather = useWeatherStore();
</script>

<template>
    <main class="bg-purple-500 text-white">
        <div class="container">
            <h1>Cloud 9</h1>
        </div>
    </main>
</template>