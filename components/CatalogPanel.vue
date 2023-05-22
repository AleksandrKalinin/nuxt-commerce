<template>
  <div class="navigation w-100 flex justify-between items-center pb-5">
    <div class="navigation__sorting flex justify-between">
      <span
        class="sorting-option mr-3 text-base cursor-pointer"
        @click="store.updateSort('date')"
        >По дате добавления</span
      >
      <span
        class="sorting-option mr-3 text-base cursor-pointer"
        @click="store.updateSort('price')"
        >По цене</span
      >
    </div>
    <div class="navigation__search">
      <input
        type="text"
        placeholder="Search"
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
