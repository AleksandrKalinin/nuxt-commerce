<template>
  <div
    class="container mx-auto py-10 flex min-h-[calc(100vh-160px)] max-lg:flex-col max-lg:px-3"
  >
    <AdminSidebar />
    <section class="w-full lg:ml-10" ref="scrollEl">
      <AdminPanel />
      <div class="columns-1">
        <OrdersTable />
        <BasePagination :items="store.orders" :targetRef="scrollEl" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useOrdersStore } from "~/store/orders";

const store = useOrdersStore();
const scrollEl = ref(null);
</script>

<style scoped></style>
