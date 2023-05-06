<script setup>
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '../stores/weather'
import { useSearchStore } from '../stores/search'

// State
const weatherStore = useWeatherStore();
const searchStore = useSearchStore();
const { searchHistory } = storeToRefs(searchStore);
</script>

<template>
    <div v-if="searchHistory.length > 1" class="pt-4">
        <p>Serach History</p>
        <ul class="search-list pt-3">
            <li v-for="item in searchHistory.slice(1)" @click.prevent="weatherStore.fetchData(item.name, item.id)"
                class="hover:cursor-pointer hover:underline">
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>