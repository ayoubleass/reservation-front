<template>
  <section
    class="flex justify-center border py-10 min-h-full z-50 w-screen top-0 bg-gray-600 bg-opacity-25 px-20 fixed h-screen"
  >
    <div
      class="flex flex-col items-center bg-white rounded-lg h-[550px] mb-20 overflow-x-hidden relative"
    >
      <div
        class="mb-5 h-[10vh] border flex justify justify-between w-full items-center px-5 py-5"
      >
        <h4 class="font-bold text-xl">Filtres</h4>
        <div
          class="border h-10 w-10 flex justify-center items-center cursor-pointer rounded-full hover:border z-10"
          @click="$emit('close')"
        >
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div class="max-w-3xl bg-white rounded-lg shadow-md">
        <div class="max-w-3xl bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold mb-4">Type de logement</h2>
          <p class="text-gray-600 mb-4">
            Recherchez des chambres, des logements entiers ou tout type
            d'hébergement.
          </p>

          <div class="flex mb-6">
            <button
              class="text-black px-4 py-2 rounded-r-md border border-gray-300 mr-2"
              v-for="(value, index) in types"
              @click="setData('type', value)"
              :class="{
                'bg-black text-white': value == selectedData['type'],
              }"
            >
              {{ value }}
            </button>
          </div>

          <h3 class="text-xl font-semibold mb-2">Fourchette de prix</h3>
          <p class="text-gray-600 mb-4">Prix par nuit hors frais et taxes</p>
          <div>
            <div class="flex items-center">
              <span class="mr-4 text-lg font-medium text-gray-600"
                >{{ selectedData.price }} $</span
              >
              <Slider
                :step="10"
                :min="10"
                :max="10000"
                class="flex-grow"
                v-model="selectedData.price"
              />
            </div>
          </div>

          <h3 class="text-xl font-semibold mb-2">Chambres et lits</h3>
          <p class="text-gray-600 mb-2">Chambres</p>

          <div class="flex space-x-2 mb-6">
            <button class="bg-black text-white px-4 py-2 rounded-full">
              Tout
            </button>
            <button
              class="text-black px-4 py-2 rounded-full border border-gray-300"
              v-for="value in 8"
              @click="setData('chambre', value)"
              :class="{
                'bg-black text-white': value == selectedData['chambre'],
              }"
            >
              {{ value == 8 ? value + "+" : value }}
            </button>
          </div>

          <h2 class="text-2xl font-bold mb-4">Type de propriété</h2>
          <div class="grid grid-cols-4 gap-4 mb-6">
            <div
              class="border rounded-md p-4 flex flex-col items-center cursor-pointer"
              :class="{
                'bg-black text-white': category.id == selectedData.categeory,
              }"
              v-for="category in categories.slice(0, 6)"
              @click="setData('categeory', category.id)"
            >
              <i :class="categoryStore.icons[category.name]"></i>
              <span>{{ category.name }}</span>
            </div>
          </div>

          <h3 class="text-xl font-semibold mb-2">Équipements</h3>
          <p class="text-gray-600 mb-4">Produits et services de base</p>

          <div class="grid grid-cols-2 gap-4">
            <label
              class="flex items-center"
              v-for="amenity in useAmenity.amenities.slice(0, 5)"
              :key="amenity.id"
            >
              <input
                type="checkbox"
                class="mr-2"
                @click="setData('amenities', amenity.id)"
              />
              <span>{{ amenity.name }}</span>
            </label>
          </div>
          <!--  -->
          <div class="flex">
            <div class="w-1/2 flex flex-col">
              <h3 class="text-xl font-semibold">Pays</h3>
              <div class="grid grid-cols-2 gap-4 my-2">
                <select
                  id="city"
                  v-model="selectedData.country"
                  class="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                >
                  <option
                    v-for="country in countries"
                    :key="country.id"
                    :value="country.id"
                  >
                    {{ country.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="w-1/2 flex flex-col" :class="{ hidden: cities == [] }">
              <h3 class="text-xl font-semibold">Ville</h3>
              <div class="grid grid-cols-2 gap-4 my-2">
                <select
                  id="city"
                  v-model="selectedData.city"
                  class="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                >
                  <option
                    v-for="city in cities"
                    :key="city.id"
                    :value="city.id"
                  >
                    {{ city.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="h-[10vh] border flex justify justify-between w-full items-center px-5 py-5"
      >
        <h4 class="font-bold text-xl"></h4>
        <div
          class="border flex justify-center items-center cursor-pointer rounded-full hover:border z-10"
        >
          <button
            type="submit"
            class="text-white w-full bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            @click="$emit('search', selectedData), $emit('close')"
          >
            Afficher
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useCountryStore } from "@/stores/country";
import { ref, watch, onMounted } from "vue";
import { useAmenityStore } from "@/stores/amenities";
import { useCategoryStore } from "@/stores/categories";
import Input from "../components/FormInput.vue";
import Slider from "primevue/slider";
const props = defineProps(["categories", "icons", "selectedFields"]);

const useAmenity = useAmenityStore();
const countryStore = useCountryStore();
const { fetchAminities } = useAmenity;
const { fetchCountries } = countryStore;
const categoryStore = useCategoryStore();
const countries = ref([]);
const cities = ref([]);
const amenities = ref([]);
const selectedData = ref({ price: 40 });
const types = ["Tous les types", "chambre", "Logement entier"];

const setData = (key, value) => {
  if (key == "amenities") {
    amenities.value.push(value);
    selectedData.value[key] = amenities.value;
  } else {
    selectedData.value[key] = value;
  }
};

async function fetchCities(countryId) {
  const resp = await fetch(
    `http://127.0.0.1:5000/api/v1/country/${countryId}/cities`
  );
  const cities = await resp.json();
  return cities;
}
watch(
  selectedData,
  async (newData) => {
    if (newData.country) {
      cities.value = await fetchCities(newData.country);
    }
  },
  { deep: true }
);

onMounted(async () => {
  await fetchAminities();
  countries.value = await fetchCountries();
});
</script>
