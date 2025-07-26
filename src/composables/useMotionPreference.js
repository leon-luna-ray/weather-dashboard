import { watch, onMounted, computed } from 'vue';
import { usePreferredReducedMotion } from '@vueuse/core'

export const useMotionPreference = () => {
    const preferredMotion = usePreferredReducedMotion();

    const reduceMotion = computed(() => preferredMotion.value === 'reduce');

    const setReduceMotion = () => {
        if (reduceMotion.value) {
            document.body.classList.add('reduce-motion');
        } else {
            document.body.classList.remove('reduce-motion');
        }
    };

    watch(reduceMotion, () => {
        setReduceMotion();
    });

    onMounted(() => {
        setReduceMotion();
    });

    return {
        reduceMotion,
    };
};
