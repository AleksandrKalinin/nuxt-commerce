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
        <p class="mb-3 flex items-center">
          <span class="pr-2 font-semibold text-lg">{{ averageRating }}</span>
          <star-rating
            v-model:rating="averageRating"
            read-only
            star-size="20"
            show-rating="false"
          />
          <span class="text-lg pl-4">
            {{ ratings?.length ? ratings.length : "No" }} <span>ratings</span>
          </span>
        </p>
        <p class="mb-3">
          <span class="text-xl font-semibold">Manufacturer:</span>
          {{ selectedItem.manufacturer }}
        </p>
        <p class="mb-3">
          <span class="text-xl font-semibold">Warranty:</span>
          {{ selectedItem.warranty }} month
        </p>
        <p class="mb-3 flex items-center">
          <span class="text-lg">{{
            selectedItem.in_stock ? "In stock" : "Not available"
          }}</span>
          <span class="ml-5 text-2xl font-semibold"
            >${{ selectedItem.price }}</span
          >
        </p>
        <button
          class="button_regular disabled:bg-gray-200"
          :disabled="selectedItem.in_stock < 0 ? true : false"
          show-rating="false"
        >
          <img
            class="button__image icon"
            src="~/assets/icons/bag.svg"
            alt="Корзина"
            loading="eager"
          />
          Add to cart
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
          alt="Description"
          loading="eager"
        />
        Description
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
          alt="Reviews"
          loading="eager"
        />Reviews
        <span class="pl-1">({{ reviews?.length ? reviews?.length : 0 }})</span>
      </div>
    </div>
    <KeepAlive>
      <Transition name="fade" mode="out-in">
        <component
          :is="currentTabComponent"
          :selected-item="selectedItem"
          :selected-properties="selectedProperties"
          :reviews="reviews"
        />
      </Transition>
    </KeepAlive>
    <Gallery :items="galleryItems" />
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import StarRating from "vue-star-rating";
import { useCatalogStore } from "~/store/catalog";
import { useRatingsStore } from "~/store/ratings";

defineProps<{
  item: CatalogItem;
}>();

const catalogStore = useCatalogStore();
const ratingsStore = useRatingsStore();

const { selectedItem, visibleItems } = storeToRefs(catalogStore);
const { ratings } = storeToRefs(ratingsStore);

const { fetchSelectedItem } = catalogStore;
const { fetchRating } = ratingsStore;

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

watch(selectedItem, () => {
  if (selectedItem.value) {
    fetchRating(selectedItem.value?.id);
  }
});

const averageRating = computed(() => {
  if (ratings.value?.length) {
    return (
      ratings.value?.reduce((sum, item) => {
        return (sum += item.rating);
      }, 0) / ratings.value?.length
    ).toFixed(1);
  } else {
    return 0;
  }
});

const reviews = computed(() => {
  if (ratings.value) {
    return ratings.value?.map((item: Review) => {
      const review = {} as FormattedReview;
      review.id = item.id;
      review.description = item.description;
      review.author = item.author;
      review.date = item.date;
      review.rating = item.rating;
      return review;
    });
  } else {
    return [];
  }
});

onMounted(() => {
  fetchSelectedItem(id);
});
</script>

<style lang="css">
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

.vue-star-rating .vue-star-rating-star {
  display: flex;
  align-items: center;
}

.vue-star-rating .vue-star-rating-star[data-v-f675a548] {
  display: flex;
}

.vue-star-rating-star,
.vue-star-rating {
  line-height: 28px;
  max-height: 28px;
}

.vue-star-rating-rating-text {
  display: none;
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
