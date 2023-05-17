<template>
  <BaseTable :header="header" :data="cartItems" />
  <div class="py-5 flex flex-row justify-end items-center">
    <p class="font-bold text-2xl mr-5">
      Total: {{ cartStore.totalSum }}
      <button class="text-lg px-7 py-2 bg-sky-400 text-white rounded-none">
        Оформить заказ
      </button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "~/store/cart";

const cartStore = useCartStore();

const cartItems = computed(() => {
  return cartStore.cartItems;
});

const setAmount = (e, id) => {
  const val = e.target.value;
  cartStore.updateAmount(val, id);
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
    callback: setAmount,
  },
  {
    label: "Всего",
    value: "total",
    type: "plain",
  },
];
</script>

<style scoped></style>
