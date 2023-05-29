<template>
  <div
    class="navigation w-100 flex justify-between items-center pb-5 max-md:flex-col max-md:items-start"
  >
    <div
      class="navigation__sorting flex justify-between text-lg font-semibold max-md:mb-4"
    >
      <span class="mr-3"> Сортировать: </span>
      <span
        class="sorting-option mr-3 cursor-pointer"
        @click="store.updateSort('date')"
        >По дате добавления</span
      >
      <span
        class="sorting-option mr-3 cursor-pointer"
        @click="store.updateSort('price')"
        >По цене</span
      >
    </div>
    <div class="navigation__search">
      <input
        type="text"
        placeholder="Искать товары"
        class="leading-7 py-2 px-4 border sky-blue-400 w-72"
        v-model="store.searchValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCatalogStore } from "~/store/catalog";

const store = useCatalogStore();
</script>

<style scoped></style>
