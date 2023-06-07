<template>
  <section v-if="selectedItem" class="selected-item">
    <div class="selected-item__info">
      <div class="p-5">
        <img
          class="selected-item__image"
          :src="selectedItem.photo"
          :alt="selectedItem.name"
          loading="eager"
        />
      </div>
      <div class="w-full p-5">
        <h1 class="selected-item__name">{{ selectedItem.name }}</h1>
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
        <button class="button_regular">
          <img
            class="button__image icon"
            src="~/assets/icons/bag.svg"
            alt="Корзина"
            loading="eager"
          />
          Добавить в корзину
        </button>
      </div>
    </div>
    <div class="tabs">
      <div
        class="tabs-item"
        :class="currentTab === 'description' ? 'tab_active' : ''"
        value="description"
        @click="setTab($event)"
      >
        <img
          class="w-8 mr-2"
          src="~/assets/icons/data.svg"
          alt="Характеристики"
          loading="eager"
        />
        Характеристики
      </div>
      <div
        class="tabs-item"
        :class="currentTab === 'reviews' ? 'tab_active' : ''"
        value="reviews"
        @click="setTab($event)"
      >
        <img
          class="w-8 mr-2"
          src="~/assets/icons/chat.svg"
          alt="Отзывы"
          loading="eager"
        />Отзывы
        <span class="pl-1"
          >({{
            selectedItem.reviews?.length ? selectedItem.reviews?.length : 0
          }})</span
        >
      </div>
    </div>
    <KeepAlive>
      <Transition name="fade" mode="out-in">
        <component
          :is="currentTabComponent"
          :selected-item="selectedItem"
          :selected-properties="selectedProperties"
        />
      </Transition>
    </KeepAlive>
    <Gallery :items="galleryItems" />
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCatalogStore } from "~/store/catalog";

defineProps<{
  item: CatalogItem;
}>();

const catalogStore = useCatalogStore();

const { selectedItem, visibleItems } = storeToRefs(catalogStore);
const { fetchSelectedItem } = catalogStore;

const id = useRoute().params.id;

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
    label: "Name",
    value: "name",
  },
  {
    label: "Price",
    value: "price",
  },
  {
    label: "Date",
    value: "date",
  },
  {
    label: "Manufacturer",
    value: "manufacturer",
  },
  {
    label: "Type",
    value: "type",
  },
  {
    label: "Battery type",
    value: "battery_type",
  },
  {
    label: "Pixels number",
    value: "pixels",
  },
  {
    label: "FPS",
    value: "max_FPS_video",
  },
  {
    label: "Max sensitivity",
    value: "max_sensitivity",
  },
  {
    label: "Min sensitivity",
    value: "min_sensitivity",
  },
  {
    label: "Wi-fi",
    value: "wi_fi",
  },
  {
    label: "Card support",
    value: "card_support",
  },
  {
    label: "Matrix type",
    value: "matrix_type",
  },
  {
    label: "Matrix size",
    value: "matrix_size",
  },
];

const galleryItems = computed(() => {
  let random = 0;
  if (visibleItems.value) {
    random = Math.floor(Math.random() * (visibleItems.value.length - 6) + 1);
    return visibleItems.value.slice(random, random + 7);
  } else return [];
});

onMounted(() => {
  fetchSelectedItem(id);
});
</script>

<style scoped lang="css">
.selected-item {
  @apply lg:ml-10 lg:w-[calc(100%-300px)] bg-white border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg;
}

.selected-item__info {
  @apply w-full flex justify-between mb-5 bg-white;
}

.selected-item__image {
  @apply min-w-[300px] w-[300px] h-auto object-cover;
}

.selected-item__name {
  @apply text-3xl font-semibold mb-2;
}

.tabs {
  @apply w-full flex;
}

.tabs-item {
  @apply min-w-[180px] h-16 px-4 flex items-center justify-center cursor-pointer text-center text-lg bg-slate-200 text-slate-400 transition duration-100;
}

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
