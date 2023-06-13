<template>
  <form
    ref="form"
    class="modal__form modal-form"
    @submit.prevent="callFunction"
  >
    <template v-for="item in fields" :key="item">
      <input
        v-if="item.elType === 'input'"
        v-model="item.default"
        :name="item.name"
        :placeholder="item.placeholder"
        class="modal-form__input"
      />
      <input
        v-else-if="item.elType === 'file'"
        type="file"
        :name="item.name"
        :placeholder="item.placeholder"
        class="modal-form__file"
        @change="selectImage"
      />
      <select
        v-else-if="item.elType === 'select'"
        :name="item.name"
        class="modal-form__select"
      >
        <option disabled selected>{{ item.placeholder }}</option>
        <option
          v-for="(option, index) in item.options"
          :key="index"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </template>
    <input
      type="submit"
      class="modal-form__submit"
      :value="activeItem ? 'Edit item' : 'Create item'"
    />
  </form>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAdminStore } from "~/store/admin";

const store = useAdminStore();

const { activeItem } = storeToRefs(store);
const { addItem, selectImage } = store;

const props = defineProps<{
  fields: any;
  currentPage: string;
}>();

const modalOpen = ref(false);
const form = ref(null);

const userFunction = (values) => {
  const obj = {};
  for (let i = 0; i < values.length; i++) {
    const curVal = values[i] as HTMLInputElement;
    if (curVal.type !== "submit") {
      const key = curVal.name;
      obj[key] = curVal.value;
    }
  }
};

const addOrder = (values) => {
  console.log("fff");
};

const callFunction = () => {
  const values = form.value;
  if (values) {
    switch (props.currentPage) {
      case "catalog":
        addItem(values);
        break;
      case "orders":
        addOrder(values);
        break;
      case "users":
        userFunction(values);
        break;
      // addUser(values);
    }
    // addItem(values);
  }
};

const target = ref(null);

onClickOutside(target, () => {
  modalOpen.value = false;
});
</script>

<style scoped>
.modal__form {
  @apply w-full flex flex-col mb-4;
}

.modal-form__input {
  @apply h-12 bg-white border rounded-none mb-4 px-3 text-xl;
}

.modal-form__file {
  @apply file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xl file:bg-sky-400 file:text-white hover:file:bg-sky-500 cursor-pointer mb-4;
}

.modal-form__select {
  @apply h-12 bg-white border rounded-none mb-4 px-3 text-xl;
}

.modal-form__submit {
  @apply bg-sky-400 text-white px-8 py-4 block text-xl cursor-pointer tracking-wider;
}
</style>
