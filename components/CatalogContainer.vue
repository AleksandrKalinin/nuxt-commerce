<template>
  <section class="catalog" ref="scrollEl">
    <h1 class="catalog__title">Каталог</h1>
    <CatalogPanel />
    <template v-if="catalogItems?.length">
      <div v-if="catalogItems?.length && isLoaded" class="catalog__wrapper">
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
        <div class="preloader-wrapper">
          <span class="preloader-wrapper__text">No items found</span>
        </div>
      </Transition>
    </template>
    <template v-else>
      <Transition>
        <div class="preloader-wrapper">
          <img
            class="w-16"
            src="~/assets/icons/oval.svg"
            alt="Preloader"
            loading="eager"
          />
        </div>
      </Transition>
    </template>
    <BasePagination :items="catalogItems" :targetRef="scrollEl" />
  </section>
</template>

<script setup lang="ts">
import { fetchAdress, message } from "~/utils/fetchAdress";
import { useCartStore } from "~/store/cart";
import { useCatalogStore } from "~/store/catalog";
import { usePaginationStore } from "~/store/pagination";

const user = useSupabaseUser();
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
  fetchAdress();
  store.fetchCatalogItems();
  if (user.value) {
    cartStore.getCartItems();
  }
});
</script>

<style scoped>
.catalog {
  @apply w-full lg:ml-10;
}

.catalog__title {
  @apply text-3xl font-semibold mb-5 max-sm:px-4;
}

.catalog__wrapper {
  @apply grid gap-4 min-[1920px]:grid-cols-4 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2;
}

.preloader-wrapper {
  @apply flex justify-center items-center h-full w-full;
}

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
