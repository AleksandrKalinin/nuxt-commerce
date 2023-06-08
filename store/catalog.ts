import { defineStore, storeToRefs } from "pinia";
import { usePaginationStore } from "./pagination";
import { useToastsStore } from "./toasts";

export const useCatalogStore = defineStore("catalog", () => {
  const client = useSupabaseClient();
  const catalogItems: Ref<CatalogItem[] | null> = ref([]);
  const loaded: Ref<boolean> = ref(false);

  const toastsStore = useToastsStore();
  const pagesStore = usePaginationStore();

  const { currentPage } = storeToRefs(pagesStore);
  const { showErrorToast } = toastsStore;

  const fetchCatalogItems = async () => {
    const { data, error } = await client
      .from("catalog")
      .select(
        "id, name, price, date, manufacturer, photo, type, battery_type, pixels, max_FPS_video, max_FPS_photo, max_sensitivity, max_resolution, min_sensitivity, wi_fi, card_support, matrix_type, matrix_size, popularity, rating, warranty, in_stock, item_code, is_visible, reviews"
      );
    if (error) {
      const { toast, message } = toastHandler(error.code);
      showErrorToast(toast, message);
    } else {
      catalogItems.value = data;
      loaded.value = true;
    }
  };

  const selectedItem: Ref<CatalogItem | null> = ref(null);

  const fetchSelectedItem = async (id: string | string[]) => {
    if (catalogItems.value?.length === 0) {
      fetchCatalogItems();
    }

    const { data, error } = await client
      .from("catalog")
      .select(
        "id, name, price, date, manufacturer, photo, type, battery_type, pixels, max_FPS_video, max_FPS_photo, max_sensitivity, max_resolution, min_sensitivity, wi_fi, card_support, matrix_type, matrix_size, popularity, rating, warranty, in_stock, item_code, is_visible, reviews"
      )
      .eq("id", Number(id));
    if (error) {
      const { toast, message } = toastHandler(error.code);
      showErrorToast(toast, message);
    }
    if (data?.length) {
      selectedItem.value = data[0];
    } else {
      const { toast, message } = toastHandler("item-not-found");
      showErrorToast(toast, message);
    }
  };

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
    if (!filteredByPrice.value) {
      return [];
    }
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
        label: "Manufacturer",
        value: manufacturers.value,
        category: "manufacturer",
      },
      {
        label: "Camera type",
        value: types.value,
        category: "type",
      },
      {
        label: "Matrix type",
        value: matrixTypes.value,
        category: "matrix_type",
      },
      {
        label: "Matrix size",
        value: matrixSizes.value,
        category: "matrix_size",
      },
      {
        label: "Pixels",
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
      if (flag) {
        return curItem;
      }
      return false;
    });
  });

  const selectItem = (value: string, category: string) => {
    currentPage.value = 0;
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
    sortValue,
    sortOrder,
    updateSort,
    sortedItems,
    selectedOptions,
    filteringOptions,
    selectedItems,
    selectItem,
    loaded,
  };
});
