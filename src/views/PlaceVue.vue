<template>
  <header class="border-b mb-10">
    <HotNavBar
      :links="links"
      :toggle="toggle"
      :isOpen="isOpen"
      @toggle="showSearchBar()"
    />
    <!-- Categories -->
    <transition-group name="category-slide" tag="div">
      <template v-if="isOpen">
        <SearcheNAV
          :show="show"
          :voyageur="voyageur"
          :selected="selected"
          :countries="countries"
        />
      </template>
    </transition-group>
  </header>
  <section class="px-52 m-auto" @click="updateStorage()">
    <div class="">
      <div class="my-4 text-3xl">
        <h1>{{ place.name }}</h1>
      </div>

      <div class="flex rounded-lg">
        <div class="w-1/2 h-full">
          <img
            class="hover:opacity-75 rounded-lg"
            :src="place.images ? place.images[0] : ''"
          />
        </div>
        <div
          class="grid grid-cols-2 md:grid-cols-2 gap-3 px-2 md:max-w-7/12 place-items-center w-1/2 rounded-lg"
        >
          <img
            class="hover:opacity-75"
            :src="place.images ? place.images[0] : ''"
          />
          <img
            class="hover:opacity-75"
            :src="place.images ? place.images[0] : ''"
          />
          <img
            class="hover:opacity-75"
            :src="place.images ? place.images[0] : ''"
          />
          <img
            class="hover:opacity-75"
            :src="place.images ? place.images[0] : ''"
          />
        </div>
      </div>
      <div class="p-5">
        <a href="#">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ place.name }}
          </h5>
        </a>

        <p class="mb-3 text-gray-700 dark:text-gray-400 font-bold">
          {{ place.price_by_night }} $ <span>par nuit</span>
        </p>
      </div>
    </div>

    <!-- component -->

    <div
      class="mb-10 py-5 md:px-6 flex justify-between items-center w-full relative"
    >
      <!--- --->
      <div class="w-1/2">
        <div class="max-w-2xl mx-auto">
          <h1 class="text-2xl font-bold mb-1">
            {{ place.name }} - {{ place.address }}
          </h1>
          <p class="text-sm mb-2">
            6 voyageurs · 2 chambres · 4 lits · 2 salles de bain
          </p>
          <div class="flex items-center mb-4">
            <span class="text-sm font-bold mr-2">★ 4,89</span>
            <a href="#" class="text-sm underline">18 commentaires</a>
          </div>

          <hr class="my-4" />

          <div class="flex items-center mb-4">
            <img
              :ssrc="place.images ? place.images[0] : ''"
              class="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p class="font-bold">Hôte : Carolina</p>
              <p class="text-sm text-gray-600">Hôte depuis 5 ans</p>
            </div>
          </div>

          <hr class="my-4" />

          <div class="space-y-4">
            <div class="flex items-start">
              <svg
                class="w-6 h-6 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <div>
                <h3 class="font-bold">Arrivée autonome</h3>
                <p class="text-sm">
                  Vous pouvez accéder au logement en faisant appel au personnel
                  de l'immeuble.
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <svg
                class="w-6 h-6 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                ></path>
              </svg>
              <div>
                <h3 class="font-bold">Stationnez gratuitement</h3>
                <p class="text-sm">
                  Il s'agit de l'un des rares endroits des environs qui dispose
                  d'un parking gratuit.
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <svg
                class="w-6 h-6 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <div>
                <h3 class="font-bold">
                  Annulation gratuite avant le 13 juil. à 15:00
                </h3>
                <p class="text-sm">
                  Obtenez un remboursement intégral si vous changez d'avis.
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6 bg-gray-100 p-4 rounded-lg">
            <p class="text-sm text-gray-600 mb-2">
              Certaines informations ont été traduites automatiquement.
            </p>
            <a href="#" class="text-sm font-bold underline"
              >Afficher le texte d'origine</a
            >
          </div>

          <div class="mt-6">
            <p class="mb-4">
              Si vous cherchez un répit du bruit de la ville et vous connecter
              avec la nature, c'est l'endroit pour vous.
            </p>
            <p class="mb-4">
              À 14 km de Cayambe, Hacienda La Arcadia se situe sur une colline
              isolée à 3 400 mètres de haut, entourée de pins et d'eucalyptus et
              offre une vue magnifique sur la neige.
            </p>
            <p class="text-sm">...</p>
            <a href="#" class="text-sm font-bold">En savoir plus ›</a>
          </div>
        </div>
        <div class="max-w-2xl mx-auto">
          <h2 class="text-xl font-bold mb-4">Ce que propose ce logement</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center">
              <svg
                class="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                ></path>
              </svg>
              <span>Vue sur le jardin</span>
            </div>

            <div class="flex items-center">
              <svg
                class="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span>Vue sur le complexe hôtelier</span>
            </div>

            <div class="flex items-center">
              <svg
                class="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              <span>Accès plage ou bord de mer</span>
            </div>

            <div class="flex items-center">
              <svg
                class="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                ></path>
              </svg>
              <span>Cuisine</span>
            </div>

            <div class="flex items-center">
              <svg
                class="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                ></path>
              </svg>
              <span>Vitesse du réseau wifi : 28 Mbps</span>
            </div>

            <div class="flex items-center">
              <svg
                class="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
              <span>Espace de travail dédié</span>
            </div>

            <div class="flex items-center">
              <svg
                class="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                ></path>
              </svg>
              <span>Parking gratuit sur place</span>
            </div>

            <div class="flex items-center">
              <svg
                class="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span
                >Piscine extérieure commune : disponible toute l'année,
                ouverture 24h/24</span
              >
            </div>

            <div class="flex items-center text-gray-400 line-through">
              <svg
                class="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                ></path>
              </svg>
              <span>Détecteur de monoxyde de carbone</span>
            </div>

            <div class="flex items-center text-gray-400 line-through">
              <svg
                class="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                ></path>
              </svg>
              <span>Détecteur de fumée</span>
            </div>
          </div>

          <button
            class="mt-6 px-4 py-2 border border-gray-900 rounded-lg text-gray-900 font-semibold hover:bg-gray-100"
          >
            Afficher les 37 équipements
          </button>
        </div>
      </div>

      <!--  -->
      <div
        class="border flex flex-col xl:flex-row justify-center items-stretch lg:w-1/3 xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0 ml-5 rounded-lg absolute top-0 right-0"
      >
        <div
          class="dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col"
        >
          <h3
            class="text-xl dark:text-white font-semibold leading-5 text-gray-800 my-2"
          >
            {{ place.price_by_night * 10 }} MAD par nuit
          </h3>
          <div>
            <span>Arrivé</span>
            <br />
            <span>Depart</span>
          </div>

          <button
            class="w-full md:mt-0 dark:border-white bg-black text-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium 2xl:w-full text-base leading-4 text-gray-800 rounded-lg"
            @click="isConnected"
          >
            Reserver
          </button>

          <p>Aucun montant ne vous sera débité pour le moment</p>
          <hr />
          <div>Total hors taxes{{}}</div>
        </div>
      </div>
    </div>
  </section>

  <!--  -->

  <template v-if="component == 'Connection'">
    <Loggin
      @close="isConnected"
      @show="component = 'Register'"
      :component="component"
    />
  </template>

  <!-- register -->
  <template v-if="component == 'Register'">
    <Register @close="component = ''" @show="component = 'Connection'" />
  </template>
  <Footer :class="{ hidden: component }" />
