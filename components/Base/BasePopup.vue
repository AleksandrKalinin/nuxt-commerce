<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="isOpen"
        class="overlay fixed overflow-y-auto z-10 w-full h-screen bg-sky-400/75 flex justify-center items-center"
      >
        <div
          class="w-[500px] max-md:w-[calc(100w-100px)] h-[300px] border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg overflow-y-auto bg-white p-10 opacity-100 flex flex-col justify-center items-center"
          ref="target"
        >
          <p class="text-2xl text-center mb-10">{{ text }}</p>
          <NuxtLink to="/catalog">
            <button
              @click="store.closePopup"
              class="transition duration-200 hover:bg-sky-500 text-lg px-7 mx-auto py-2 bg-sky-400 text-white rounded-lg"
            >
              {{ btnText }}
            </button>
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { usePopupStore } from "~/store/popup";

const target = ref(null);
const store = usePopupStore();

const isOpen = computed(() => {
  return store.popupState;
});

const text = computed(() => {
  return store.popupContent;
});

const btnText = computed(() => {
  return store.btnText;
});

onClickOutside(target, () => {
  store.closePopup();
});
</script>

<style scoped></style>
