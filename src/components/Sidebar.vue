<script setup>
import Search from './Search.vue';
import SearchHistory from './SearchHistory.vue';
</script>

<template>
    <div id="sidebar">
        <div id="logo">
            <i class="fa-solid fa-cloud"></i>
            <h1 id="site-title">Cloud9</h1>
        </div>
        <Search/>
        <SearchHistory />
    </div>
</template>