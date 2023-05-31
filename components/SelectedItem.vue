<template>
  <section
    class="w-full lg:ml-10 bg-white border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg"
    v-if="selectedItem"
  >
    <div class="w-full flex justify-between mb-5 bg-white">
      <div class="p-5">
        <img
          class="min-w-[300px] w-[300px] h-auto object-cover"
          :src="selectedItem.photo"
        />
      </div>
      <div class="w-full p-5">
        <h1 class="text-3xl font-semibold mb-2">{{ selectedItem.name }}</h1>
        <p class="mb-3">
          <span class="text-xl font-semibold">Производитель:</span>
          {{ selectedItem.manufacturer }}
        </p>
        <p class="mb-3">
          <span class="text-xl font-semibold">Гарантия:</span>
          {{ selectedItem.warranty }} месяцев
        </p>
        <p class="mb-3">
          <span class="text-xl font-semibold">{{
            selectedItem.in_stock ? "Есть в наличии" : "Нет в наличии"
          }}</span>
        </p>
        <button
          class="mt-5 text-lg px-7 py-2 hover:bg-sky-500 bg-sky-400 text-white flex items-center justify-center"
        >
          <img class="w-6 h-6 mr-2 icon" src="~/assets/bag.svg" />
          Добавить в корзину
        </button>
      </div>
    </div>
    <div class="tabs-header w-full flex">
      <div
        class="min-w-[180px] h-16 px-4 flex items-center justify-center cursor-pointer text-center text-lg bg-slate-200 text-slate-400 transition duration-100"
        :class="currentTab === 'description' ? 'tab_active' : ''"
        value="description"
        @click="setTab($event)"
      >
        <img class="w-8 mr-2" src="~/assets/data.svg" />
        Характеристики
      </div>
      <div
        class="min-w-[180px] h-16 px-4 flex items-center justify-center cursor-pointer text-center text-lg bg-slate-200 text-slate-400 transition duration-100"
        :class="currentTab === 'reviews' ? 'tab_active' : ''"
        value="reviews"
        @click="setTab($event)"
      >
        <img class="w-8 mr-2" src="~/assets/chat.svg" />Отзывы
        <span class="pl-1"
          >({{
            selectedItem.reviews?.length ? selectedItem.reviews?.length : 0
          }})</span
        >
      </div>
    </div>
    <KeepAlive>
      <component
        :is="currentTabComponent"
        :selectedItem="selectedItem"
        :selectedProperties="selectedProperties"
      />
    </KeepAlive>
    <Gallery :items="galleryItems" />
  </section>
</template>

<script setup lang="ts">
import { useCatalogStore } from "~/store/catalog";
const id = useRoute().params.id;
const props = defineProps(["item"]);
const catalogStore = useCatalogStore();

const tabs = {
  description: resolveComponent("SelectedItemDescription"),
  reviews: resolveComponent("SelectedItemReviews"),
};

const currentTab: Ref<string | null> = ref("description");

const currentTabComponent = computed(() => {
  return tabs[currentTab.value as keyof SelectedItemTabs];
});

const setTab = (e: Event) => {
  const target = e.currentTarget as HTMLElement;
  currentTab.value = target.getAttribute("value");
};

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

const galleryItems = computed(() => {
  const random = Math.floor(
    Math.random() * (catalogStore.visibleItems?.length! - 6) + 1
  );
  return catalogStore.visibleItems?.slice(random, random + 7);
});

onMounted(() => {
  catalogStore.fetchSelectedItem(id);
});
</script>

<style scoped>
.tab_active {
  background-color: #ffffff;
  color: #000000;
}

.tab_active img {
  -webkit-filter: invert(0.1);
  filter: invert(0.1);
}

.icon {
  color: #ffffff;
}
</style>
