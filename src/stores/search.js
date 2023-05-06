import { ref, watch, onBeforeMount } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useWeatherStore } from './weather';
import _ from 'lodash';

export const useSearchStore = defineStore('search', () => {
  // State
  const weatherStore = useWeatherStore();
  const { cityName } = storeToRefs(weatherStore);
  const cities = ref([]);

  // Methods
  const debounceSearch = _.debounce((query) => {
    weatherStore.fetchData(query);
  }, 200);

  const updateLocalStorage = (cities) => {
    localStorage.setItem('wd-rldev-prev', JSON.stringify(cities));
  };
  const setCities = (arr) => {
    const uniqueArray = [...new Set(arr)].reverse();
    cities.value = uniqueArray;
  };

  // Watchers
  watch(cityName, () => {
    const city = cityName.value.toLowerCase();
    cities.value.unshift(city)
    // Limit saved items to 10 (for now)
    cities.value = cities.value.slice(0,10);
    updateLocalStorage(cities.value);
  });

  return {
    cities,
    debounceSearch,
    setCities,
  };
});
