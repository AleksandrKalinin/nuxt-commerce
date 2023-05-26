<template>
  <BaseTable
    v-if="data?.length"
    :header="ORDERS_HEADER"
    :data="data"
  ></BaseTable>
  <div
    v-else
    class="preloader-wrapper flex justify-center items-center h-full w-full"
  >
    <img class="w-16" src="~/assets/oval.svg" />
  </div>
</template>

<script setup lang="ts">
import { useOrdersStore } from "~/store/orders";
import { ORDERS_HEADER } from "~/constants";

const store = useOrdersStore();

const data = computed(() => {
  return store.orders;
});

onMounted(() => {
  store.fetchOrders();
});
</script>

<style scoped></style>
