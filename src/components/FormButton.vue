<template>
  <button
    type="submit"
    class="text-white w-full bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    {{ text }}
  </button>
</template>

<script setup>
let props = defineProps(["text"]);
</script>
