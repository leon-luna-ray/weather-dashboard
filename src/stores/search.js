import { ref, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useWeatherStore } from './weather';
import _ from 'lodash';

export const useSearchStore = defineStore('search', () => {
  // State
  const weatherStore = useWeatherStore();
  const { currentCityName, currentCityId } = storeToRefs(weatherStore);
  const searchHistory = ref([]);

  // Methods
  const debounceSearch = _.debounce((query) => {
    weatherStore.fetchData(query);
  }, 200);
  const updateLocalStorage = (cities) => {
    localStorage.setItem('wd-rldev-prev', JSON.stringify(cities));
  };
  const setSearchHistory = (arr) => {
    const uniqueCities = [];
    const idSet = new Set();
    // Check for duplicates
    for (const city of arr) {
      if (!idSet.has(city.id)) {
        uniqueCities.push(city);
        idSet.add(city.id);
      }
    }
    searchHistory.value = uniqueCities.slice(0, 20);
  };

  // Watchers
  watch(currentCityId, () => {
    const city = {
      id: currentCityId.value,
      name: currentCityName.value,
    };
    if (searchHistory.value.length) {
      setSearchHistory([city, ...searchHistory.value]);
    } else {
      setSearchHistory([city]);
    }
    updateLocalStorage(searchHistory.value);
  });

  return {
    searchHistory,
    debounceSearch,
    setSearchHistory,
  };
});