<script setup>
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../stores/weather'

// State
const weatherStore = useWeatherStore();
const {
    currentDescription,
    currentIconUrl,
    currentHumidity,
    currentWeather,
    currentWindSpeed,
    temperatureCurrent,
    temperatureMax,
    temperatureMin,
    temperatureUnitSymbol,
    UVIndex,
    UVColorClass,
} = storeToRefs(weatherStore);

</script>

<template>
    <div v-if="currentWeather" class="current">
        <span>Current Conditions</span>
        <h3>{{ temperatureCurrent }} {{ temperatureUnitSymbol }}</h3>
        <div class="img-wrap">
            <img :src="currentIconUrl" :alt="`${currentWeather} icon`">
        </div>
        <p>{{ currentDescription }}</p>
        <ul>
            <li v-if="UVIndex" :class="['w-max', UVColorClass]">UV Index: {{ UVIndex }}</li>
            <li>Humidity {{ currentHumidity }}</li>
            <li>Wind {{ currentWindSpeed }}</li>
            <li>Max {{ temperatureMax }}{{ temperatureUnitSymbol }}</li>
            <li>Min {{ temperatureMin }}{{ temperatureUnitSymbol }}</li>
        </ul>
    </div>
</template>