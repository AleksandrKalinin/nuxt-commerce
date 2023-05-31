<template>
  <BaseTable
    :header="CATALOG_HEADER"
    :data="data"
    v-if="data?.length"
    :shadowed="true"
    :originalItems="originalItems"
  >
  </BaseTable>
  <div
    v-else
    class="preloader-wrapper flex justify-center items-center h-full w-full"
  >
    <img class="w-16" src="~/assets/oval.svg" />
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from "~/store/admin";
import { useCatalogStore } from "~/store/catalog";
import { usePaginationStore } from "~/store/pagination";

const store = useCatalogStore();
const adminStore = useAdminStore();
const pagesStore = usePaginationStore();

const CATALOG_HEADER = [
  {
    label: "ID",
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
    label: "Дата",
    value: "date",
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
    action: adminStore.toggleVisibility,
  },
  {
    label: "",
    value: "_nuxt/assets/edit.svg",
    type: "markup",
  },
  {
    label: "",
    value: "_nuxt/assets/delete.svg",
    type: "icon",
    action: adminStore.deleteItem,
  },
];

const start = computed(() => {
  return pagesStore.currentPage * 12;
});

const end = computed(() => {
  return (pagesStore.currentPage + 1) * 12;
});

const originalItems = computed(() => {
  return store.catalogItems?.slice(start.value, end.value);
});

const data = computed(() => {
  return store.catalogItems?.slice(start.value, end.value).map((item) => {
    return {
      id: item.id,
      name: item.name,
      photo: item.photo,
      item_code: item.item_code,
      date: item.date,
      in_stock: item.in_stock,
      is_visible: item.is_visible,
    };
  });
});

onMounted(() => {
  store.fetchCatalogItems();
});
</script>

<style scoped></style>
