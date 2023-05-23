<template>
  <button
    @click="modalOpen = true"
    class="transition duration-200 hover:bg-sky-500 text-lg px-7 mx-auto py-2 bg-sky-400 text-white rounded-none"
  >
    Добавить
  </button>
  <Teleport to="body">
    <Transition>
      <div
        v-if="modalOpen"
        class="overlay fixed overflow-y-auto z-10 w-full h-screen bg-sky-400/75 flex justify-center items-center"
      >
        <div
          class="w-[700px] h-[calc(100vh_-_100px)] overflow-y-auto bg-white p-10 opacity-100"
          ref="target"
        >
          <form
            ref="form"
            class="w-full flex flex-col mb-4"
            @submit.prevent="callFunction"
          >
            <template v-for="item in store.inputFields">
              <input
                v-if="item.elType === 'input'"
                v-model="item.default"
                :name="item.name"
                :placeholder="item.placeholder"
                class="h-12 bg-white border bg-sky-400 rounded-none mb-4 px-3 text-xl"
              />
              <input
                v-else-if="item.elType === 'file'"
                type="file"
                @change="store.selectImage"
                :name="item.name"
                :placeholder="item.placeholder"
                class="file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xl file:bg-sky-400 file:text-white hover:file:bg-sky-500 cursor-pointer mb-4"
              />
              <select
                v-else-if="item.elType === 'select'"
                :name="item.name"
                class="h-12 bg-white border bg-sky-400 rounded-none mb-4 px-3 text-xl"
              >
                <option disabled selected>{{ item.placeholder }}</option>
                <option v-for="option in item.options" :value="option">
                  {{ option }}
                </option>
              </select>
            </template>
            <input
              type="submit"
              class="bg-sky-400 text-white px-8 py-4 block text-xl cursor-pointer tracking-wider"
              :value="store.activeItem ? 'Edit item' : 'Create item'"
            />
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useAdminStore } from "~/store/admin";

const store = useAdminStore();
const modalOpen = ref(false);
const target = ref(null);

onClickOutside(target, () => {
  modalOpen.value = false;
});

const form = ref(null);

const callFunction = () => {
  const values = form.value;
  store.addItem(values);
};
</script>

<style scoped></style>
