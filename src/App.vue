<script setup>
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia'
import axios from 'axios'

import { useWeatherStore } from './stores/weather'
import CurrentPanel from './components/CurrentPanel.vue';

const apiKey = import.meta.env.VITE_APP_API_KEY
const baseApiUrl = `https://api.openweathermap.org`

// State
// Move to ui store?
const weatherStore = useWeatherStore();
const { useMetricUnits } = storeToRefs(weatherStore);
const city = ref('portland');

// const state = reactive({
//   error: null,
//   current: null,
//   forecast: null,
//   uv: null,
// });

// // Computed

// const coordinates = computed(() => {
//   const { coord } = state.current || {};
//   return coord;
// })


// const currentWeather = computed(() => {
//   return state.current.weather[0].main;
// })


// const forecastNoonData = computed(() => {
//   const indecies = [2, 10, 18, 26, 34];
//   return state.forecast?.list.filter((item, index) => indecies.includes(index));
// });

// const UVIndex = computed(() => {
//   if (!state.uv) return null;
//   return state.uv.value;
// })
// const UVColorClass = computed(() => ({
//   'bg-green-400 text-white': UVIndex.value < 4,
//   'bg-yellow-400': UVIndex.value >= 4 && UVIndex.value <= 8,
//   'bg-red-400 text-white': UVIndex.value > 8,
// }))

// // Methods
// const formatDate = (str) => {
//   const date = new Date(str);
//   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//   const formattedDate = date.toLocaleDateString('en-US', options);
//   return formattedDate;
// }

// const roundNumber = (num) => {
//   return Math.round(num);
// }
// const formatIconUrl = (iconCode) => {
//   return `http://openweathermap.org/img/w/${iconCode}.png`;
// }
// const toggleTemptrueUnits = () => {
//   useMetricUnits.value = !useMetricUnits.value;
// }
// // API Calls
// const fetchCurrentData = async (query) => {
//   const queryStr = `${baseApiUrl}/data/2.5/weather?q=${query}&units=${temperatureUnits.value}&appid=${apiKey}`;

//   try {
//     const response = await axios.get(queryStr);
//     return response.data;
//   } catch (error) {
//     return error.message;
//   }
// };
// const fetchForecastData = async (query) => {
//   const queryStr = `${baseApiUrl}/data/2.5/forecast?q=${query}&units=${temperatureUnits.value}&appid=${apiKey}`;

//   try {
//     const response = await axios.get(queryStr);
//     return response.data;
//   } catch (error) {
//     return error.message;
//   }
// };
// const fetchUvData = async () => {
//   if (coordinates.value) {
//     const queryStr = `${baseApiUrl}/data/2.5/uvi?lat=${coordinates.value.lat}&lon=${coordinates.value.lon}&appid=${apiKey}`;

//     try {
//       const response = await axios.get(queryStr);
//       return response.data;
//     } catch (error) {
//       return error.message;
//     }
//   }
// };

// Lifecycle
onBeforeMount(async () => {
  await weatherStore.fetchData(city.value);
})

// Watchers
// watch(coordinates, async () => {
//   state.uv = await fetchUvData();
// });
</script>

<template>
  <!-- <div v-if="!state.current || !state.forecast">Loading...</div> -->
  <div class="container flex flex-col justify-center">
    <h1>Weather Dashboard</h1>
    <CurrentPanel />
    <!-- <div v-if="state.current" class="current-panel">



      <div class="current">
        <span>Current Conditions</span>
        <h3>{{ temperatureCurrent }} {{ temperatureUnitSymbol }}</h3>
        <div class="img-wrap">
          <img :src="currentIconUrl" :alt="`${currentWeather} icon`">
        </div>
        <p>{{ currentDescription }}</p>
        <ul>
          <li v-if="state.uv" :class="['w-max', UVColorClass]">UV Index: {{ state.uv.value }}</li>
          <li>Humidity {{ currentHumidity }}</li>
          <li>Wind {{ currentWindSpeed }}</li>
          <li>Max {{ temperatureMax }}{{ temperatureUnitSymbol }}</li>
          <li>Min {{ temperatureMin }}{{ temperatureUnitSymbol }}</li>
        </ul>
      </div>

    </div>
    <div class="forecast py-5">
      <h3>Forecast</h3>
      <div class="cards flex gap-5">
        <div v-for="item in forecastNoonData" class="card forecast-day">
          <div class="date">{{ formatDate(item.dt_txt) }}</div>
          <div class="img-wrap">
            <img :src="formatIconUrl(item.weather[0].icon)" />
          </div>
          <ul>
            <li>Temp {{ roundNumber(item.main.temp) }}{{ temperatureUnitSymbol }}</li>
            <li>Humidity {{ item.main.humidity }}%</li>
          </ul>
        </div>
      </div>
    </div> -->
  </div>
</template>