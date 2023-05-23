<template>
  <Transition>
    <div class="p-5 border sky-blue-400 max-w-[300px] mx-auto">
      <div class="flew w-60 h-36">
        <img class="w-fit h-full mx-auto object-cover" :src="item.photo" />
      </div>
      <div class="py-5">
        <h2
          class="text-lg flex justify-between items-center font-semibold py-2"
        >
          <NuxtLink :to="itemRoute">{{ item.name }} </NuxtLink
          ><span class="">{{ item.price }}$</span>
        </h2>
        <p class="text-base mb-4">{{ item.type }}</p>
        <button
          class="transition duration-200 hover:bg-sky-500 text-lg px-7 mx-auto py-2 bg-sky-400 text-white rounded-none"
          @click="cartStore.addToCart(item.id)"
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

const props = defineProps(["item"]);

const itemRoute = computed(() => {
  return "/catalog/" + props.item.id;
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
