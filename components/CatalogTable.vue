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
import { useAdminStore } from "~/store/admin";
import { useCatalogStore } from "~/store/catalog";

const store = useCatalogStore();
const adminStore = useAdminStore();

const data = computed(() => {
  return store.catalogItems?.slice(store.currentPage, 30).map((item) => {
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

const editItem = (id: number) => {
  console.log("edit", id);
};

const client = useSupabaseClient();

const deleteItem = async (id: number) => {
  try {
    const { error } = await client.from("catalog").delete().eq("id", id);
  } catch (e) {
    console.log(e);
  }
};

const header = [
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
    type: "icon",
    action: editItem,
  },
  {
    label: "",
    value: "_nuxt/assets/delete.svg",
    type: "icon",
    action: deleteItem,
  },
];
</script>

<style scoped></style>
