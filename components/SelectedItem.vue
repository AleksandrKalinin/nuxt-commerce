<template>
  <section class="w-full lg:ml-10 ml-5" v-if="selectedItem">
    <div class="w-full flex justify-between mb-5">
      <div class="w-96 p-5">
        <img :src="selectedItem.photo" />
      </div>
      <div class="w-full p-5">
        <h1 class="text-lg mb-2">{{ selectedItem.name }}</h1>
        <p class="mb-2">Производитель: {{ selectedItem.manufacturer }}</p>
        <p class="mb-2">
          Гарантия:
          {{ "12 месяцев" }}
        </p>
        <p class="mb-2">Есть в наличии</p>
        <button
          class="mt-5 text-lg px-7 mx-auto py-2 bg-sky-400 text-white rounded-none"
        >
          Добавить в корзину
        </button>
      </div>
    </div>
    <table
      class="w-full border-separate border-spacing-2 border sky-blue-400 py-5 px-3"
    >
      <tbody>
        <tr
          v-for="(item, key) in selectedProperties"
          :key="key"
          class="text-left"
        >
          <th class="py-4">
            {{ item.label }}
          </th>
          <td class="py-4">
            {{ selectedItem[item.value as keyof CatalogItem] }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { useCatalogStore } from "~/store/catalog";
const id = useRoute().params.id;
const props = defineProps(["item"]);
const catalogStore = useCatalogStore();

const selectedProperties = [
  {
    label: "Наименование",
    value: "name",
  },
  {
    label: "Цена",
    value: "price",
  },
  {
    label: "Дата",
    value: "date",
  },
  {
    label: "Производитель",
    value: "manufacturer",
  },
  {
    label: "Тип устройства",
    value: "type",
  },
  {
    label: "Тип батареи",
    value: "battery_type",
  },
  {
    label: "Кол-во пикселей",
    value: "pixels",
  },
  {
    label: "Кол-во кадров в секунду",
    value: "max_FPS_video",
  },
  {
    label: "Максимальная чувствительность",
    value: "max_sensitivity",
  },
  {
    label: "Минимальная чувствительность",
    value: "min_sensitivity",
  },
  {
    label: "Wi-fi",
    value: "wi_fi",
  },
  {
    label: "Поддержка карт памяти",
    value: "card_support",
  },
  {
    label: "Тип матрицы",
    value: "matrix_type",
  },
  {
    label: "Размер матрицы",
    value: "matrix_size",
  },
];

const selectedItem = computed<CatalogItem>((): CatalogItem => {
  return catalogStore.selectedItem as unknown as CatalogItem;
});

onMounted(() => {
  catalogStore.fetchSelectedItem(id);
});
</script>

<style scoped></style>
