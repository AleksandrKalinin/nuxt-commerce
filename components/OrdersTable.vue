<template>
  <BaseTable
    v-if="data?.length"
    :header="ORDERS_HEADER"
    :data="data"
    :shadowed="true"
  ></BaseTable>
  <div v-else class="preloader-wrapper">
    <img
      class="w-16"
      src="~/assets/icons/oval.svg"
      alt="preloader"
      loading="eager"
    />
  </div>
</template>

<script setup lang="ts">
import { useOrdersStore } from "~/store/orders";

const store = useOrdersStore();

const ORDERS_HEADER = [
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
    type: "select",
    options: ["Pending", "Completed", "Cancelled"],
    action: store.updateOrderStatus,
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
