<template>
  <BaseTable :header="header" :data="cartItems" />
  <div class="py-5 flex flex-row justify-end items-center">
    <p class="font-bold text-2xl mr-5">
      Total: {{ cartStore.totalSum }}
      <button
        class="text-lg px-7 py-2 bg-sky-400 text-white rounded-none"
        @click="cartStore.addToCart(1)"
      >
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
    value: "",
    type: "icon",
    action: deleteItem,
    iconUrl: "./delete.svg",
  },
];
</script>

<style scoped></style>
