<template>
  <div class="pagination-container w-full flex justify-end mt-10">
    <div class="pagination flex cursor-pointer bg-white">
      <div
        class="flex justify-center items-center border sky-blue-400 font-lg font-semibold px-5 h-[50px]"
        @click="firstPage"
      >
        First
      </div>
      <div
        v-for="num in pageNumbers"
        :key="num"
        :class="{ 'pagination-item_active': num === store.currentPage + 1 }"
        class="pagination-item flex justify-center items-center border sky-blue-400 w-[50px] h-[50px] font-lg font-semibold"
        @click="setPage(num)"
      >
        {{ num }}
      </div>
      <div
        class="flex justify-center items-center border sky-blue-400 font-lg font-semibold px-5 h-[50px]"
        @click="lastPage"
      >
        Last
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePaginationStore } from "~/store/pagination";

const props = defineProps<{
  items: CatalogItem[] | OrderItem[] | User[];
  targetRef: null;
}>();

const store = usePaginationStore();

const pageNumbers = computed(() => {
  const numbers = [];
  for (let i = 1; i <= Math.ceil(props.items.length / 12); i++) {
    numbers.push(i);
  }
  return numbers;
});

const scrollToTarget = () => {
  if (props.targetRef) {
    props.targetRef.scrollIntoView({ behavior: "smooth" });
  }
};

const firstPage = () => {
  scrollToTarget();
  setTimeout(() => {
    store.currentPage = 0;
  }, 500);
};

const lastPage = () => {
  scrollToTarget();
  setTimeout(() => {
    const maxLength = Math.ceil(props.items.length / 12);
    store.currentPage = maxLength - 1;
  }, 500);
};

const setPage = (num: number) => {
  scrollToTarget();
  setTimeout(() => {
    store.currentPage = num - 1;
  }, 500);
};
</script>

<style scoped>
.pagination-item {
  transition: 0.5s all;
}

.pagination-item_active {
  background-color: #38bdf8;
  border: 1px solid #38bdf8;
  color: #ffffff;
}
</style>
