<template>
  <section
    class="flex justify-center border py-10 h-screen fixed z-50 w-screen top-0 bg-gray-600 bg-opacity-25 px-10 sm:px-0"
  >
    <div
      class="flex flex-col items-center bg-white lg:w-1/3 md:w-1/2 sm:w-screen rounded-lg min-h-[550px] mb-10 px-5 overflow-x-hidden"
    >
      <div class="h-16 border-b w-full text-center py-5 relative px-20 mb-10">
        <h4 class="font-bold">Connexion ou inscription</h4>
        <div
          class="absolute top-2 right-0 border h-10 w-10 flex justify-center items-center cursor-pointer rounded-full hover:border z-10 mx-2"
          @click="$emit('close')"
        >
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      <form class="max-w-sm w-full">
        <div
          class="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
          v-show="error_message"
        >
          <svg
            class="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
            />
          </svg>
          <span class="sr-only">Info</span>
          <div>
            {{ error_message ? error_message : "" }}
          </div>
        </div>
        <div v-for="(field, index) in fields" :key="index">
          <Input
            :name="field.label"
            :type="field.type"
            :required="required[field.name]"
            @costume-input="onChange($event, field.name)"
          />
        </div>

        <Button text="Continuer" :onClick="signup" />
      </form>
      <div>ou</div>

      <div class="max-w-sm w-full mb-10">
        <Button text="Connexion" @click="$emit('show')" />
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from "../components/FormButton.vue";
import Input from "../components/FormInput.vue";
import { ref } from "vue";

const formData = ref({
  email: "",
  password: "",
  last_name: "",
  first_name: "",
  phone_number: "",
});

const fields = ref([
  {
    label: "First name",
    type: "text",
    name: "first_name",
  },
  {
    label: "Last name",
    type: "text",
    name: "last_name",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
  },
  {
    label: "Email address",
    type: "email",
    name: "email",
  },
  {
    label: "Phone number",
    type: "text",
    name: "phone_number",
  },
]);

let required = ref({});
const error_message = ref("");
const signup = (event) => {
  event.preventDefault();
  for (const key in formData.value) {
    if (!formData.value[key]) {
      required.value[key] = true;
      error_message.value = "All fields are  required";
    }
  }
  if (!error_message.value) {
  }
};

const onChange = (event, fieldName) => {
  formData.value[fieldName] = event;
};
</script>
