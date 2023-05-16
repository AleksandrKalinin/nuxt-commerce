<template>
  <aside class="w-96 border sky-blue-400">
    <div
      v-for="item in filteringOptions"
      class="filter-section border-b-1 sky-blue-400 p-5"
    >
      <h3 class="filter-section__title text-xl font-semibold mb-3">
        {{ item.label }}
      </h3>
      <div class="filter-section__list filter-list">
        <div class="filter-list__option flex flex-col">
          <label v-for="option in item.value" class="flex items-center py-2"
            ><input
              type="checkbox"
              class="mr-2 w-7 h-7"
              v-model="option.selected"
              @change="selectItem(option.label, item.category)"
            />{{ option.label }}</label
          >
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useCatalogStore } from "~/store/catalog";
const store = useCatalogStore();

const manufacturers = computed(() => {
  const labels = [
    ...new Set(store.catalogItems.map((item) => item.manufacturer)),
  ].map((label) => {
    const obj = {};
    obj.label = label;
    obj.selected = false;
    return obj;
  });
  return labels;
});

const types = computed(() => {
  const labels = [...new Set(store.catalogItems.map((item) => item.type))].map(
    (label) => {
      const obj = {};
      obj.label = label;
      obj.selected = false;
      return obj;
    }
  );
  return labels;
});

const matrixTypes = computed(() => {
  const labels = [
    ...new Set(store.catalogItems.map((item) => item.matrix_type)),
  ].map((label) => {
    const obj = {};
    obj.label = label;
    obj.selected = false;
    return obj;
  });
  return labels;
});

const matrixSizes = computed(() => {
  const labels = [
    ...new Set(store.catalogItems.map((item) => item.matrix_size)),
  ].map((label) => {
    const obj = {};
    obj.label = label;
    obj.selected = false;
    return obj;
  });
  return labels;
});

const matrixPixels = computed(() => {
  const labels = [
    ...new Set(store.catalogItems.map((item) => item.pixels)),
  ].map((label) => {
    const obj = {};
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

/*
const filteredItems = computed(() => {
  console.log(selectedOptions);
  return store.catalogItems.map((curItem) => {
    for (const key in selectedOptions) {
      const values = selectedOptions[key];
      if (values.length) {
        if (!values.includes(curItem[key])) {
          return false;
        }
      }
    }
    return curItem;
  });
});
*/

const selectedOptions = {
  manufacturer: [],
  type: [],
  matrix_type: [],
  matrix_size: [],
  pixels: [],
};

const selectItem = (value, category) => {
  if (selectedOptions[category].includes(value)) {
    selectedOptions[category] = selectedOptions[category].filter(
      (item) => item !== value
    );
  } else {
    selectedOptions[category].push(value);
  }
};
</script>

<style scoped></style>
