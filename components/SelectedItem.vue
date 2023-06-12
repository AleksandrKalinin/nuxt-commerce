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
        <p class="mb-1 flex items-center">
          <span class="pr-2 font-semibold text-lg">{{ averageRating }}</span>
          <star-rating
            v-model:rating="averageRating"
            read-only
            star-size="20"
            show-rating="false"
          />
          <span class="text-base pl-4">
            {{ ratings?.length ? ratings.length : "No" }}
            <span>ratings</span>
          </span>
        </p>
        <p class="mb-1">
          <span class="text-lg font-semibold">Manufacturer:</span>
          {{ selectedItem.manufacturer }}
        </p>
        <p class="mb-1">
          <span class="text-lg font-semibold">Warranty:</span>
          {{ selectedItem.warranty }} month
        </p>
        <p class="mb-1 mt-4 flex items-center">
          <span class="text-2xl font-semibold"
            >{{ selectedItem.price }}
            <span class="uppercase font-normal text-base">Usd</span>
          </span>
        </p>
        <p class="mb-2 flex items-center text-base text-zinc-400">
          <img
            class="w-5 h-5 mr-2"
            src="~/assets/icons/check.svg"
            alt="In stock"
            loading="eager"
          />
          <span>{{
            selectedItem.in_stock ? "In stock" : "Not available"
          }}</span>
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
    <RatingsSummary
      :average-rating="averageRating"
      :description-rating="descriptionRating"
      :quality-rating="qualityRating"
      :price-rating="valueRating"
      :reviews="reviews"
    />
    <div class="tabs">
      <div
        class="tabs-item"
        :class="currentTab === 'description' ? 'tab_active' : ''"
        value="description"
        @click="setTab($event)"
      >
        <img
          class="w-8 mr-2 max-sm:hidden"
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
          class="w-8 mr-2 max-sm:hidden"
          src="~/assets/icons/chat.svg"
          alt="Reviews"
          loading="eager"
        />Reviews
        <span class="pl-1 max-sm:font-base"
          >({{ reviews?.length ? reviews?.length : 0 }})</span
        >
      </div>
    </div>
    <KeepAlive>
      <Transition name="fade" mode="out-in">
        <component
          :is="currentTabComponent"
          :selected-item="selectedItem"
          :selected-properties="SELECTED_ITEM_PROPERTIES"
          :reviews="reviews"
        />
      </Transition>
    </KeepAlive>
    <Gallery :items="galleryItems" />
  </section>
  <SelectedItemSkeleton v-else />
</template>

<script async setup lang="ts">
import { storeToRefs } from "pinia";
import StarRating from "vue-star-rating";
import { useCatalogStore } from "~/store/catalog";
import { useRatingsStore } from "~/store/ratings";
import { SELECTED_ITEM_PROPERTIES } from "~/constants/selectedItem";

defineProps<{
  item: CatalogItem;
}>();

const catalogStore = useCatalogStore();
const ratingsStore = useRatingsStore();

const { selectedItem, visibleItems } = storeToRefs(catalogStore);
const { ratings } = storeToRefs(ratingsStore);

const { fetchSelectedItem, fetchCatalogItems } = catalogStore;
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

watch(selectedItem, () => {
  if (selectedItem.value) {
    fetchRating(selectedItem.value?.id);
  }
});

const galleryItems = computed(() => {
  let random = 0;
  if (visibleItems.value) {
    random = Math.floor(Math.random() * (visibleItems.value.length - 6) + 1);
    return visibleItems.value.slice(random, random + 7);
  } else return [];
});

const averageRating = computed(() => {
  if (ratings.value?.length) {
    return (
      ratings.value?.reduce((sum, item) => {
        return (sum += JSON.parse(item.rating).overall);
      }, 0) / ratings.value?.length
    ).toFixed(1);
  } else {
    return 0;
  }
});

const valueRating = computed(() => {
  if (ratings.value?.length) {
    return (
      (ratings.value?.reduce((sum, item) => {
        return (sum += JSON.parse(item.rating).value);
      }, 0) /
        ratings.value?.length) *
      20
    ).toFixed(1);
  } else {
    return 0;
  }
});

const qualityRating = computed(() => {
  if (ratings.value?.length) {
    return (
      (ratings.value?.reduce((sum, item) => {
        return (sum += JSON.parse(item.rating).quality);
      }, 0) /
        ratings.value?.length) *
      20
    ).toFixed(1);
  } else {
    return 0;
  }
});

const descriptionRating = computed(() => {
  if (ratings.value?.length) {
    return (
      (ratings.value?.reduce((sum, item) => {
        return (sum += JSON.parse(item.rating).description);
      }, 0) /
        ratings.value?.length) *
      20
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
      review.rating = JSON.parse(item.rating);
      return review;
    });
  } else {
    return [];
  }
});

onMounted(() => {
  fetchCatalogItems();
  if (id) {
    fetchSelectedItem(id);
  }
});
</script>

<style lang="css">
.selected-item {
  @apply lg:ml-10 lg:w-[calc(100%-300px)] bg-white border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg;
}

.selected-item__info {
  @apply w-full flex justify-between mb-5 bg-white max-sm:flex-col border-b-2 border-zinc-200;
}

.selected-item__image {
  @apply min-w-[300px] w-[300px] h-auto object-cover max-md:min-w-[200px] max-md:w-[200px];
}

.selected-item__name {
  @apply text-3xl font-semibold mb-2;
}

.tabs {
  @apply w-full flex;
}

.tabs-item {
  @apply min-w-[180px] h-16 px-4 flex max-sm:min-w-[130px] max-sm:px-2 items-center justify-center cursor-pointer text-center text-lg bg-slate-200 text-slate-400 transition duration-100;
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
