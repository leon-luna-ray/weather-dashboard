<template>
    <div v-if="user.searchHistory.length > 1" class="search-history">
        <ul class="search-list flex flex-col gap-[1rem]">
            <li v-for="item in user.searchHistory" class="flex justify-center items-center">
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
// import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather'
// import { useSearchStore } from '@/stores/search'
import { useUiStore } from '@/stores/ui';
import { useUserStore } from '@/stores/user';

// State
// const searchStore = useSearchStore();
const ui = useUiStore();
const user = useUserStore();
const weather = useWeatherStore();

// const { searchHistory } = storeToRefs(searchStore);

const handleClick = (item) => {
    weather.fetchData(item.name, item.id);
    ui.isMenuOpen = false;
};
</script>
