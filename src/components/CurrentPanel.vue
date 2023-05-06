<script setup>
import { computed } from 'vue';
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
    <h3 class="current-temp">{{ temperatureCurrent }}{{ temperatureUnitSymbol }}</h3>

    <div class="current-city">
      <h2 class="city-name">{{ currentCityName }}</h2>
      <img :src="currentIconUrl" :alt="`${currentDescription} icon`">
    </div>
    <span class="current-desc">{{ currentDescription }}</span>
    <div class="conditions">
      <!-- <div v-if="UVIndex" :class="['w-max', UVColorClass]">UV Index: {{ UVIndex }}</div> -->
      <div class="grid-item">
        <div class="label">Min</div>
        <div class="value">{{ temperatureMin }}{{ temperatureUnitSymbol }}</div>
      </div>
      <div class="grid-item">
        <div class="label">Max</div>
        <div class="value">{{ temperatureMax }}{{ temperatureUnitSymbol }}</div>
      </div>
      <div class="grid-item">
        <div class="label">Wind</div>
        <div class="value">{{ currentWindSpeed }}</div>
      </div>
      <div class="grid-item">
        <div class="label">Humidity</div>
        <div class="value">{{ currentHumidity }}</div>
      </div>
    </div>
  </div>
</template>