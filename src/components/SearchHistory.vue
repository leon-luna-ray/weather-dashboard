<script setup>
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '../stores/weather'
import { useSearchStore } from '../stores/search'

// State
const weatherStore = useWeatherStore();
const searchStore = useSearchStore();
const { searchHistory } = storeToRefs(searchStore);
</script>

<template>
    <div v-if="searchHistory.length > 1">
        <p>Serach History</p>
        <ul class="search-list">
            <li v-for="item in searchHistory.slice(1)">{{ item.name }}</li>
        </ul>
    </div>
</template>