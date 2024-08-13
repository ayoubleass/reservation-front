import { createRouter, createWebHistory } from "vue-router";

const routes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeVue.vue"),
    },
    {
      path: "/place/:id",
      name: "place",
      component: () => import("../views/PlaceVue.vue"),
    },
    {
      path: "/host/annonce",
      name: "annoce",
      component: () => import("../views/SéjourVue.vue"),
    },
    {
      path: "/host/messages",
      name: "messages",
      component: () => import("../views/Messages.vue"),
    },
    {
      path: "/book/:id",
      name: "book",
      component: () => import("../views/Confirmation.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminDash.vue"),
    },
  ],
});

export default routes;
