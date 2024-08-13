<template>
  <nav
    class="flex items-center h-10 lg:px-20 lg:py-10 px-10 py-10 justify-between text-black"
  >
    <RouterLink to="/" class="md:mb-0">
      <div class="flex items-center space-x-2">
        <svg
          class="w-6 h-6 md:w-8 md:h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          ></path>
        </svg>
        <span class="text-2xl md:text-3xl font-extrabold text-blue-600"
          >Book</span
        >
        <span class="text-2xl md:text-3xl font-extrabold text-black">Ease</span>
      </div>
    </RouterLink>
    <ul
      class="flex items-center mx-5 my-5 cursor-pointer sm:hidden lg:flex md:hidden"
    >
      <li
        class="mx-3 hover:text-gray-300"
        v-for="link in links"
        :key="link.name"
      >
        <span
          @click="
            openComponent(
              link.name == 'Mettre mon logement' ? 'Connection' : '',
              link.path
            )
          "
          :class="{ 'font-bold': $route.path == link.path }"
          >{{ link.name }}</span
        >
      </li>
    </ul>
    <div
      class="rounded-full h-10 w-10 bg-gray-100 flex items-center justify-center cursor-pointer relative z-50"
      @click="$emit('toggle')"
    >
      <i class="fa-solid fa-user"></i>
      <div
        :class="{ hidden: !toggle, 'absolute  top-10 right-0': toggle }"
        v-if="toggle"
      >
        <Menu
          :model="authStore.user ? authItems : items"
          class="bg-white border rounded-lg text-black"
        />
      </div>
    </div>
  </nav>
</template>
<script setup props="props">
import Menu from "primevue/menu";
import { ref, watch } from "vue";
import { userStore } from "../stores/auth";

const authStore = userStore();
let props = defineProps(["links", "toggle"]);
const emit = defineEmits(["open"]);

const items = ref([
  {
    label: "Connection",
    icon: "pi pi-sign-out",
    command: () => openComponent("Connection"),
  },
  {
    label: "Aide",
    icon: "pi pi-sign-out",
  },
]);
const authItems = ref([
  {
    label: "logout",
    icon: "fa-solid fa-right-from-bracket",
    command: () => authStore.logout(),
  },
  {
    label: "notification",
    icon: "fa-solid fa-bell",
  },
]);

const openComponent = (link, path) => {
  emit("open", link, path);
};
</script>
