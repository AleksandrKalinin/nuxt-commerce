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

  const sortValue = ref("default");
  const sortOrder = ref(true);

  const updateSort = (val: string) => {
    if (sortValue.value === val) {
      sortOrder.value = !sortOrder.value;
    }
    sortValue.value = val;
  };

  const sortedItems = computed(() => {
    const val = sortValue.value;
    const order = sortOrder.value;
    if (val === "default") {
      return filteredItems.value;
    } else {
      if (order === true) {
        return [
          ...filteredItems.value.sort((a: CatalogItem, b: CatalogItem) => {
            if (a[val as keyof CatalogItem] === "") return +1;
            if (b[val as keyof CatalogItem] === "") return -1;
            else
              return a[val as keyof CatalogItem]
                .toString()
                .localeCompare(b[val as keyof CatalogItem].toString());
          }),
        ];
      } else {
        return [
          ...filteredItems.value.sort((a: CatalogItem, b: CatalogItem) => {
            if (a[val as keyof CatalogItem] === "") return +1;
            if (b[val as keyof CatalogItem] === "") return -1;
            else
              return b[val as keyof CatalogItem]
                .toString()
                .localeCompare(a[val as keyof CatalogItem].toString());
          }),
        ];
      }
    }
  });

  return {
    catalogItems,
    fetchCatalogItems,
    selectedItem,
    fetchSelectedItem,
    filteredItems,
    searchValue,
    updateSort,
    sortedItems,
  };
});
