import { watch } from 'vue';
import { defineStore } from 'pinia';
import { useGeolocation, useStorage } from '@vueuse/core';

export const useUserStore = defineStore('user', () => {
    // const { coords, locatedAt, error, resume, pause } = useGeolocation({
    //     enableHighAccuracy: true,
    //     maximumAge: 0,
    //     timeout: 10000,
    // });

    // Reactive localStorage state
    const userGeoCoords = useStorage('cloud9-location', { lat: null, lon: null });
    const searchHistory = useStorage('cloud9-history', []);
    const measurementUnits = useStorage('cloud9-unit', 'metric');

    // Methods
    const setUserGeoCoords = (lat, lon) => {
        userGeoCoords.value = { lat, lon };
    };

    const addToSearchHistory = (id, name) => {
        const filteredHistory = searchHistory.value.filter(item =>
            item.id !== id
        );
        searchHistory.value = [{ id, name }, ...filteredHistory].slice(0, 10);
    };

    const clearSearchHistory = () => {
        searchHistory.value = [];
    };

    const setMeasurementUnit = (isMetric) => {
        measurementUnits.value = isMetric ? 'metric' : 'imperial';
    };

    // const getUserSavedData = () => {
    //     const localStorageData = localStorage.getItem('wd-rldev-prev');
    //     if (!localStorageData) return null;

    //     const data = JSON.parse(localStorageData);
    //     return data;
    // };

    // Watchers
    // watch(coords, (newCoords) => {
    //     if (!newCoords) return;
    //     setUserGeoCoords(newCoords.latitude, newCoords.longitude);
    // });

    return {
        userGeoCoords,
        searchHistory,
        measurementUnits,
        setUserGeoCoords,
        addToSearchHistory,
        clearSearchHistory,
        setMeasurementUnit,
    };
});