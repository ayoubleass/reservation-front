<template>
  <div class="mb-5">
    <label
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ name }}</label
    >
    <input
      @input="onChange"
      :type="type"
      id="email"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder=""
      :class="{ 'border-red-600': required }"
    />
  </div>
</template>

<script setup>
import { errorMessages } from "vue/compiler-sfc";

const emit = defineEmits(["costume-input"]);
const props = defineProps(["name", "type", "value", "required"]);

const onChange = (event) => {
  emit("costume-input", event.target.value);
};
</script>
