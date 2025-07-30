<template>
    <div class="h-full">
        <div class="container text-center flex flex-col gap-[2rem]">
            <button @click="user.toggleMeasurementUnits" class="btn border-[2px] w-max rounded-lg py-1 px-4">{{
                weather.isMetric ? 'C' : 'F' }}</button>
            <h1 class="display-2">Search</h1>
            <Search />
            <SearchHistory />
        </div>
    </div>
</template>

<script setup>
import { useWeatherStore } from '@/stores/weather';
import { useUserStore } from '@/stores/user';

import Search from './Search.vue';
import SearchHistory from './SearchHistory.vue';

const user = useUserStore();
const weather = useWeatherStore();
</script>
