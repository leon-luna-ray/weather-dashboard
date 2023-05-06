import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useWeatherStore } from './weather';
import _ from 'lodash';

export const useSearchStore = defineStore('search', () => {
  // State
  const weatherStore = useWeatherStore();
  const currentCity = ref('portland');

  // Methods
  const debounceSearch = _.debounce((query) => {
    weatherStore.fetchData(query);
  }, 200);

  return {
    currentCity,
    debounceSearch,
  };
});
