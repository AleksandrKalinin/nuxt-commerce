<template>
  <aside class="w-96 border sky-blue-400">
    <h3 class="flex justify-center text-center py-5 text-2xl font-semibold">
      Фильтры
    </h3>

    <div class="filter-section sky-blue-400 px-5 py-4">
      <h3 class="filter-section__title text-xl font-semibold mb-2">Цена</h3>
      <div class="filter-section__list filter-list">
        <BaseSlider
          :max="maxPrice ? maxPrice : 0"
          :min="0"
          :step="1"
          v-model="slider1"
        />
      </div>
    </div>
    <div
      v-for="item in store.filteringOptions"
      class="filter-section border-b-1 sky-blue-400 px-5 py-4"
    >
      <h3 class="filter-section__title text-xl font-semibold mb-2">
        {{ item.label }}
      </h3>
      <div class="filter-section__list filter-list">
        <div class="filter-list__option flex flex-col">
          <label v-for="option in item.value" class="flex items-center py-2"
            ><input
              type="checkbox"
              class="mr-2 w-7 h-7"
              v-model="option.selected"
              @change="store.selectItem(option.label, item.category)"
            />{{ option.label }}</label
          >
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";
import { useCatalogStore } from "~/store/catalog";
const store = useCatalogStore();

const slider1 = ref(0);

const maxPrice = computed(() => {
  return store.sortedItems!.reduce((prev, cur) => {
    return prev.price > cur.price ? prev.price : cur.price;
  }, 0);
});

watchDebounced(
  slider1,
  () => {
    store.initialPrice = slider1.value;
  },
  { debounce: 500, maxWait: 1000 }
);
</script>

<style scoped></style>
