<template>
  <section class="w-full lg:ml-10" ref="scrollEl">
    <CatalogPanel />
    <template v-if="catalogItems?.length">
      <div
        v-if="catalogItems?.length && isLoaded"
        class="grid gap-4 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2"
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
    <template v-else-if="catalogItems?.length === 0 && isLoaded">
      <Transition>
        <div
          class="preloader-wrapper flex justify-center items-center h-full w-full"
        >
          <span class="text-2xl">Sorry, no matched items found</span>
        </div>
      </Transition>
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
    <BasePagination :items="catalogItems" :targetRef="scrollEl" />
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from "~/store/cart";
import { useCatalogStore } from "~/store/catalog";
import { usePaginationStore } from "~/store/pagination";

const store = useCatalogStore();
const pagesStore = usePaginationStore();
const cartStore = useCartStore();
const scrollEl = ref(null);

const isLoaded = computed(() => {
  return store.loaded;
});

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
  cartStore.getCartItems();
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
