import { defineStore } from "pinia";

export const useAmenityStore = defineStore("amenityStore", {
  state: () => {
    return {
      isLoading: false,
      error: null,
      amenitiess: [],
    };
  },
  getters: {
    amenities: (state) => state.amenitiess,
  },
  actions: {
    async fetchAminities() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/v1/amenities`);
        this.amenitiess = await response.json();
        return amenities;
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
