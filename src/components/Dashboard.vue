<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../stores/weather'

// State
const weather = useWeatherStore();
</script>

<template>
    <main class="">
        <div class="container">
            <h1>Dashboard</h1>
        </div>
    </main>
</template>