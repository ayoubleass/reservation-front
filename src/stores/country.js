import { defineStore } from "pinia";

export const useCountryStore = defineStore("countryStore", {
  state: () => {
    return {
      isLoading: false,
      error: null,
      icons: {
        Appartement: "lnr lnr-apartment",
        Hotel: "fa-solid fa-hotel",
        Maison: "fa-solid fa-house",
        Cabane: "@/assets/cabin.pnj",
      },
    };
  },
  actions: {
    async fetchCountries() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch(` http://127.0.0.1:5000/api/v1/countries`);
        const countries = await response.json();
        return countries;
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
