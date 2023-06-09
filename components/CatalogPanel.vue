<template>
  <div class="navigation">
    <div class="navigation__sorting navigation-sorting">
      <span class="navigation-sorting__title"> Sort: </span>
      <span
        class="navigation-sorting__option sorting-option"
        :class="sortValue === 'date' ? 'sorting-option_active' : ''"
        @click="updateSort('date')"
        >Date
        <img
          class="sorting-option__icon"
          src="~/assets/icons/chevron-down.svg"
          :class="
            sortOrder && sortValue === 'date' ? '' : 'sorting-icon_rotated'
          "
          alt="Sort option"
          loading="eager"
        />
      </span>
      <span
        class="navigation-sorting__option sorting-option"
        :class="sortValue === 'price' ? 'sorting-option_active' : ''"
        @click="updateSort('price')"
        >Price
        <img
          class="sorting-option__icon"
          src="~/assets/icons/chevron-down.svg"
          :class="
            sortOrder && sortValue === 'price' ? '' : 'sorting-icon_rotated'
          "
          alt="Sort option"
          loading="eager"
      /></span>
    </div>
    <div class="navigation__search navigation-search">
      <input
        v-model="searchValue"
        type="text"
        placeholder="Search"
        class="navigation-search__input"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCatalogStore } from "~/store/catalog";

const store = useCatalogStore();
const { sortValue, searchValue, sortOrder } = storeToRefs(store);
const { updateSort } = store;
</script>

<style scoped lang="css">
.navigation {
  @apply w-full flex justify-between items-center pb-5 max-md:flex-col max-md:items-start max-sm:px-4;
}

.navigation__wrapper {
  @apply flex justify-between text-lg max-md:mb-4;
}

.navigation-sorting {
  @apply flex max-md:mb-3 max-[400px]:flex-col;
}
.navigation-sorting__title {
  @apply mr-3 font-semibold max-[400px]:mb-2;
}
.navigation-sorting__option {
  @apply px-4 cursor-pointer max-[400px]:mb-2;
}

.navigation-search__input {
  @apply leading-7 py-2 px-4 border w-72;
}

.sorting-option {
  @apply transition duration-200 hover:text-sky-500 flex items-center;
}

.sorting-option_active {
  @apply text-sky-500;
}

.sorting-option__icon {
  @apply w-3 h-3 ml-1 mt-1 transition duration-200;
}

.sorting-icon_rotated {
  @apply rotate-180;
}
</style>
