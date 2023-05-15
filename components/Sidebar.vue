<template>
  <aside class="w-96 border sky-blue-400">
    <div
      v-for="item in filteringOptions"
      class="filter-section border-b-1 sky-blue-400 p-5"
    >
      <h3 class="filter-section__title text-xl font-semibold mb-3">
        {{ item.label }}
      </h3>
      <div class="filter-section__list filter-list">
        <div class="filter-list__option flex flex-col">
          <label v-for="option in item.value" class="flex items-center py-2"
            ><input type="checkbox" class="mr-2 w-7 h-7" />{{ option }}</label
          >
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useCatalogStore } from "~/store/catalog";
const store = useCatalogStore();

const manufacturers = computed(() => {
  return [...new Set(store.catalogItems.map((item) => item.manufacturer))];
});

const types = computed(() => {
  return [...new Set(store.catalogItems.map((item) => item.type))];
});

const matrixTypes = computed(() => {
  return [...new Set(store.catalogItems.map((item) => item.matrix_type))];
});

const matrixSizes = computed(() => {
  return [...new Set(store.catalogItems.map((item) => item.matrix_size))];
});

const matrixPixels = computed(() => {
  return [...new Set(store.catalogItems.map((item) => item.pixels))];
});

const filteringOptions = computed(() => {
  return [
    {
      label: "Производитель",
      value: manufacturers.value,
    },
    {
      label: "Тип камеры",
      value: types.value,
    },
    {
      label: "Тип матрицы",
      value: matrixTypes.value,
    },
    {
      label: "Размер матрицы",
      value: matrixSizes.value,
    },
    {
      label: "Кол-в точек матрицы",
      value: matrixPixels.value,
    },
  ];
});
</script>

<style scoped></style>
