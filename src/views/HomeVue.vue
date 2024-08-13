<template>
  <header class="h-1/3 border-b pb-5 px-5">
    <NavBar
      :links="links"
      :toggle="toggle"
      @open="openComp"
      @toggle="toggle = !toggle"
    />

    <SearcheNAV
      :countries="countries"
      @search="placeSearch"
      :categories="categoryStore.categories"
    />
  </header>
  <!-- places -->
  <section class="min-h-1/3 border-black mb-40 h-screen">
    <div class="flex flex-row items-center mb-10 justify-evenly">
      <nav class="flex flex-row items-center relative w-5/6 h-20">
        <!-- Left chevron icon -->
        <div
          class="lg:basis-[20px] hidden lg:contents md:contents"
          @click="decrementCategories()"
        >
          <span
            class="lnr lnr-chevron-left cursor-pointer hover:border-gray-200 border h-8 w-8 font-bold flex justify-center items-center rounded-full"
          ></span>
        </div>

        <!-- Categories -->
        <transition-group
          name="category-slide"
          tag="div"
          class="flex flex-grow basis-1/2 overflow-x-hidden"
        >
          <div
            v-for="(category, index) in categoryStore.categories.slice(
              start,
              end
            )"
            :key="category.id"
            class="hover:text-black text-gray-500 cursor-pointer flex flex-col justify-center items-center mx-3"
            :class="{
              'border-b-2 border-black ': category == selectedCategory,
            }"
            @click="setCategory(category)"
          >
            <i :class="icons[category.name]"></i>
            <div class="text-sm text-center my-2 w-24">{{ category.name }}</div>
          </div>
        </transition-group>

        <!-- Right chevron icon -->
        <div
          class="basis-[10px] hidden lg:contents md:flex"
          @click="incrementCategories()"
        >
          <span
            class="lnr lnr-chevron-right cursor-pointer hover:border-gray-200 border h-8 w-8 font-bold flex justify-center items-center rounded-full"
          ></span>
        </div>
      </nav>
      <div class="basis-14 hidden lg:contents md:contents">
        <div
          class="border px-3 py-3 flex justify-center items-center rounded-full cursor-pointer hover:border-black"
          @click="showFilter = !showFilter"
        >
          <i class="fa-solid fa-filter"></i><span>Filters</span>
        </div>
      </div>
    </div>
    <template v-if="places">
      <div class="container px-5 py-5 w-full h-96">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-10">
          <div
            class="bg-white rounded-lg overflow-hidden shadow-md"
            v-for="place in places"
            :key="place.id"
          >
            <RouterLink :to="'/place/'.concat(place.id)">
              <img
                :src="place.images ? place.images[0] : ''"
                alt="Location"
                class="w-full h-48 object-cover"
              />
            </RouterLink>
            <div class="p-4">
              <span class="bg-gray-200 text-sm rounded-full px-3 py-1"
                >Coup de coeur voyageurs</span
              >
              <div class="flex items-center mt-1 justify-between">
                <h3 class="font-bold mt-2">{{ place.name }}</h3>
                <svg
                  class="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <span class="ml-1">4,91</span>
              </div>
              <p class="text-sm text-gray-600 mt-1">À 283 kilomètres</p>
              <p class="text-sm mt-1">1-6 sept.</p>
              <p class="font-bold mt-1">
                MAD {{ place.price_by_night }} par nuit
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="!places">
      <div class="flex justify-center">
        <h1>Désolé, l'hébergement que vous recherchez n'est pas disponible.</h1>
      </div>
    </template>
  </section>

  <!-- Filter -->
  <template v-if="showFilter">
    <Filter
      @close="showFilter = false"
      :categories="categoryStore.categories"
      :icons="icons"
      @search="placeSearch"
    />
  </template>

  <!-- login Comp -->
  <template v-if="component == 'Connection'">
    <Loggin
      @close="redirect"
      @show="component = 'Register'"
      :component="component"
    />
  </template>

  <!-- register -->
  <template v-if="component == 'Register'">
    <Register @close="component = ''" @show="component = 'Connection'" />
  </template>
  <!-- Footer -->
  <Footer />
</template>
<script setup>
import NavBar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import SearcheNAV from "../components/ChercheNav.vue";
import Loggin from "../components/Loggin.vue";
import Register from "../components/Register.vue";

import Filter from "../components/FilterVue.vue";
import { ref, watch, onMounted } from "vue";
import { useCategoryStore } from "../stores/categories";
import { useCountryStore } from "../stores/country";
import { userStore } from "../stores/auth";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
let start = ref(0);
let end = ref(12);
const categoriesNames = ref([]);
const authStore = userStore();
const categoryStore = useCategoryStore();
const countryStore = useCountryStore();

const { fetchCategories, icons } = categoryStore;
const component = ref("");
const { fetchCountries } = countryStore;
const countries = ref([]);
const showFilter = ref(false);
const categories = ref([]);
let selectedCategory = ref({});
let places = ref([]);
let toggle = ref(false);
const links = [
  {
    name: "Logement",
    path: "/",
  },
  {
    name: "Mettre mon logement",
    path: "/host/annonce",
  },
];

const incrementCategories = () => {
  start.value += 12;
  end.value += 12;
};

const decrementCategories = () => {
  if (start.value > 0) {
    start.value -= 12;
    end.value -= 12;
  }
};

const openComp = (link, path) => {
  component.value = "";
  if (!authStore.user) {
    component.value = link;
  } else {
    localStorage.setItem("link", path);
    router.push(path);
  }
};

const setCategory = (category) => {
  selectedCategory.value = category;
};

const redirect = () => {
  if (authStore.user) {
    router.push(localStorage.getItem("link"));
  } else {
    component.value = "";
  }
};

watch(selectedCategory, async (newCategory, oldCategory) => {
  if (newCategory) {
    const response = await fetch(
      `http://127.0.0.1:5000/api/v1/category/${newCategory.id}/places`
    );
    const data = await response.json();
    console.log(data.length);
    if (data.length > 0) {
      places.value = data;
    } else {
      places.value = null;
    }
  }
});

const placeSearch = async (selected) => {
  const searchParams = {};
  searchParams["amenities"] = selected.amenities ?? null;
  searchParams["category_id"] = selected.categeory ?? null;
  searchParams["type"] = selected.type ?? null;
  searchParams["number_rooms"] = selected.chambre ?? null;
  searchParams["departure"] = selected.departure ?? null;
  searchParams["arrival"] = selected.arrival ?? null;
  searchParams["country_id"] = selected.country ?? null;
  searchParams["price_by_night"] = selected.price ?? null;

  const resp = await fetch("http://127.0.0.1:5000/api/v1/places_search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchParams),
  });
  const data = await resp.json();
  if (data.length > 0) {
    places.value = data;
  } else {
    places.value = null;
  }
};

onMounted(async () => {
  countries.value = await fetchCountries();
  await fetchCategories();

  selectedCategory.value = categoryStore.categories[0];
  categories.value.forEach((element) => {
    categoriesNames.value.push(element.name);
  });
});
</script>
