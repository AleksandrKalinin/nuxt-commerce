import { defineStore } from "pinia";
import { createClient } from "@supabase/supabase-js";
import { usePaginationStore } from "./pagination";

export const useCatalogStore = defineStore("catalog", () => {
  const config = useSupabaseConfig();
  const client = createClient(config.URL, config.KEY);
  const catalogItems: Ref<CatalogItem[] | null> = ref([]);

  async function fetchCatalogItems() {
    try {
      let { data, error } = await client
        .from("catalog")
        .select(
          "id, name, price, date, manufacturer, photo, type, battery_type, pixels, max_FPS_video, max_FPS_photo, max_sensitivity, max_resolution, min_sensitivity, wi_fi, card_support, matrix_type, matrix_size, popularity, rating, warranty, in_stock, item_code, is_visible"
        );
      catalogItems.value = data;
    } catch (e) {
      console.log(e);
    }
  }

  const selectedItem: Ref<CatalogItem | null> = ref(null);

  function fetchSelectedItem(id: string | string[]) {
    const item = catalogItems.value?.find((x: any) => x.id === Number(id));
    if (item) {
      selectedItem.value = item;
    }
  }

  const searchValue = ref("");
  const initialPrice = ref(0);

  const visibleItems = computed(() => {
    return catalogItems.value?.filter((item) => item.is_visible === true);
  });

  const filteredItems = computed(() => {
    return visibleItems.value?.filter((item: CatalogItem) => {
      return item.name.toLowerCase().includes(searchValue.value.toLowerCase());
    });
  });

  const filteredByPrice = computed(() => {
    return filteredItems.value?.filter((item: CatalogItem) => {
      return item.price > initialPrice.value;
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
      return filteredByPrice.value;
    } else {
      if (order === true) {
        return [
          ...filteredByPrice.value.sort((a: CatalogItem, b: CatalogItem) => {
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
          ...filteredByPrice.value.sort((a: CatalogItem, b: CatalogItem) => {
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
        visibleItems.value?.map((item: CatalogItem) => item.manufacturer)
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
      ...new Set(visibleItems.value?.map((item: CatalogItem) => item.type)),
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
        visibleItems.value?.map((item: CatalogItem) => item.matrix_type)
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
        visibleItems.value?.map((item: CatalogItem) => item.matrix_size)
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
      ...new Set(visibleItems.value?.map((item: CatalogItem) => item.pixels)),
    ].map((label) => {
      const obj = {} as SelectOption;
      obj.label = label;
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
    return sortedItems.value?.filter((curItem: CatalogItem) => {
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

  const pagesStore = usePaginationStore();

  const selectItem = (value: string, category: string) => {
    pagesStore.currentPage = 0;
    if (selectedOptions[category as keyof SelectedOptions].includes(value)) {
      selectedOptions[category as keyof SelectedOptions] = selectedOptions[
        category as keyof SelectedOptions
      ].filter((item) => item !== value);
    } else {
      selectedOptions[category as keyof SelectedOptions].push(value);
    }
  };

  return {
    catalogItems,
    fetchCatalogItems,
    selectedItem,
    fetchSelectedItem,
    visibleItems,
    filteredItems,
    searchValue,
    initialPrice,
    updateSort,
    sortedItems,
    selectedOptions,
    filteringOptions,
    selectedItems,
    selectItem,
  };
});