</template>
<script setup>
import HotNavBar from "../components/HotNavBar.vue";
import NavBar from "../components/Navbar.vue";

import Footer from "../components/Footer.vue";
import Loggin from "../components/Loggin.vue";
import Register from "../components/Register.vue";
import SearcheNAV from "../components/ChercheNav.vue";

import { useRouter, useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
import { userStore } from "../stores/auth";

const authStore = userStore();
const route = useRoute();
const router = useRouter();
const place = ref({});
const isOpen = ref(true);
const category = ref({});
const component = ref("");

const links = [
  {
    name: "Mettre mon logement",
    path: "/host/annonce",
  },
];
let toggle = ref(false);

const showSearchBar = () => {
  isOpen.value = !isOpen.value;
};

const fetchPalce = async () => {
  const id = route.fullPath.split("/")[2];
  const resp = await fetch(`http://127.0.0.1:5000/api/v1/places/${id}`);
  const place = await resp.json();
  return place;
};

const fetchCategory = async (place) => {
  const resp = await fetch(
    `http://127.0.0.1:5000/api/v1/categories/${place.category_id}`
  );
  const category = await resp.json();
  return category;
};

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const isConnected = () => {
  if (!authStore.user) {
    component.value = "Connection";
    topFunction();
  } else {
    router.push("/book/".concat(place.value.id));
  }
};

watch(component, (val) => {
  if (val == "Connection" || val == "Register") {
    localStorage.setItem("isOpen", true);
  } else {
    localStorage.removeItem("isOpen");
  }
});

const updateStorage = () => {
  localStorage.removeItem("searchBarPrams");
};
onMounted(async () => {
  place.value = await fetchPalce();
  category.value = await fetchCategory(place.value);
});
</script>
