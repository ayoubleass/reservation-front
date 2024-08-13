<template>
  <nav
    class="flex flex-col md:flex-row items-center justify-between py-2 md:h-20 text-gray-500 w-full z-10 px-10 lg:px-20"
  >
    <RouterLink to="/">
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

    <!-- Menu Comp  -->
    <div class="w-full flex items-center justify-end h-full gap-5">
      <div class="flex">
        <div
          v-if="!isOpen"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-black mr-2 cursor-pointer hover:opacity-25"
          @click="$emit('toggle')"
        >
          <i class="fa-solid fa-magnifying-glass text-white"></i>
        </div>
        <ul class="flex items-center justify-center md:mr-2">
          <li
            class="hover:text-gray-300 mx-2"
            v-for="link in links"
            :key="link.name"
          >
            <RouterLink :to="link.path"
              ><span :class="{ 'font-bold': $route.path == link.path }">{{
                link.name
              }}</span></RouterLink
            >
          </li>
        </ul>
      </div>

      <div
        class="rounded-full bg-gray-100 flex items-center justify-center cursor-pointer relative z-50 w-10 h-10"
      >
        <i class="fa-solid fa-user"></i>
        <div
          :class="{ hidden: !toggle, 'absolute top-10 right-0': toggle }"
          v-if="toggle"
        >
          <Menu :model="userData ? authItems : items" class="bg-gray-50" />
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup props="props">
import Menu from "primevue/menu";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "../stores/auth";

const userData = userStore().userData;

const router = useRouter();
let props = defineProps(["links", "toggle", "isOpen"]);
const items = ref([
  {
    label: "Inscription",
    icon: "pi pi-user",
    command: () => router.push("/signup"),
  },
  {
    label: "Connection",
    icon: "pi pi-sign-out",
    command: () => router.push("/login"),
  },
  {
    label: "Aide",
    icon: "pi pi-sign-out",
  },
]);
const authItems = ref([
  {
    label: "logout",
    command: () => sessionStorage.removeItem("user"),
  },
]);
</script>
