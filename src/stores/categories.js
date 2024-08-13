import { defineStore } from "pinia";

export const useCategoryStore = defineStore("categoryStore", {
  state: () => {
    return {
      isLoading: false,
      error: null,
      categoriess: [],
      categoryy: null,
      icons: {
        Montagnes: "fas fa-mountain",
        Tropical: "fa-solid fa-island-tropical",
        "Tiny houses": "fas fa-home",
        Luxe: "fas fa-gem",
        Iconiques: "fas fa-star",
        Arctique: "fas fa-snowflake",
        Châteaux: "fa-brands fa-fort-awesome",
        Maison: "fas fa-home",
        Vignobles: "fas fa-wine-glass-alt",
        Plages: "fa-solid fa-umbrella-beach",
        Patrimoine: "fas fa-landmark",
        Hotel: "fas fa-hotel",
        Appartement: "lnr lnr-apartment",
        Fermes: "fas fa-horse",
        Piscines: "fas fa-swimming-pool",
        "Bord de mer": "fas fa-beach-pool",
        Cabane: "@/assets/cabin.png", // Custom path to cabin image
        Cabanes: "fas fa-users",
        Chambres: "fas fa-bed",
        Lacs: "fas fa-water",
        Design: "fas fa-palette",
        "Wow!": "fas fa-fireworks",
        Déserts: "fas fa-desert",
        Historique: "fas fa-scroll",
        Îles: "fas fa-island-tropical",
        Campagne: "fas fa-tree",
        Tendance: "fas fa-chart-line",
        Camping: "fas fa-campground",
        Ski: "fas fa-skiing",
      },
    };
  },

  getters: {
    category: (state) => state.categoryy,
    categories: (state) => state.categoriess,
  },
  actions: {
    async fetchCategories() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch(
          ` http://127.0.0.1:5000/api/v1/categories`
        );
        this.categoriess = await response.json();
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchCatgory(id) {
      try {
        const rep = await fetch(
          `http://127.0.0.1:5000/api/v1/categories/${id}`
        );
        this.categoryy = await rep.json();
      } catch (error) {
        console.log(error);
      }
    },
  },
});
