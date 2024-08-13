<template>
  <section
    class="flex justify-center border py-10 min-h-full z-50 w-screen top-0 bg-gray-600 bg-opacity-25 px-20 fixed"
  >
    <div
      class="flex flex-col items-center bg-white rounded-lg h-[700px] mb-10 overflow-x-hidden relative"
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
              @click="$emit('search', selected), toggleSection('')"
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
    </div>
  </section>
</template>
<script steup>
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
</script>
