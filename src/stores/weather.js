import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", () => {
    const useMetricUnits = ref(false);

    return {
        useMetricUnits,
    }
})