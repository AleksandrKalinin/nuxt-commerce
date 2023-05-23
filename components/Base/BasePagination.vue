<template>
  <div class="pagination-container w-full flex justify-end mt-3">
    <div class="pagination flex cursor-pointer">
      <div
        @click="firstPage"
        class="flex justify-center items-center border sky-blue-400 font-lg font-semibold px-5"
      >
        First
      </div>
      <div
        v-for="num in pageNumbers"
        @click="setPage(num)"
        :class="{ 'pagination-item_active': num === store.currentPage + 1 }"
        class="pagination-item flex justify-center items-center border sky-blue-400 w-10 h-10 font-lg font-semibold"
      >
        {{ num }}
      </div>
      <div
        @click="lastPage"
        class="flex justify-center items-center border sky-blue-400 font-lg font-semibold px-5"
      >
        Last
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCatalogStore } from "~/store/catalog";
const store = useCatalogStore();
const pageNumbers = computed(() => {
  let numbers = [];
  for (let i = 1; i <= Math.ceil(store.selectedItems!.length / 12); i++) {
    numbers.push(i);
  }
  return numbers;
});

const firstPage = () => {
  store.currentPage = 0;
};

const lastPage = () => {
  const maxLength = Math.ceil(store.selectedItems!.length / 12);
  store.currentPage = maxLength - 1;
};

const setPage = (num: number) => {
  store.currentPage = num - 1;
};
</script>

<style scoped>
.pagination-item {
  transition: 1s all;
}

.pagination-item_active {
  background-color: #38bdf8;
  border: 1px solid #38bdf8;
  color: #ffffff;
}
</style>
