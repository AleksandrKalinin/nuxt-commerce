<template>
  <BaseTable :header="header" :data="data" v-if="data?.length"> </BaseTable>
  <div
    v-else
    class="preloader-wrapper flex justify-center items-center h-full w-full"
  >
    <img class="w-16" src="~/assets/oval.svg" />
  </div>
</template>

<script setup lang="ts">
import { useCatalogStore } from "~/store/catalog";

const store = useCatalogStore();

const data = computed(() => {
  return store.catalogItems?.slice(store.currentPage, 12).map((item) => {
    return {
      id: item.id,
      name: item.name,
      photo: item.photo,
      item_code: item.item_code,
      in_stock: item.in_stock,
      is_visible: item.is_visible,
    };
  });
});

onMounted(() => {
  store.fetchCatalogItems();
});

const header = [
  {
    label: "Id",
    value: "id",
    type: "plain",
  },
  {
    label: "Название",
    value: "name",
    type: "plain",
  },
  {
    label: "Фото",
    value: "photo",
    type: "image",
  },
  {
    label: "Артикул",
    value: "item_code",
    type: "plain",
  },
  {
    label: "Остаток",
    value: "in_stock",
    type: "plain",
  },
  {
    label: "Видимость",
    value: "is_visible",
    type: "toggle",
  },
];
</script>

<style scoped></style>
