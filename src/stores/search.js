import { ref, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useWeatherStore } from './weather';
import _ from 'lodash';

export const useSearchStore = defineStore('search', () => {
  // State
  const weatherStore = useWeatherStore();
  const { cityName } = storeToRefs(weatherStore);
  const currentCity = ref(null);

  // Methods
  const debounceSearch = _.debounce((query) => {
    weatherStore.fetchData(query);
  }, 200);

  const setLocalStorage = (city) => {
    localStorage.setItem('wd-rldev-prev', city)
  };

  watch(cityName, () => {
    const city = cityName.value.toLowerCase();
    setLocalStorage(city);
  });

  return {
    currentCity,
    debounceSearch,
  };
});
