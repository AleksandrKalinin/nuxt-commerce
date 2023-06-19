<template>
  <Transition>
    <div class="catalog__item catalog-item">
      <div class="catalog-item__image">
        <img
          class="catalog-item__picture"
          :src="item.photo"
          :alt="item.name"
          loading="eager"
        />
      </div>
      <div class="py-5">
        <h2 class="catalog-item__title">
          <NuxtLink :to="itemRoute">{{ item.name }} </NuxtLink>
        </h2>
        <p class="text-base mb-1">{{ item.type }}</p>
        <p class="text-2xl mb-1 font-bold">
          {{ item.price }} <span class="text-base font-normal">USD</span>
        </p>
        <p class="catalog-item__orders catalog-orders">
          <Icon
            name="heroicons:check"
            class="catalog-orders__icon"
            color="green"
          />
          {{ item.in_stock > 0 ? "In stock" : "Not available" }}
        </p>
        <button
          class="button_regular button_centered"
          @click="addToCart(item.id)"
        >
          Add to cart
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useCartStore } from "~/store/cart";
const cartStore = useCartStore();
const { addToCart } = cartStore;

const props = defineProps<{
  item: CatalogItem;
}>();

const itemRoute = computed(() => {
  return "/catalog/" + props.item.id;
});
</script>

<style scoped lang="css">
.catalog__item {
  @apply p-5 border max-w-[300px] mx-auto bg-white border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg;
}

.catalog-item__image {
  @apply flex w-60 h-36;
}

.catalog-item__picture {
  @apply w-fit h-full mx-auto object-cover;
}

.catalog-item__title {
  @apply flex justify-between items-center text-lg font-normal;
}

.catalog-item__orders {
  @apply text-base mb-4 flex items-center text-zinc-400;
}

.catalog-orders__icon {
  @apply w-5 h-5 mr-1 text-zinc-400;
}

.catalog-orders__icon svg {
  @apply text-zinc-400;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
