import { defineStore } from "pinia";

export const useCatalogStore = defineStore("catalog", () => {
  const catalogItems = ref([]);
  const isLoaded = ref(false);

  async function fetchCatalogItems() {
    await fetch("./items.json")
      .then((res) => res.json())
      .then((json) => {
        (isLoaded.value = true), (catalogItems.value = json);
      });
  }

  const selectedItem = ref(null);

  function fetchSelectedItem(id: string | string[]) {
    const item = catalogItems.value.find((x: any) => x.id === Number(id));
    if (item) {
      selectedItem.value = item;
    }
  }

  return {
    catalogItems,
    fetchCatalogItems,
    selectedItem,
    fetchSelectedItem,
  };
});
