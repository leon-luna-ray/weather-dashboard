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
import { useWeatherStore } from '@/stores/weather';
import { useUiStore } from '@/stores/ui';
import { useUserStore } from '@/stores/user';

// State
const ui = useUiStore();
const user = useUserStore();
const weather = useWeatherStore();

const handleClick = (item) => {
    weather.fetchData(item.id, item.name);
    ui.isMenuOpen = false;
};
</script>
