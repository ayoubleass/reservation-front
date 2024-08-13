<template>
  <NavBar
    :links="links"
    :toggle="isOpen"
    @toggle="isOpen = !isOpen"
    @open="openComp"
  />
  <div
    class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
    role="alert"
    v-if="message"
  >
    <span class="font-medium">Success alert!</span> {{ message }}
  </div>

  <section class="w-full relative min-h-[80vh] px-20 py-10">
    <div class="flex justify-between lg:px-10 sm:px-3 items-center my-5 px-20">
      <h1 class="text-xl font-bold text-center">Mon annonce</h1>
      <div
        v-if="!steps[0]"
        class="rounded-full h-10 w-10 bg-gray-100 flex items-center justify-center cursor-pointer hover:text-gray-300 border"
        @click="next(0)"
      >
        <i class="fa-solid fa-plus"></i>
      </div>
    </div>
    <template v-if="!steps[0] && !steps[1] && !steps[2]">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr class="w-10/12"></tr>
          <tr></tr>

          <tr></tr>
        </thead>
        <tbody
          class="bg-white divide-y divide-gray-200 relative w-full rounded-lg"
        >
          <tr
            v-for="place in user.places"
            :key="place.id"
            class="hover:bg-gray-100 cursor-pointer"
          >
            <td class="px-6 py-4 whitespace-nowrap w-11/12">
              <RouterLink :to="'/place/'.concat(place.id)">
                <img :src="place ? place.images[0] : ''" class="w-20 h-15" />
                <span class="text-sm text-gray-900">{{
                  getCategory(place.category_id)
                }}</span>
              </RouterLink>
            </td>

            <td
              class="px-6 py-4 whitespace-nowrap h-full m-auto"
              @click="preform('Modifier une annonce', place)"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap h-full m-auto"
              @click="openPopUp(place)"
            >
              <i class="fa-solid fa-trash"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-if="steps[0]">
      <section
        class="mx-auto py-10 min-h-full z-50 top-0 bg-opacity-25 px-20 h-"
      >
        <div
          class="flex flex-col items-center bg-white rounded-lg min-h-[550px] mb-20 relative w-1/2 py-3 m-auto"
        >
          <div class="text-center h-10 mb-10 flex items-center">
            <h1
              class="text-2xl font-semibold flex items-center"
              @click="back()"
            >
              <svg
                class="w-6 h-6 mr-2 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                @click=""
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </h1>
            <p class="text-xl">
              Parmi les propositions suivantes, laquelle décrit le mieux votre
              logement ?
            </p>
          </div>
          <div class="grid grid-cols-4 gap-4 mb-6 cursor-pointer">
            <div
              v-for="category in categoryStore.categories"
              class="border rounded-md p-4 flex flex-col items-center"
              @click="setCategory(category)"
            >
              <i
                :class="icons[category.name]"
                class="text-2xl text-gray-500 font-bold"
              ></i>
              <span>{{ category.name }}</span>
            </div>
          </div>
        </div>
      </section>
    </template>

    <template v-if="steps[1]">
      <section class="w-1/2 min-h-[60vh] m-auto py-5">
        <div class="text-center h-10 mb-10 flex items-center">
          <h1 class="text-2xl font-semibold flex items-center" @click="back">
            <svg
              class="w-6 h-6 mr-2 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              @click=""
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </h1>
          <p class="text-xl">
            Pour optimiser l'expérience de vos futurs invités, il est essentiel
            de sélectionner les commodités appropriées en fonction du type de
            logement que vous proposez. ?
          </p>
        </div>
        <div
          class="flex flex-col bg-white rounded-lg min-h-[550px] mb-20 relative border"
        >
          <div
            v-for="amenity in amenityStore.amenities"
            class="cursor-pointer hover:border-black flex items-center px-5 py-3"
          >
            <input
              type="checkbox"
              class="mr-3 cursor-pointer min-w-5 min-h-5"
              @click="setAmenities(amenity)"
            />
            <label>{{ amenity.name }}</label>
          </div>
          <div class="absolute bottom-0 right-0 px-3 py-10">
            <button
              class="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
              @click="preform('Crée une annonce')"
            >
              suivant
            </button>
          </div>
        </div>
      </section>
    </template>

    <template v-if="steps[2]">
      <Form
        :countries="countries"
        :title="formTitle"
        @create="createPlace"
        @close="close"
        :data="place"
      />
    </template>
  </section>

  <!--  -->
  <template v-if="pop">
    <PopUp @close="handlePopUp" @delete="deletePlace" />
  </template>
  <Footer />
