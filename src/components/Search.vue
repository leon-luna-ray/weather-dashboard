<script setup>
import { ref } from 'vue';
import { useSearchStore } from '../stores/search';

const searchQuery = ref('');
const searchStore = useSearchStore();

const handleSubmit = () => {
    searchStore.debounceSearch(searchQuery.value);
    searchQuery.value = '';
}
</script>

<template>
    <div id="sidebar">
        <form class="search" @submit.prevent="handleSubmit">
            <div class="search-input">
                <input type="text" v-model="searchQuery">
                <button type="submit" class="search-button">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </form>
    </div>
</template>