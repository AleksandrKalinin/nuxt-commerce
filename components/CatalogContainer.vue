<template>
  <section class="w-full lg:ml-10 ml-5">
    <CatalogPanel />
    <div
      class="grid gap-4 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1"
    >
      <CatalogItem
        v-for="item in catalogItems?.slice(store.currentPage, 12)"
        :item="item"
      />
    </div>
    <BasePagination />
  </section>
</template>

<script setup lang="ts">
import { useCatalogStore } from "~/store/catalog";
import { useDatabaseStore } from "~/store/database";
const store = useCatalogStore();
const dbStore = useDatabaseStore();

const catalogItems = computed(() => {
  return store.selectedItems;
});

const page = computed(() => {
  return store.currentPage;
});

onMounted(() => {
  store.fetchCatalogItems();
});

const item = {
  name: "Panasonic EOS 80",
  id: 1,
  price: 900,
  date: "new Date()",
  manufacturer: "Panasonic",
  photo: "images/1.jpg",
  type: "компакт-камера",
  battery_type: "Li-ion (LP-E10)",
  pixels: 24,
  max_FPS_video: "30 кадров/сек",
  max_FPS_photo: "3 кадра/сек",
  max_sensitivity: "6 400",
  max_resolution: "1920 x 1080",
  min_sensitivity: "100",
  wi_fi: "Да",
  card_support: "SD, SDHC, SDXC",
  matrix_type: "CMOS",
  matrix_size: "1.5",
  popularity: 5,
  rating: 3.5,
};
</script>

<style scoped></style>
