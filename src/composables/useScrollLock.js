import { computed, watch } from 'vue';

export const useScrollLock = () => {
    const isScrollLocked  = false;

    const preventScroll = (value) => {
        if (value) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    };

    watch(isScrollLocked, (value) => {
        preventScroll(value);
    }, { immediate: true });

    return {
        isScrollLocked,
    };
};