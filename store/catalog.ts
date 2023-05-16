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

  const searchValue = ref("");

  const filteredItems = computed(() => {
    return catalogItems.value.filter((item: CatalogItem) => {
      return item.name.toLowerCase().includes(searchValue.value.toLowerCase());
    });
  });

  return {
    catalogItems,
    fetchCatalogItems,
    selectedItem,
    fetchSelectedItem,
    filteredItems,
    searchValue,
  };
});
