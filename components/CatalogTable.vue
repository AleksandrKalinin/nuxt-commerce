<template>
  <BaseTable :header="header" :data="data"></BaseTable>
</template>

<script setup lang="ts">
import { useCatalogStore } from "~/store/catalog";

const store = useCatalogStore();

const data = computed(() => {
  return store.catalogItems?.map((item) => {
    return {
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
