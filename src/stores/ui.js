import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useUiStore = defineStore('ui', () => {
    const isMenuOpen = ref(false);
    const isTransitioning = ref(false);

    watch(isTransitioning, async (newValue) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        isTransitioning.value = false;
    });

    return {
        isMenuOpen,
        isTransitioning,
    };
});