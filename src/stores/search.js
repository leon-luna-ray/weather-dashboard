import { ref, watch, onBeforeMount } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useWeatherStore } from './weather';
import _ from 'lodash';

export const useSearchStore = defineStore('search', () => {
  // State
  const weatherStore = useWeatherStore();
  const { currentCityName, currentCityId } = storeToRefs(weatherStore);
  const cities = ref([]);

  // Methods
  const debounceSearch = _.debounce((query) => {
    weatherStore.fetchData(query);
  }, 200);

  const updateLocalStorage = (cities) => {
    localStorage.setItem('wd-rldev-prev', JSON.stringify(cities));
  };
  const setCities = (arr) => {
    const uniqueCities = [];
    const idSet = new Set();

    for (const city of arr) {
      if (!idSet.has(city.id)) {
        uniqueCities.push(city);
        idSet.add(city.id);
      }
    }

    cities.value = uniqueCities.slice(0, 10);
  };
  // Watchers
  watch(currentCityId, () => {
    const city = {
      id: currentCityId.value,
      name: currentCityName.value,
    };
    if (cities.value.length) {
      setCities([city, ...cities.value]);
    } else {
      setCities([city]);
    }
    // cities.value.unshift(city);
    // Limit saved items to 10 (for now)
    // cities.value = cities.value.slice(0, 10);
    updateLocalStorage(cities.value);
  });

  return {
    cities,
    debounceSearch,
    setCities,
  };
});
