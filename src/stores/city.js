import { defineStore } from "pinia";

const LOCAL_STORAGE_KEY = "city";

export const cityStore = defineStore("cityStore", {
  state: () => ({
    city: false,
    errorMessage: "",
  }),
  getters: {
    city: (state) => state.city,
  },
  actions: {
    async fetchCities(countries, country_id) {
      const country = countries.value.find(
        (element) => element.id == country_id
      );
      const response = await fetch(
        ` http://127.0.0.1:5000/api/v1/country/${country.id}/cities`
      );
      this.cities = await response.json();
    },
  },
});
