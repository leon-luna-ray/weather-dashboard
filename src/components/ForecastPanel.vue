<script setup>
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../stores/weather'

// State
const weatherStore = useWeatherStore();
const {
    forecastNoonData,
    temperatureUnitSymbol,
} = storeToRefs(weatherStore);

// Methods
const formatDate = (str) => {
    const date = new Date(str);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}
const formatIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
}
</script>

<template>
    <div v-if="forecastNoonData" class="forecast py-5">
        <h3>Forecast</h3>
        <div class="cards flex gap-5">
            <div v-for="item in forecastNoonData" class="card forecast-day">
                <div class="date">{{ formatDate(item.dt_txt) }}</div>
                <div class="img-wrap">
                    <img :src="formatIconUrl(item.weather[0].icon)" />
                </div>
                <ul>
                    <li>Temp {{ Math.round(item.main.temp) }}{{ temperatureUnitSymbol }}</li>
                    <li>Humidity {{ item.main.humidity }}%</li>
                </ul>
            </div>
        </div>
    </div>
</template>