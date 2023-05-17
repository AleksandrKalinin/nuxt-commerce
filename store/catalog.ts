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

  const manufacturers = computed(() => {
    const labels = [
      ...new Set(
        catalogItems.value.map((item: CatalogItem) => item.manufacturer)
      ),
    ].map((label) => {
      const obj = {} as SelectOption;
      obj.label = label;
      obj.selected = false;
      return obj;
    });
    return labels;
  });

  const types = computed(() => {
    const labels = [
      ...new Set(catalogItems.value.map((item: CatalogItem) => item.type)),
    ].map((label) => {
      const obj = {} as SelectOption;
      obj.label = label;
      obj.selected = false;
      return obj;
    });
    return labels;
  });

  const matrixTypes = computed(() => {
    const labels = [
      ...new Set(
        catalogItems.value.map((item: CatalogItem) => item.matrix_type)
      ),
    ].map((label) => {
      const obj = {} as SelectOption;
      obj.label = label;
      obj.selected = false;
      return obj;
    });
    return labels;
  });

  const matrixSizes = computed(() => {
    const labels = [
      ...new Set(
        catalogItems.value.map((item: CatalogItem) => item.matrix_size)
      ),
    ].map((label) => {
      const obj = {} as SelectOption;
      obj.label = label;
      obj.selected = false;
      return obj;
    });
    return labels;
  });

  const matrixPixels = computed(() => {
    const labels = [
      ...new Set(catalogItems.value.map((item: CatalogItem) => item.pixels)),
    ].map((label) => {
      const obj = {} as SelectOption;
      obj.label = label.toString();
      obj.selected = false;
      return obj;
    });
    return labels;
  });

  const filteringOptions = computed(() => {
    return [
      {
        label: "Производитель",
        value: manufacturers.value,
        category: "manufacturer",
      },
      {
        label: "Тип камеры",
        value: types.value,
        category: "type",
      },
      {
        label: "Тип матрицы",
        value: matrixTypes.value,
        category: "matrix_type",
      },
      {
        label: "Размер матрицы",
        value: matrixSizes.value,
        category: "matrix_size",
      },
      {
        label: "Кол-в точек матрицы",
        value: matrixPixels.value,
        category: "pixels",
      },
    ];
  });

  const selectedOptions = reactive<SelectedOptions>({
    manufacturer: [],
    type: [],
    matrix_type: [],
    matrix_size: [],
    pixels: [],
  });

  const selectedItems = computed(() => {
    return sortedItems.value.filter((curItem: CatalogItem) => {
      let flag = true;
      for (const key in selectedOptions) {
        const values = selectedOptions[key as keyof SelectedOptions];
        if (values.length) {
          if (!values.includes(curItem[key as keyof SelectedOptions])) {
            flag = false;
          }
        }
      }
      if (flag) return curItem;
    });
  });

  const selectItem = (value: string, category: string) => {
    if (selectedOptions[category as keyof SelectedOptions].includes(value)) {
      selectedOptions[category as keyof SelectedOptions] = selectedOptions[
        category as keyof SelectedOptions
      ].filter((item) => item !== value);
    } else {
      selectedOptions[category as keyof SelectedOptions].push(value);
    }
  };

  const currentPage = ref(0);

  return {
    catalogItems,
    fetchCatalogItems,
    selectedItem,
    fetchSelectedItem,
    filteredItems,
    searchValue,
    updateSort,
    sortedItems,
    selectedOptions,
    filteringOptions,
    selectedItems,
    selectItem,
    currentPage,
  };
});
