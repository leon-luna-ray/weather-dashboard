<template>
    <div class="h-full">
        <div class="container text-center flex flex-col gap-[2rem]">
            <button @click="user.toggleMeasurementUnits" class="btn border-[2px] w-max rounded-lg py-1 px-4">{{
                weather.isMetric ? 'C' : 'F' }}</button>
            <h1 class="display-2">Search</h1>
            <!-- <LocationBtn>Current Location</LocationBtn> -->
            <Search />
            <SearchHistory />
        </div>
    </div>
</template>

<script setup>
import { watch } from 'vue';
import { useWeatherStore } from '@/stores/weather';
import { useUiStore } from '@/stores/ui';
import { useUserStore } from '@/stores/user';

import Search from './Search.vue';
import SearchHistory from './SearchHistory.vue';
import LocationBtn from '@/components/LocationBtn.vue';

const ui = useUiStore();
const user = useUserStore();
const weather = useWeatherStore();

// watch(() => user.SearchHistory, (newValue) => {
//     ui.isMenuOpen = false;
// });
// watch(() => user.measurementUnits, () => {
//     ui.isMenuOpen = false;
// });
// watch(()=> weather.current, () => {
//     ui.isMenuOpen = false;
// });
// watch(()=> weather.isMetric, (newValue) => {
//     // if (!newValue) return;
//     ui.isMenuOpen = false;
// });
</script>
