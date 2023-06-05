<template>
  <div class="navigation">
    <div class="navigation__sorting navigation-sorting">
      <span class="navigation-sorting__title"> Сортировать: </span>
      <span class="navigation-sorting__option" @click="store.updateSort('date')"
        >По дате добавления</span
      >
      <span
        class="navigation-sorting__option"
        @click="store.updateSort('price')"
        >По цене</span
      >
    </div>
    <div class="navigation__search navigation-search">
      <input
        type="text"
        placeholder="Искать товары"
        class="navigation-search__input"
        v-model="store.searchValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCatalogStore } from "~/store/catalog";

const store = useCatalogStore();
</script>

<style scoped>
.navigation {
  @apply w-full flex justify-between items-center pb-5 max-md:flex-col max-md:items-start;
}

.navigation__wrapper {
  @apply flex justify-between text-lg max-md:mb-4;
}

.navigation-sorting__title {
  @apply mr-3 font-semibold;
}
.navigation-sorting__option {
  @apply mr-3 cursor-pointer;
}

.navigation-search__input {
  @apply leading-7 py-2 px-4 border w-72;
}
</style>
