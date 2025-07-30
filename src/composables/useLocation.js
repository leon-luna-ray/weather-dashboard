import { nextTick, onBeforeMount, onMounted, watch } from 'vue';
import { useGeolocation } from '@vueuse/core';
import { useWeatherStore } from '@/stores/weather';
import { useSearchStore } from '@/stores/search';

export const useLocation = () => {
    const { coords, locatedAt, error, resume, pause } = useGeolocation({
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
    });

    const getCurrentLocation = async () => {
        resume();
    };
    const getUserSavedData = () => {
        const savedData = localStorage.getItem('wd-rldev-prev');
        if(!savedData) return null;
        return JSON.parse(savedData);
    };

    watch(coords, async (newCoords) => {
        if (newCoords) {
            // If new coordinates are available, you can handle them here
            console.log('New coordinates:', newCoords);
            // You can also fetch weather data based on these coordinates
            // await fetchWeatherData(newCoords.latitude, newCoords.longitude);
        }
    });
    // onMounted(async () => {
    //     resume(); // Start geolocation tracking

    // });

    onBeforeMount(() => {
        console.log('Component is about to mount, resuming geolocation');
        // pause();
    });

    return { getCurrentLocation };
};