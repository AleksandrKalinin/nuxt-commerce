<template>
  <BaseTable :header="header" :data="data" />
  <div class="py-5 flex flex-row justify-end items-center">
    <p class="font-bold text-2xl mr-5">Total: 1234</p>
    <button class="text-lg px-7 py-2 bg-sky-400 text-white rounded-none">
      Оформить заказ
    </button>
  </div>
</template>

<script setup lang="ts">
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
    type: "plain",
  },
  {
    label: "Всего",
    value: "total",
    type: "plain",
  },
];
const data = [
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    price: 1200,
    amount: 1,
    total: 1200,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    price: 1200,
    amount: 1,
    total: 1200,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    price: 1200,
    amount: 1,
    total: 1200,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    price: 1200,
    amount: 1,
    total: 1200,
  },
];
</script>

<style scoped></style>
