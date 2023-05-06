import { ref, watch } from 'vue';
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

  // Watchers
  watch(cityName, () => {
    const city = cityName.value.toLowerCase();
    cities.value.push(city);
    updateLocalStorage(cities.value);
  });

  return {
    cities,
    debounceSearch,
  };
});
