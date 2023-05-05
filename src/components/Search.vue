<script setup>
import { ref, computed } from 'vue';
import { useWeatherStore } from '../stores/weather'
import _ from 'lodash'; // import the Lodash library

const weatherStore = useWeatherStore();
const searchQuery = ref('');

// Define a debounce function to delay the search request
const debounceSearch = _.debounce(() => {
    console.log('Search query:', searchQuery.value);
    // Perform search request and update searchResults
    weatherStore.fetchData(searchQuery.value);
    searchQuery.value = '';
}, 200);

function handleSubmit() {
    debounceSearch();
}
</script>

<template>
    <div id="sidebar">
        <form class="search" @submit.prevent="handleSubmit">
            <input type="text" v-model="searchQuery" />
            <button>Search</button>
        </form>
    </div>
</template>

