<template>
    <div class="h-full">
        <div class="container text-center flex flex-col gap-[2rem]">
            <h1 class="display-2">Search</h1>
            <Search />
            <SearchHistory />
        </div>
    </div>
</template>

<script setup>
import Search from './Search.vue';
import SearchHistory from './SearchHistory.vue';
</script>
