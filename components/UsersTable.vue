<template>
  <BaseTable :header="header" :data="data" />
</template>

<script setup lang="ts">
const header = [
  {
    label: "ID",
    value: "id",
  },
  {
    label: "E-mail",
    value: "email",
  },
  {
    label: "Registered on",
    value: "registered",
  },
];
const data = [
  {
    id: 2323,
    email: "username@gmail.com",
    registered: new Date(),
  },
  {
    id: 2323,
    email: "username@gmail.com",
    registered: new Date(),
  },
];
</script>

<style scoped></style>
