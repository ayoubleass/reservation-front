<template>
  <header class="h-1/3 border-b pb-5 px-5">
    <NavBar />
  </header>
  <section class="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 my-10">
    <h1 class="text-2xl font-semibold mb-6 flex items-center">
      <svg
        class="w-6 h-6 mr-2 cursor-pointer"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        @click="router.push('/place/'.concat(placeStore.place.id))"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
      Confirmer et payer
    </h1>

    <div
      class="bg-gray-50 border border-black rounded-lg p-4 mb-6 flex justify-between items-center"
    >
      <div>
        <p class="font-semibold">C'est une perle rare.</p>
        <p class="text-sm text-gray-600">
          Les réservations sont fréquentes chez
          {{ ownerStore.user.first_name + " " + ownerStore.user.last_name }}.
        </p>
      </div>
      <svg
        class="w-8 h-8 text-gray-500"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
    <div class="flex mb-6">
      <div class="w-2/3 pr-4">
        <h2 class="text-xl font-semibold mb-4">Votre voyage</h2>
        <div class="flex justify-between mb-2">
          <p>Dates</p>
          <a href="#" class="text-black underline">Modifier</a>
        </div>
        <p class="mb-4">4-9 sept.</p>
        <div class="flex justify-between mb-2">
          <p>Voyageurs</p>
          <a href="#" class="text-black underline">Modifier</a>
        </div>
        <p>1 voyageur</p>
      </div>
      <div class="w-1/3">
        <img
          :alt="placeStore.place.address"
          class="w-full h-32 object-cover rounded-lg mb-2"
        />
        <h3 class="font-semibold">{{ placeStore.place.address }}</h3>
        <p class="text-sm text-gray-600">
          {{ categoryStore.category ? categoryStore.category.name : "" }}
        </p>
        <div class="flex items-center mt-1">
          <svg
            class="w-4 h-4 text-black"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
          <span class="ml-1 text-sm">4,94 (0 commentaires) · Superhôte</span>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-200 pt-6">
      <h2 class="text-xl font-semibold mb-4">Détails du prix</h2>
      <div class="flex justify-between mb-2">
        <p>{{ placeStore.place.price_by_night }} MAD</p>
        <p>{{ placeStore.place.price_by_night * 5 }} MAD</p>
      </div>
      <div
        class="flex justify-between font-semibold mt-4 pt-4 border-t border-gray-200"
      >
        <p>Total (MAD)</p>
        <p>MAD5 852,93</p>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">
        Choisissez comment vous souhaitez payer
      </h2>
      <div class="border border-gray-300 rounded-lg mb-4">
        <label class="flex items-center p-4 cursor-pointer">
          <input type="radio" name="payment" class="mr-2" checked />
          <span>Payez MAD5852,93 maintenant</span>
        </label>
      </div>
      <div class="border border-gray-300 rounded-lg">
        <label class="flex items-center p-4 cursor-pointer">
          <input type="radio" name="payment" class="mr-2" />
          <div>
            <p>Payez une partie maintenant et l'autre plus tard</p>
            <p class="text-sm text-gray-600">
              MAD2926,48 à régler aujourd'hui, MAD2926,45 à régler le 20 août
              2024. Aucuns frais supplémentaires.
              <a href="#" class="underline">Plus d'informations</a>
            </p>
          </div>
        </label>
      </div>
    </div>
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Payer avec</h2>
      <div class="flex items-center mb-4">
        <img alt="Visa" class="h-6 mr-2" />
        <img alt="American Express" class="h-6" />
      </div>

      <div class="mb-4 w-full">
        <select class="w-full p-2 border border-gray-300 rounded">
          <option>Carte de crédit ou de débit</option>
        </select>
      </div>

      <div class="mb-4">
        <input
          type="text"
          placeholder="Numéro de carte"
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div class="flex mb-4">
        <input
          type="text"
          placeholder="Expiration"
          class="w-1/2 p-2 border border-gray-300 rounded-l"
        />
        <input
          type="text"
          placeholder="Cryptogramme"
          class="w-1/2 p-2 border border-gray-300 rounded-r"
        />
      </div>

      <div class="mb-4">
        <input
          type="text"
          placeholder="Code postal"
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div class="mb-4">
        <select class="w-full p-2 border border-gray-300 rounded">
          <option>Pays/région Maroc</option>
        </select>
      </div>

      <h2 class="text-xl font-semibold mb-4">Requis pour votre voyage</h2>

      <div class="mb-4">
        <p class="mb-2">Envoyez un message à l'hôte</p>
        <p class="text-sm text-gray-600 mb-2">
          Indiquez la raison de votre voyage, qui vous accompagne et ce que vous
          appréciez concernant ce logement.
        </p>
        <button
          class="bg-white text-black border border-black px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>

      <div class="mb-4">
        <p class="mb-2">Photo de profil</p>
        <p class="text-sm text-gray-600 mb-2">
          Les hôtes veulent savoir qui va séjourner dans leur logement.
        </p>
        <button
          class="bg-white text-black border border-black px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>

      <div class="mb-4">
        <p class="mb-2">Numéro de téléphone</p>
        <p class="text-sm text-gray-600 mb-2">
          Ajoutez et confirmez votre numéro de téléphone afin qu'Airbnb puisse
          vous communiquer des informations sur vos voyages.
        </p>
        <button
          class="bg-white text-black border border-black px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>

      <h2 class="text-xl font-semibold mb-4">Conditions d'annulation</h2>
      <p class="mb-4">
        Annulation gratuite avant le 5 août. Si vous annulez avant le 28 août,
        vous aurez droit à un remboursement partiel.
        <a href="#" class="text-black underline">En savoir plus</a>
      </p>

      <h2 class="text-xl font-semibold mb-4">Règles de base</h2>
      <p class="mb-2">
        Nous demandons à tous les voyageurs de se souvenir de quelques règles
        simples qui contribueront à rendre leur séjour agréable, pour eux comme
        pour les hôtes.
      </p>
      <ul class="list-disc pl-5 mb-4">
        <li>Respectez le règlement intérieur.</li>
        <li>Traitez le logement de votre hôte comme si c'était le vôtre.</li>
      </ul>

      <p class="text-sm text-gray-600 mb-4">
        En cliquant sur le bouton ci-dessous, j'accepte les conditions suivantes
        : Règlement intérieur de l'hôte, Règles de base pour les voyageurs
        d'Airbnb, Politique d'Airbnb en matière de distanciation sociale et
        consignes liées au COVID-19, et j'accepte que Airbnb puisse prélever mon
        mode de paiement si je suis tenu responsable de dommages. J'accepte de
        payer le montant total affiché s'il s'agit d'une réservation avec
        paiement en ligne.
      </p>

      <button class="w-full bg-black text-white py-3 rounded font-semibold">
        Confirmer et payer
      </button>
    </div>
  </section>

  <Footer />
</template>
<script setup>
import NavBar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { ref, watch, onMounted, onBeforeMount } from "vue";
import { usePlaceStore } from "../stores/place";
import { useOwnerStore } from "../stores/user";
import { useCategoryStore } from "../stores/categories";
import { useRouter, useRoute } from "vue-router";

const placeStore = usePlaceStore();
const ownerStore = useOwnerStore();
const categoryStore = useCategoryStore();

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  await placeStore.fetchPlace(route.fullPath.split("/")[2]);
  await ownerStore.fetchOwner(placeStore.place.user_id);
  await categoryStore.fetchCatgory(placeStore.place.category_id);
});
</script>
