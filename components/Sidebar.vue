<template>
  <aside class="w-96 border sky-blue-400">
    <div
      v-for="item in store.filteringOptions"
      class="filter-section border-b-1 sky-blue-400 p-5"
    >
      <h3 class="filter-section__title text-xl font-semibold mb-3">
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
import { useCatalogStore } from "~/store/catalog";
const store = useCatalogStore();

const catalogItems = computed(() => {
  return store.sortedItems;
});
</script>

<style scoped></style>
