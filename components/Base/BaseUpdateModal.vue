<template>
  <div class="flex" @click="modalOpen = true">
    <slot></slot>
  </div>
  <Teleport to="body">
    <Transition>
      <div
        v-if="modalOpen"
        class="overlay fixed top-0 left-0 overflow-y-auto z-999 w-full h-screen bg-sky-400/75 flex justify-center items-center"
      >
        <div
          ref="target"
          class="w-[700px] h-[calc(100vh_-_100px)] overflow-y-auto bg-white p-10 opacity-100"
        >
          <form
            ref="form"
            class="w-full flex flex-col mb-4"
            @submit.prevent="callFunction"
          >
            <template v-for="el in INPUT_FIELDS" :key="el">
              <input
                v-if="el.elType === 'input'"
                v-model="selectedItem[el.name]"
                :name="el.name"
                :placeholder="el.placeholder"
                class="h-12 bg-white border bg-sky-400 rounded-none mb-4 px-3 text-xl"
              />
              <input
                v-else-if="el.elType === 'file'"
                type="file"
                :name="el.name"
                :placeholder="el.placeholder"
                class="file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xl file:bg-sky-400 file:text-white hover:file:bg-sky-500 cursor-pointer mb-4"
                @change="selectImage"
              />
              <select
                v-else-if="el.elType === 'select'"
                :name="el.name"
                class="h-12 bg-white border bg-sky-400 rounded-none mb-4 px-3 text-xl"
              >
                <option disabled selected>{{ el.placeholder }}</option>
                <option
                  v-for="option in el.options"
                  :key="el.name + option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </template>
            <input
              type="submit"
              class="bg-sky-400 text-white px-8 py-4 block text-xl cursor-pointer tracking-wider"
              :value="activeItem ? 'Edit item' : 'Create item'"
            />
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAdminStore } from "~/store/admin";

const props = defineProps<{
  item: CatalogItem;
  originalItems: CatalogItem[];
}>();

const store = useAdminStore();
const { activeItem, INPUT_FIELDS } = storeToRefs(store);
const { selectImage, editItem } = store;

const modalOpen = ref(false);
const target = ref(null);
const form = ref(null);

onClickOutside(target, () => {
  modalOpen.value = false;
});

const callFunction = () => {
  const values = form.value;
  if (values) {
    editItem(values, props.item.id);
  }
};

const selectedItem = computed(() => {
  const id = props.item.id;
  return props.originalItems.find((item) => item.id === id);
});
</script>

<style scoped></style>
