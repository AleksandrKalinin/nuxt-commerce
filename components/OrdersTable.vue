<template>
  <BaseTable
    v-if="ordersData?.length"
    :header="ORDERS_HEADER"
    :data="ordersData"
    :shadowed="true"
    :sortable="true"
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
import { usePaginationStore } from "~/store/pagination";
import { ORDERS_HEADER } from "~/constants/orders";

const client = useSupabaseClient();

const pagesStore = usePaginationStore();

const { currentPage } = storeToRefs(pagesStore);
const store = useOrdersStore();

const { orders } = storeToRefs(store);
const { fetchOrders, updateOrderStatus } = store;

const emitOptions = ["updateOrderStatus"];

const start = computed(() => {
  return currentPage.value * 12;
});

const end = computed(() => {
  return (currentPage.value + 1) * 12;
});

const currentOrders = computed(() => {
  return orders.value?.slice(start.value, end.value);
});

const ordersData = computed(() => {
  return currentOrders.value?.slice(start.value, end.value).map((item) => {
    return {
      id: item.id,
      created_at: item.created_at,
      user: item.user,
      total: item.total,
      status: item.status,
    };
  });
});

onMounted(() => {
  fetchOrders();
  client
    .channel("table-db-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "orders" },
      () => fetchOrders()
    )
    .subscribe();
});
</script>

<style scoped></style>
