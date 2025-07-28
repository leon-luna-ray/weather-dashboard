<template>
    <div v-if="searchHistory.length > 1" class="search-history">
        <ul class="search-list flex flex-col gap-[1rem]">
            <li v-for="item in searchHistory" class="flex justify-center items-center">
                <button @click.prevent="handleClick(item)" :key="item.id" class="list-item">
                    <p class="display-3 hover:scale-105 transition-all duration-200 ease-in-out">
                        {{ item.name }}
                    </p>
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather'
import { useSearchStore } from '@/stores/search'
import { useUiStore } from '@/stores/ui';

// State
const weatherStore = useWeatherStore();
const searchStore = useSearchStore();
const uiStore = useUiStore();

const { searchHistory } = storeToRefs(searchStore);

const handleClick = (item) => {
    weatherStore.fetchData(item.name, item.id);
    uiStore.isMenuOpen = false;
};
</script>
