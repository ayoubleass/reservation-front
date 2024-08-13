<template>
  <section class="max-w-6xl mx-auto rounded-lg relative mb-10">
    <h1 class="text-3xl font-bold mb-8 text-center text-gray-800">
      {{ !title ? "Créez votre annonce" : title }}
    </h1>
    <div class="h-10 w-10">
      <div
        class="border h-10 w-10 flex justify-center items-center cursor-pointer rounded-full hover:border z-10 absolute right-0 top-0"
        @click="$emit('close')"
      >
        <i class="fa-solid fa-xmark"></i>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"> 
      <div class="space-y-8">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h2 class="text-xl font-semibold mb-6 text-gray-700">
            Détails du logement
          </h2>

          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nombre maximum d'invités</label
              >
              <div class="flex items-center">
                <span class="mr-4 text-lg font-medium text-gray-600">{{
                  placeData.max_guest
                }}</span>
                <Slider
                  v-model="placeData.max_guest"
                  :step="1"
                  class="flex-grow"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Prix par nuit ($)</label
              >
              <div class="flex items-center">
                <span class="mr-4 text-lg font-medium text-gray-600"
                  >${{ placeData.price_by_night }}</span
                >
                <Slider
                  v-model="placeData.price_by_night"
                  :step="1"
                  :min="10"
                  :max="10000"
                  class="flex-grow"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nombre de salles de bain</label
              >
              <div class="flex items-center">
                <span class="mr-4 text-lg font-medium text-gray-600">{{
                  placeData.number_bathrooms
                }}</span>
                <Slider
                  v-model="placeData.number_bathrooms"
                  :step="1"
                  class="flex-grow"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nombre de chambres</label
              >
              <div class="flex items-center">
                <span class="mr-4 text-lg font-medium text-gray-600">{{
                  placeData.number_rooms
                }}</span>
                <Slider
                  v-model="placeData.number_rooms"
                  :step="1"
                  class="flex-grow"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h2 class="text-xl font-semibold mb-4 text-gray-700">
            Photos du logement
          </h2>
          <div
            class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors"
          >
            <input
              type="file"
              id="file-upload"
              class="hidden"
              @change="handleFileInputChange"
              multiple
            />
            <label for="file-upload" class="cursor-pointer">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p class="mt-2 text-sm text-gray-600">
                Cliquez pour ajouter des photos ou glissez-déposez
              </p>
            </label>
          </div>
          <!-- Zone pour afficher les miniatures des images téléchargées -->
          <div class="mt-4 grid grid-cols-3 gap-4">
            <!-- Ajoutez ici les miniatures des images -->
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h2 class="text-xl font-semibold mb-6 text-gray-700">
          Localisation et détails
        </h2>

        <div class="space-y-6">
          <div class="flex">
            <div class="w-1/2 mr-2">
              <label
                for="country"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Pays</label
              >
              <select
                id="country"
                v-model="selectedCountry"
                class="mt-1 block w-full border pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {{
                  placeData["country_name"]
                }}
                <option :value="placeData['country_name']">
                  {{ placeData["country_name"] }}
                </option>
                <option
                  v-for="country in countries"
                  :key="country.id"
                  :value="country.id"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>

            <div class="w-1/2">
              <label
                for="city"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Ville</label
              >
              <select
                id="city"
                v-model="selectedCity"
                class="mt-1 block border w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">{{ placeData["city_name"] }}</option>
                <option v-for="city in cities" :key="city.id" :value="city.id">
                  {{ city.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="w-1/2 mr-2">
            <label
              for="country"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Type de logement</label
            >
            <select
              id="country"
              v-model="placeData.type"
              class="mt-1 block w-full border pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {{
                placeData["type"]
              }}
              <option v-for="value in types" :key="value" :value="value">
                {{ value }}
              </option>
            </select>
          </div>
          <div class="relative">
            <label
              for="country"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Date d'arrivée</label
            >
            <input
              id="datepicker-autohide"
              datepicker
              datepicker-autohide
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Select date"
              v-model="placeData.arrival"
              @click="(show = !show), (placeData.arrival = '')"
            />
            <div
              class="absolute top-20 left-0 border-2 bg-gray-200 rounded-lg overflow-y-auto z-10"
              :class="{ hidden: !show }"
              @click="show = true"
            >
              <Calendar
                v-model="placeData.arrival"
                inline
                showWeek
                class="w-full"
              />
            </div>
          </div>
          <div>
            <Input
              type="text"
              name="Nom du logement"
              @costume-input="onChange($event, 'name')"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <Input
              type="text"
              name="Adresse"
              @costume-input="onChange($event, 'address')"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :value="place"
            />
          </div>

          <div>
            <label
              for="description"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Description</label
            >
            <textarea
              id="description"
              v-model="placeData.description"
              rows="4"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Décrivez votre logement..."
            ></textarea>
          </div>
        </div>

        <div class="mt-8 flex justify-end">
          <button
            @click="$emit('create', placeData, selectedCity, formData)"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium shadow-sm text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full"
          >
            {{ title }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, watch, onMounted, onBeforeMount } from "vue";
import Input from "../components/FormInput.vue";
import Slider from "primevue/slider";
import Calendar from "primevue/calendar";

let props = defineProps(["countries", "title", "data"]);

const types = ["chambre", "Logement entier"];
let selectedCountry = ref("");
let selectedCity = ref("");
const cities = ref([]);
let place = ref({});
let show = ref(false);
const formData = new FormData();
const placeData = ref({
  name: "",
  address: "",
  max_guest: 0,
  price_by_night: 10,
  number_bathrooms: 0,
  number_rooms: 0,
  description: "",
  arrival: "",
});

const formatedDate = (selectedDate = "") => {
  const date = new Date(selectedDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

let fetchCities = async (country_id) => {
  const country = props.countries.find((element) => element.id == country_id);
  const response = await fetch(
    ` http://127.0.0.1:5000/api/v1/country/${country.id}/cities`
  );
  cities.value = await response.json();
};

const handleFileInputChange = (event) => {
  const files = event.target.files;
  if (!files || files.length === 0) return;
  for (let i = 0; i < files.length; i++) {
    formData.append("images[]", files[i]);
  }
};

const onChange = (event, fieldName) => {
  placeData.value[fieldName] = event;
};

watch(selectedCountry, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await fetchCities(newValue);
  }
});

watch(
  placeData,
  (newVal) => {
    if (newVal.arrival) {
      show = !show;
    }
  },
  { deep: true }
);
watch(
  () => props.title,
  async (newTitle, oldList) => {
    if (newTitle != "Créez votre annonce") {
      place = JSON.parse(localStorage.getItem("Edit"));
      placeData.value = place;
      const responseCity = await fetch(
        "http://127.0.0.1:5000/api/v1/cities/".concat(place.city_id)
      );
      const cityData = await responseCity.json();
      placeData["city_name"] = cityData.name;

      const responseCountry = await fetch(
        "http://127.0.0.1:5000/api/v1/countries/".concat(cityData.country_id)
      );
      const contryData = await responseCountry.json();
      placeData["country_name"] = contryData.name;
    }
  },
  {
    immediate: true,
  }
);
</script>
