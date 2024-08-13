import { defineStore } from "pinia";

export const usePlaceStore = defineStore("placeStore", {
  state: () => {
    return {
      isLoading: false,
      error: null,
      place: {},
    };
  },
  getter: {
    place: (state) => state.place,
  },
  actions: {
    async fetchPlace(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch(
          ` http://127.0.0.1:5000/api/v1/places/${id}`
        );
        this.place = await response.json();
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
