<template>
  <section class="w-full lg:ml-10 ml-5">
    <CatalogPanel />
    <template v-if="catalogItems?.length">
      <div
        v-if="catalogItems?.length"
        class="grid gap-4 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1"
      >
        <TransitionGroup name="catalog">
          <CatalogItem
            v-for="item in catalogItems?.slice(start, end)"
            :item="item"
            :key="item.id"
          />
        </TransitionGroup>
      </div>
    </template>
    <template v-else>
      <Transition>
        <div
          class="preloader-wrapper flex justify-center items-center h-full w-full"
        >
          <img class="w-16" src="~/assets/oval.svg" />
        </div>
      </Transition>
    </template>
    <BasePagination :items="catalogItems" />
  </section>
</template>

<script setup lang="ts">
import { useCatalogStore } from "~/store/catalog";
import { usePaginationStore } from "~/store/pagination";
const store = useCatalogStore();
const pagesStore = usePaginationStore();

const catalogItems = computed(() => {
  return store.selectedItems;
});

const start = computed(() => {
  return pagesStore.currentPage * 12;
});

const end = computed(() => {
  return (pagesStore.currentPage + 1) * 12;
});

onMounted(() => {
  store.fetchCatalogItems();
});
</script>

<style scoped>
.catalog-enter-active,
.catalog-leave-active {
  transition: opacity 0.1s ease;
}

.catalog-enter-active {
  transition-delay: 0.15s;
}

.catalog-enter-from,
.catalog-leave-to {
  opacity: 0.5;
}
</style>
