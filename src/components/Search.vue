<template>
    <div id="sidebar">
        <form class="search" @submit.prevent="handleSubmit">
            <div class="search-input flex items-center gap-2 justify-center">
                <input type="text"
                    class="border-white border-[2px] rounded-lg h-[48px] w-full max-w-[540px] text-[2rem] pl-2"
                    v-model="searchQuery">
                <LocationBtn>
                    <IconLocation class="h-[24px] w-[24px]" aria-hidden="true" />
                </LocationBtn>
                <button type="submit"
                    class="border-white border-[2px] rounded-lg h-[48px] w-[48px] flex items-center justify-center">
                    <IconSearch class="h-[24px] w-[24px]" />
                </button>
            </div>
        </form>
    </div>
</template>
<script setup>
import _ from 'lodash';
import { ref } from 'vue';
import { useWeatherStore } from '@/stores/weather';

import IconSearch from '@/components/icons/IconSearch.vue';
import IconLocation from '@/components/icons/IconLocation.vue';
import LocationBtn from '@/components/LocationBtn.vue';

const weather = useWeatherStore();

const searchQuery = ref('');

const debounceSearch = _.debounce((query) => {
    weather.fetchData(null, query);
}, 200);

const handleSubmit = () => {
    debounceSearch(searchQuery.value);
    searchQuery.value = '';
}
</script>
