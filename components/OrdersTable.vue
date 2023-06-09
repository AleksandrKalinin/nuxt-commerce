<template>
  <BaseTable
    v-if="data?.length"
    :header="ORDERS_HEADER"
    :data="data"
    :shadowed="true"
    :emit-options="emitOptions"
    @update-order-status="updateOrderStatus"
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
import { storeToRefs } from "pinia";
import { useOrdersStore } from "~/store/orders";
import { ORDERS_HEADER } from "~/constants/orders";

const store = useOrdersStore();
const { orders: data } = storeToRefs(store);
const { fetchOrders, updateOrderStatus } = store;

const emitOptions = ["updateOrderStatus"];

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped></style>
