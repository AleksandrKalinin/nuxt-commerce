<template>
  <BaseTable :header="header" :data="data"></BaseTable>
</template>

<script setup lang="ts">
const header = [
  {
    label: "Название",
    value: "name",
    type: "plain",
  },
  {
    label: "Фото",
    value: "photo",
    type: "image",
  },
  {
    label: "Артикул",
    value: "articul",
    type: "plain",
  },
  {
    label: "Остаток",
    value: "amount",
    type: "plain",
  },
  {
    label: "Видимость",
    value: "visibility",
    type: "toggle",
  },
];
const data = [
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
  {
    name: "Canon 2340",
    photo: "/images/1.jpg",
    articul: "3868746",
    amount: "12",
    visibility: true,
  },
];
</script>

<style scoped></style>
