import { defineStore } from "pinia";

export const useOwnerStore = defineStore("ownerStore", {
  state: () => {
    return {
      isLoading: false,
      error: null,
      user: sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user"))
        : {},
      possession: [],
    };
  },
  getters: {
    places: (state) => state.possession,
  },
  actions: {
    // async fetchOwner(id) {
    //   this.isLoading = true;
    //   this.error = null;
    //   try {
    //     const response = await fetch(
    //       ` http://127.0.0.1:5000/api/v1/users/${id}`
    //     );
    //     this.user = await response.json();
    //   } catch (error) {
    //     this.error = error;
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },
    async fetchUserPlaces(id) {
      try {
        const response = await fetch(
          ` http://127.0.0.1:5000/api/v1/users/${id}/places`
        );
        this.possession = await response.json();
      } catch (error) {
        this.error = error;
        console.log(error);
      }
    },
  },
});
