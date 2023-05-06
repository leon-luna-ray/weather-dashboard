<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../stores/weather'

// State
const weatherStore = useWeatherStore();
const {
    current,
    currentCityName,
    temperatureUnitSymbol,
    useMetricUnits,
    uv,
} = storeToRefs(weatherStore);

const isCurrentLoaded = computed(() => {
    return current.value !== null;
  });
const currentDescription = computed(() => {
    return current.value?.weather[0].description;
  });
  const currentHumidity = computed(() => {
    return `${current.value?.main.humidity}%`;
  });
  const currentIconUrl = computed(() => {
    const iconCode = current.value?.weather[0].icon || '#';
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  });
  const currentWindSpeed = computed(() => {
    const units = useMetricUnits.value ? 'km/h' : 'mph';
    return `${Math.round(current.value?.wind.speed)} ${units}`;
  });
  const temperatureCurrent = computed(() => {
    return Math.round(current.value?.main.temp) || null;
  });
  const temperatureMax = computed(() => {
    return Math.round(current.value?.main.temp_max) || null;
  });
  const temperatureMin = computed(() => {
    return Math.round(current.value?.main.temp_min) || null;
  });
  const UVIndex = computed(() => {
    return uv.value?.value || null;
  });
  const UVColorClass = computed(() => ({
    'bg-green-400 text-white': UVIndex.value < 4,
    'bg-yellow-400': UVIndex.value >= 4 && UVIndex.value <= 8,
    'bg-red-400 text-white': UVIndex.value > 8,
  }));
</script>

<template>
    <div v-if="isCurrentLoaded" class="current">
        <h2>{{ currentCityName }}</h2>
        <span>Current Conditions</span>
        <h3>{{ temperatureCurrent }}{{ temperatureUnitSymbol }}</h3>
        <div class="img-wrap">
            <img :src="currentIconUrl" :alt="`${currentDescription} icon`">
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