</template>
<script setup>
import { ref, watch, onMounted, onBeforeMount } from "vue";
import NavBar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Form from "../components/FormSej.vue";
import PopUp from "../components/Popup.vue";
import Button from "../components/FormButton.vue";
import Input from "../components/FormInput.vue";
import Slider from "primevue/slider";
import { userStore } from "../stores/auth";
import { useCategoryStore } from "../stores/categories";
import { useAmenityStore } from "../stores/amenities";
import { useCountryStore } from "@/stores/country";
import { useOwnerStore } from "../stores/user";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const authStore = userStore();
const user = useOwnerStore();
const component = ref("");
const categoryStore = useCategoryStore();
const amenityStore = useAmenityStore();
const countryStore = useCountryStore();

const { fetchCategories, icons, error } = categoryStore;
const { fetchAminities } = amenityStore;
const { fetchUserPlaces } = user;
const { fetchCountries } = countryStore;
const countries = ref([]);

const steps = ref([false, false, false]);
let place = ref({});
let isOpen = ref(false);
let formTitle = ref("");
let pop = ref(false);
let selectedCategory = ref({});
let selectedAmenities = ref([]);

let success = ref(false);
let message = ref("");
const links = [
  {
    name: "Clandrier",
    path: "",
  },
  {
    name: "Annonce",
    path: "/host/annonce",
  },
  {
    name: "Messages",
    path: "/host/messages",
  },
];

const openPopUp = (place) => {
  localStorage.setItem("Delete", JSON.stringify(place));
  pop.value = true;
};
const setCategory = (category) => {
  selectedCategory.value = category;
  next(1);
};

const setAmenities = (amenity) => {
  selectedAmenities.value.push(amenity);
};

const next = (index) => {
  close();
  steps.value[index] = true;
};

const close = () => {
  for (let i = 0; i < steps.value.length; i++) {
    steps.value[i] = false;
  }
};

const back = () => {
  for (let i = 0; i < steps.value.length; i++) {
    steps.value[i] = JSON.parse(localStorage.getItem("steps"))[i];
  }
};

const preform = (action, place = {}) => {
  if (place) {
    localStorage.setItem("Edit", JSON.stringify(place));
  }
  formTitle.value = action;
  next(2);
};

const handlePopUp = (place_id = "") => {
  pop.value = !pop.value;
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

const createPlace = async (place, selectedCity, formData) => {
  const amenitiesIds = [];
  selectedAmenities.value.forEach((element) => {
    amenitiesIds.push(element.id);
  });

  formData.append("user_id", authStore.user.id);
  formData.append("name", place.name);
  formData.append("category_id", selectedCategory.value.id);
  formData.append("amenities[]", amenitiesIds);
  formData.append("max_guest", place.max_guest);
  formData.append("price_by_night", place.price_by_night);
  formData.append("number_bathrooms", place.number_bathrooms);
  formData.append("number_rooms", place.number_rooms);
  formData.append("description", place.description);
  formData.append("address", place.address);

  const token = "Bearer " + authStore.user.token;
  const response = await fetch(
    `http://127.0.0.1:5000/api/v1/cities/${selectedCity}/places`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    }
  );
  if (response.ok) {
    success.value = true;
    message.value = "Félicitations, votre annonce a été créée avec succès !";
    next();
    await fetchUserPlaces();
  }
};

const deletePlace = async () => {
  const place = JSON.parse(localStorage.getItem("Delete"));
  const token = "Bearer " + authStore.user.token;
  const response = await fetch(
    ` http://127.0.0.1:5000/api/v1/places/${place.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );

  if (response.ok) {
    message.value =
      "Félicitations, votre annonce a été supprimée avec succès !";
    await fetchUserPlaces();
  }
  if (response.status == 401) {
    sessionStorage.removeItem("user");
  }
  pop.value = false;
};

const getCategory = (id) => {
  const category = categoryStore.categories.find((element) => element.id == id);
  return category.name;
};

watch(
  steps,
  (newVal) => {
    const newSteps = [false, false, false];
    for (let i = 0; i < newVal.length; i++) {
      if (newVal[i] != false && i - 1 >= 0) {
        newSteps[i - 1] = true;
      } else {
        newSteps[i] = false;
      }
    }
    JSON.stringify(localStorage.setItem("steps", newSteps));
  },
  { deep: true }
);

onMounted(async () => {
  await fetchCategories();
  await fetchAminities();
  countries.value = await fetchCountries();
  await fetchUserPlaces(authStore.user.id);
});
</script>
