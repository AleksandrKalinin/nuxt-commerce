<template>
  <BaseTable :header="header" :data="data"></BaseTable>
</template>

<script setup lang="ts">
import { useOrdersStore } from "~/store/orders";
const store = useOrdersStore();

const header = [
  {
    label: "№",
    value: "id",
    type: "plain",
  },
  {
    label: "Дата заказа",
    value: "created_at",
    type: "plain",
  },
  {
    label: "Сумма",
    value: "total",
    type: "plain",
  },
  {
    label: "Статус",
    value: "status",
    type: "plain",
  },
];

const data = computed(() => {
  return store.orders;
});

onMounted(() => {
  store.fetchOrders();
});
</script>

<style scoped></style>
