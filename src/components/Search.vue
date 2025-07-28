<template>
    <div id="sidebar">
        <form class="search" @submit.prevent="handleSubmit">
            <div class="search-input flex items-center gap-2 justify-center">
                <input type="text"
                    class="border-white border-[2px] rounded-lg h-[48px] w-full max-w-[540px] text-[2rem] pl-2"
                    v-model="searchQuery">
                <button type="submit"
                    class="border-white border-[2px] rounded-lg h-[48px] w-[48px] flex items-center justify-center">
                    <IconSearch class="h-[24px] w-[24px]" />
                </button>
            </div>
        </form>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useSearchStore } from '@/stores/search';

import IconSearch from '@/components/icons/IconSearch.vue';

const searchQuery = ref('');
const searchStore = useSearchStore();

const handleSubmit = () => {
    searchStore.debounceSearch(searchQuery.value);
    searchQuery.value = '';
}
</script>
