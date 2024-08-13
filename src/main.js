//import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "@/index.css";
import PrimeVue from "primevue/config";

import "primevue/resources/themes/aura-light-green/theme.css";

const app = createApp(App);

app.use(createPinia()).use(PrimeVue, {}).use(router).mount("#app");
