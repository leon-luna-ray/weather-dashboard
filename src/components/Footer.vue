<template>
    <footer class="py-[4rem]">
        <div class="container mx-auto text-center">
            <p class="text-sm">&copy; {{ year }} <a href="https://www.rayluna.dev" target="_blank" class="underline underline-offset-4">rayluna.dev</a></p>
        </div>
    </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>