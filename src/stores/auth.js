import { defineStore } from "pinia";

const LOCAL_STORAGE_KEY = "user";

export const userStore = defineStore("userStore", {
  state: () => ({
    userData: sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : false,
    errorMessage: "",
  }),
  getters: {
    user: (state) => state.userData,
  },
  actions: {
    async signIn(email, password) {
      const response = await fetch(`http://127.0.0.1:5000/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();
      if (response.ok) {
        sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        this.userData = JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_KEY));
      } else {
        this.errorMessage = data.error;
        this.userData = false;
      }
      return this.userData;
    },

    logout() {
      sessionStorage.removeItem("user");
      this.userData = false;
      this.router.push("/");
    },
  },
});
