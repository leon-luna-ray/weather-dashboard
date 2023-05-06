<script setup>
import { ref } from 'vue';
import { useSearchStore } from '../stores/search';

const searchQuery = ref('');
const searchStore = useSearchStore();

function handleSubmit() {
    searchStore.debounceSearch(searchQuery.value);
    searchQuery.value = '';
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

