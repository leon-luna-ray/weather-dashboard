<template>
    <main class="">
        <div class="container">
            <div class="grid grid-cols-12 gap-[0.875rem]">

                <!-- Current Weather -->
                <div
                    class="col-span-12 widget w-full p-[2rem] text-center flex flex-col justify-center items-center">
                    <h1 class="display-1 ">{{ weather.currentCityName }}</h1>
                    <div class="flex items-center">
                        <p class="label-text text-[1rem]">{{ weather.currentDescription }}</p>
                        <img :src="weather.currentIconUrl" alt="Current weather icon" />
                    </div>
                    <p class="display-super py-[0.5rem]">{{ weather.currentTemperature }}<span class="text-[4rem]">{{
                        weather.temperatureUnitSymbol }}</span>
                    </p>
                    <div class="flex justify-center gap-[0.5rem] [&_p]:text-[1.25rem]">
                        <p class="label-text">H: {{ weather.currentMaxTemperature }}°</p>|
                        <p class="label-text">L: {{ weather.currentMinTemperature }}°</p>
                    </div>
                </div>
                <!-- current weather detail -->
                <div class="widget col-span-12 w-full p-[2rem] flex flex-col gap-[2rem]">
                    <h2 class="text-[1.75rem] font-bold display-3 text-center">Current Conditions</h2>
                    <ul class="data-list">
                        <li v-if="weather.current?.main?.feels_like">
                            <p class="title">Feels Like</p>
                            <p class="value">{{ Math.round(weather.current.main.feels_like) }}°</p>
                        </li>
                        <li>
                            <p class="title">Humidity</p>
                            <p class="value">{{ weather.currentHumidity }}</p>
                        </li>
                        <li>
                            <p class="title">Wind</p>
                            <p class="value">{{ weather.currentWindSpeed }}</p>
                        </li>
                        <li v-if="weather.current?.wind?.gust">
                            <p class="title">Wind Gust</p>
                            <p class="value">{{ Math.round(weather.current.wind.gust) }} mph</p>
                        </li>
                        <li v-if="weather.current?.visibility">
                            <p class="title">Visibility</p>
                            <p class="value">{{ Math.round(weather.current.visibility / 1609.34) }} mi</p>
                        </li>
                        <li v-if="weather.current?.main?.pressure">
                            <p class="title">Pressure</p>
                            <p class="value">{{ weather.current.main.pressure }} hPa</p>
                        </li>
                        <li>
                            <div class="flex items-center gap-[0.75rem]">
                                <p class="title">UV Index</p>
                                <div
                                    :class="['h-[18px] w-[18px] rounded-full border-black border-[2px]', weather.uvColorClass]">
                                </div>
                            </div>
                            <p class="value">{{ weather.currentUvIndex }}</p>
                        </li>
                        <li v-if="weather.current?.sys?.sunrise">
                            <p class="title">Sunrise</p>
                            <p class="value">{{ formatTime(weather.current.sys.sunrise) }}</p>
                        </li>
                        <li v-if="weather.current?.sys?.sunset">
                            <p class="title">Sunset</p>
                            <p class="value">{{ formatTime(weather.current.sys.sunset) }}</p>
                        </li>
                    </ul>
                </div>
                <!-- Forecast -->
                <div class="widget col-span-12 w-full p-[2rem] flex flex-col gap-[2rem]">
                    <h2 class="text-[1.75rem] font-bold display-3 text-center">5-Day Forecast</h2>
                    <ul v-if="weather.forecast?.list" class="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <li v-for="(day, index) in forecastDays" :key="index"
                            class="forecast-day flex flex-col items-center p-4 rounded-lg bg-white/40 backdrop-blur-lg border-black border-[2px]">
                            <h3 class="font-semibold text-lg display-3">{{ formatDate(day.dt) }}</h3>
                            <img :src="`http://openweathermap.org/img/w/${day.weather[0].icon}.png`"
                                alt="Forecast weather icon" class="my-2" />
                            <p class="text-xl font-bold display-2">{{ Math.round(day.main.temp) }}{{ weather.temperatureUnitSymbol
                                }}</p>
                            <p class="label-text">{{ day.weather[0].main }}</p>
                            <div class="flex justify-between w-full mt-2">
                                <p class="text-sm">H: {{ Math.round(day.main.temp_max) }}°</p>
                                <p class="text-sm">L: {{ Math.round(day.main.temp_min) }}°</p>
                            </div>
                            <div class="font-garamond grid grid-cols-2 gap-2 w-full mt-3 text-sm">
                                <div>
                                    <p class="font-medium">Humidity</p>
                                    <p>{{ day.main.humidity }}%</p>
                                </div>
                                <div>
                                    <p class="font-medium">Wind</p>
                                    <p>{{ Math.round(day.wind.speed) }} {{ weather.isMetric ? 'km/h' : 'mph' }}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { computed } from 'vue';
import { useWeatherStore } from '../stores/weather'

// State
const weather = useWeatherStore();

const forecastDays = computed(() => {
    if (!weather.forecast?.list) return [];

    const uniqueDays = [];
    const processedDates = new Set();

    weather.forecast.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateString = date.toLocaleDateString();

        if (!processedDates.has(dateString)) {
            processedDates.add(dateString);
            uniqueDays.push(item);
        }
    });

    return uniqueDays.slice(0, 5);
});

const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};
</script>
