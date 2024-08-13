<template>
  <div
    class="mx-auto w-[800px] rounded-full border justify-center items-center relative text-[0.8rem] z-50 mb-5 hidden lg:flex"
  >
    <div class="cursor-pointer w-1/2 relative min-h-16">
      <div
        @click="toggleSection('destination')"
        class="flex flex-col justify-center items-start px-5 min-h-16"
        :class="{
          'border rounded-full': show.destination,
        }"
      >
        <h4>Destination</h4>
        <span class="text-gray-500 text-sm line-clamp-2 w-full"
          >Selection une destination</span
        >
      </div>
      <div
        class="absolute top-20 left-0 bg-gray-200 w-full rounded-lg overflow-y-auto h-80 z-10"
        :class="{ hidden: !show.destination }"
      >
        <ul
          class="bottom-0 w-full flex flex-col transition ease-in-out duration-300"
          v-for="country in countries"
          :key="country.id"
        >
          <li
            class="px-5 py-3 hover:bg-gray-100"
            @click="setCountry(country.id)"
          >
            {{ country.name }}
          </li>
        </ul>
      </div>
    </div>

    <div
      class="px-5 border-l-2 cursor-pointer flex flex-col justify-center items-center"
      @click="toggleSection('arrival')"
    >
      <h4>Arrivé</h4>
      <span class="text-gray-500 text-sm">{{ "Quand?" }}</span>
      <div
        class="absolute top-20 left-0 border-2 bg-gray-200 rounded-lg overflow-y-auto w-1/2 z-10"
        :class="{ hidden: !show.arrival }"
      >
        <Calendar v-model="selected.arrival" inline showWeek class="w-full" />
      </div>
    </div>
    <div
      class="px-5 border-l-2 cursor-pointer flex flex-col justify-center items-center"
      @click="toggleSection('departure')"
    >
      <h4>Départ</h4>
      <span class="text-gray-500 text-sm">Quand?</span>
      <div
        class="absolute top-20 right-0 border-2 bg-gray-200 rounded-lg overflow-y-auto w-1/2 z-10"
        :class="{ hidden: !show.departure }"
      >
        <Calendar
          v-model="selected.departue"
          inline
          showWeek
          :next-month="true"
          class="w-full"
        />
      </div>
    </div>
    <div
      class="border-l-2 cursor-pointer relative flex flex-col justify-center items-start w-1/2 px-3"
    >
      <div class="flex items-center w-full relative px-4">
        <div
          class="cursor-pointer relative flex flex-col justify-center items-start"
          @click="toggleSection('voyageur')"
        >
          <h4>Voyageur</h4>
          <span class="text-gray-500 text-sm">Ajouter des voyageur?</span>
        </div>

        <div
          class="cursor-pointer border rounded-full w-12 h-12 flex justify-center items-center bg-black text-white absolute right-0 hover:opacity-15"
          @click="check(), toggleSection('')"
          disabled
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div
        class="absolute top-20 left-0 border-2 w-full rounded-lg overflow-y-auto h-80 bg-white"
        :class="{ hidden: !show.voyageur }"
      >
        <div>
          <div class="flex items-center justify-between my-5">
            <div class="ml-10 px-3">
              <h4 class="font-bold">Adultes</h4>
              <span class="text-gray-500">13 ans et plus</span>
            </div>
            <div class="flex py-5 px-5 z-50">
              <button
                @click="decrement('adultes')"
                class="px-2 border-2 border-gray-300 rounded-full cursor-"
              >
                -
              </button>
              <input
                v-model.number="voyageur.adultes"
                class="w-5 text-center border-gray-400 rder-none"
              />
              <button
                @click="increment('adultes')"
                class="px-2 border-2 border-gray-300 rounded-full"
              >
                +
              </button>
            </div>
          </div>

          <div class="flex m-auto w-1/2 border-b-2 border-b-gray-300"></div>
        </div>
        <div>
          <div class="flex items-center justify-between my-5">
            <div class="ml-10 px-3">
              <h4 class="font-bold">Enfant</h4>
              <span class="text-gray-500">De 2 a 12 ans </span>
            </div>
            <div class="flex py-5 px-5">
              <button
                @click="decrement('enfant')"
                class="px-2 border-2 border-gray-300 rounded-full"
              >
                -
              </button>
              <input
                v-model.number="voyageur.enfant"
                class="w-5 text-center border-gray-400 rder-none"
              />
              <button
                @click="increment('enfant')"
                class="px-2 border-2 border-gray-300 rounded-full"
              >
                +
              </button>
            </div>
          </div>

          <div class="flex m-auto w-1/2 border-b-2 border-b-gray-300"></div>
        </div>

        <div>
          <div class="flex items-center justify-between my-5">
            <div class="ml-10 px-3">
              <h4 class="font-bold">Bébés</h4>
              <span class="text-gray-500 w-20"> - 2 ans </span>
            </div>
            <div class="flex py-5 px-5">
              <button
                @click="decrement('bébés')"
                class="px-2 border-2 border-gray-300 rounded-full"
              >
                -
              </button>
              <input
                v-model.number="voyageur.bébés"
                class="w-5 text-center border-gray-400 rder-none"
              />
              <button
                @click="increment('bébés')"
                class="px-2 border-2 border-gray-300 rounded-full"
              >
                +
              </button>
            </div>
          </div>

          <div class="flex m-auto w-1/2 border-b-2 border-b-gray-300"></div>
        </div>
        <div>
          <div class="flex flex-col justify-start my-5">
            <div class="ml-10 px-3">
              <h4 class="font-bold">Animaux domestiques</h4>
            </div>
            <div class="flex justify-start py-5 ml-10 px-3">
              <button
                @click="decrement('animaux')"
                class="px-2 border-2 border-gray-300 rounded-full"
              >
                -
              </button>
              <input
                v-model.number="voyageur.animaux"
                class="w-5 text-center border-gray-400 rder-none"
              />
              <button
                @click="increment('animaux')"
                class="px-2 border-2 border-gray-300 rounded-full"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Calendar from "primevue/calendar";
import { ref, watch, onMounted } from "vue";

const props = defineProps(["countries"]);
const emit = defineEmits(["search"]);
const show = ref({
  destination: false,
  arrival: false,
  departure: false,
  voyageur: false,
});
const selected = ref({});
const voyageur = ref({ adultes: 0, enfant: 0, bébés: 0, animaux: 0 });

const increment = (key) => {
  voyageur.value[key]++;
  selected.value.voyageurs = voyageur.value;
};

const decrement = (key) => {
  if (voyageur.value[key] > 0) {
    voyageur.value[key]--;
  }
  selected.value.voyageurs = voyageur.value;
};

const toggleSection = (keyy = "") => {
  for (const [key, value] of Object.entries(show.value)) {
    if (key != keyy) {
      show.value[key] = false;
    } else {
      show.value[key] = !show.value[key];
    }
  }
  localStorage.setItem("searchBarPrams", JSON.stringify(show.value));
};

watch(show, (newVal, oldVal) => {
  if (newVal != oldVal) {
    show.value = JSON.parse(localStorage.getItem("searchBarPrams"));
  }
});

const check = () => {
  if (selected.length > 0) {
    emit("search", selected);
  } else {
    show.value["destination"] = !show.value["destination"];
  }
};

const setCountry = (id) => {
  selected.value.country = id;
  toggleSection("arrival");
};
</script>
