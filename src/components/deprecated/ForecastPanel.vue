<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../../stores/weather'

// State
const weatherStore = useWeatherStore();
const {
    forecast,
    temperatureUnitSymbol,
} = storeToRefs(weatherStore);

// Computed
const forecastNoonData = computed(() => {
    const indecies = [2, 10, 18, 26, 34];
    return forecast.value?.list.filter((item, index) =>
        indecies.includes(index)
    );
});

// Methods
const formatDate = (str) => {
    const date = new Date(str);
    const dayOptions = { weekday: 'short' };
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDay = date.toLocaleDateString('en-US', dayOptions);
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);

    return {
        day: formattedDay,
        date: formattedDate,
    };
}
const formatIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
}
</script>

<template>
    <div v-if="forecastNoonData" class="forecast">
        <h3 class="title">Forecast</h3>
        <ul class="list">
            <div v-for="item in forecastNoonData" class="card forecast-day">

                <div class="day">
                    <div class="title">{{ formatDate(item.dt_txt).day }}</div>
                    <div class="temp">{{ Math.round(item.main.temp) }}{{ temperatureUnitSymbol }}</div>
                    <img :src="formatIconUrl(item.weather[0].icon)" />
                </div>
                <div class="description">{{ item.weather[0].description }}</div>
                <div class="img-wrap">
                </div>
            </div>
        </ul>
    </div>
</template>
