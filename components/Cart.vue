<template>
  <template v-if="cartItems.length">
    <BaseTable :header="header" :data="cartItems" />
    <div
      class="price-panel flex justify-between items-center py-5 max-lg:flex-col"
    >
      <div
        class="price-panel__item price-item flex justify-between items-center w-1/5 max-lg:w-full max-lg:mb-4 p-5 border border-slate-200"
      >
        <span class="price-item__category">Discount</span>
        <span class="price-item__sum font-semibold text-2xl">$0.00</span>
      </div>
      <div
        class="price-panel__item price-item flex justify-between items-center w-1/5 max-lg:w-full max-lg:mb-4 p-5 border border-slate-200"
      >
        <span class="price-item__category">Delivery</span>
        <span class="price-item__sum font-semibold text-2xl">$0.00</span>
      </div>
      <div
        class="price-panel__item price-item flex justify-between items-center w-1/5 max-lg:w-full max-lg:mb-4 p-5 border border-slate-200"
      >
        <span class="price-item__category">Subtotal</span>
        <span class="price-item__sum font-semibold text-2xl">$0.00</span>
      </div>
      <div
        class="price-panel__item price-item flex justify-between items-center w-1/5 max-lg:w-full max-lg:mb-4 p-5 border border-slate-200"
      >
        <span class="price-item__category">Total</span>
        <span class="price-item__sum font-semibold text-2xl"
          >${{ cartStore.totalSum }}</span
        >
      </div>
    </div>
    <div class="py-5 flex flex-row justify-end items-center">
      <button
        class="transition duration-200 hover:bg-sky-500 text-lg px-7 py-3 bg-sky-400 text-white rounded-none flex items-center"
        @click="cartStore.placeOrder()"
      >
        <img src="~/assets/shopping-bag.svg" class="h-6 w-6 mr-2" />
        Оформить заказ
      </button>
    </div>
  </template>

  <div
    v-else
    class="w-full h-80 flex flex-col justify-center items-center text-2xl"
  >
    <div class="flex justify-center items-center mb-6">
      <p class="text-2xl">Your cart is empty</p>
      <div class="w-16 h-16 ml-2">
        <img src="~/assets/sad.svg" class="w-full" />
      </div>
    </div>
    <NuxtLink
      to="/catalog"
      class="transition duration-200 hover:bg-sky-500 text-lg px-7 mx-auto py-2 bg-sky-400 text-white rounded-none"
      >Back to catalog</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "~/store/cart";

const cartStore = useCartStore();

const cartItems = computed(() => {
  return cartStore.cartItems;
});

const setAmount = (e: Event, id: number) => {
  const target = e.target as HTMLInputElement;
  const val = Number(target.value);
  cartStore.updateAmount(val, id);
};

const deleteItem = (id: number) => {
  cartStore.deleteItem(id);
};

const header = [
  {
    label: "Фото",
    value: "photo",
    type: "image",
  },
  {
    label: "Товар",
    value: "name",
    type: "plain",
  },
  {
    label: "Цена",
    value: "price",
    type: "plain",
  },
  {
    label: "Кол-во",
    value: "amount",
    type: "number",
    action: setAmount,
  },
  {
    label: "Всего",
    value: "total",
    type: "plain",
  },
  {
    label: "",
    value: "_nuxt/assets/delete.svg",
    type: "icon",
    action: deleteItem,
  },
];

onMounted(() => {
  cartStore.getCartItems();
});
</script>

<style scoped></style>
