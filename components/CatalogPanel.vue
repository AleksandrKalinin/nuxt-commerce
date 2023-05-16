<template>
  <div class="navigation w-100 flex justify-between items-center pb-5">
    <div class="navigation__sorting flex justify-between">
      <span class="sorting-option mr-3 text-sm cursor-pointer"
        >По дате добавления</span
      >
      <span class="sorting-option mr-3 text-sm cursor-pointer">По цене</span>
    </div>
    <div class="navigation__search">
      <input
        type="text"
        placeholder="Search"
        class="leading-7 py-2 px-4 border sky-blue-400 w-72 mr-2"
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
