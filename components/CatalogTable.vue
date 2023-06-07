<template>
  <BaseTable
    v-if="data?.length"
    :header="CATALOG_HEADER"
    :data="data"
    :shadowed="true"
    :original-items="originalItems"
  >
  </BaseTable>
  <div v-else class="preloader-wrapper">
    <img
      class="w-16 h-16"
      src="~/assets/icons/oval.svg"
      alt="Preloader"
      loading="eager"
    />
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
    label: "Name",
    value: "name",
    type: "plain",
  },
  {
    label: "Photo",
    value: "photo",
    type: "image",
  },
  {
    label: "Item code",
    value: "item_code",
    type: "plain",
  },
  {
    label: "Date",
    value: "date",
    type: "plain",
  },
  {
    label: "Residue",
    value: "in_stock",
    type: "plain",
  },
  {
    label: "Visibility",
    value: "is_visible",
    type: "toggle",
    action: adminStore.toggleVisibility,
  },
  {
    label: "",
    value: "edit",
    type: "markup",
  },
  {
    label: "",
    value: "delete",
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
