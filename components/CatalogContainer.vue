<template>
  <section class="w-full lg:ml-10 ml-5">
    <CatalogPanel />
    <div class="2xl:columns-4 xl:columns-3 md:columns-2 sm:columns-1">
      <CatalogItem :item="item" :id="1" />
      <CatalogItem :item="item" :id="2" />
      <CatalogItem :item="item" :id="3" />
      <CatalogItem :item="item" :id="4" />
      <CatalogItem :item="item" :id="5" />
      <CatalogItem :item="item" :id="6" />
      <CatalogItem :item="item" :id="7" />
      <CatalogItem :item="item" :id="8" />
      <CatalogItem :item="item" :id="9" />
      <CatalogItem :item="item" :id="10" />
      <CatalogItem :item="item" :id="11" />
      <CatalogItem :item="item" :id="12" />
    </div>
    <BasePagination />
  </section>
</template>

<script setup lang="ts">
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
