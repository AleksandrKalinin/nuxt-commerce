<template>
  <div class="container mx-auto py-10 flex">
    <AdminSidebar />
    <section class="w-full lg:ml-10 ml-5">
      <AdminPanel />
      <div class="columns-1">
        <OrdersTable />
        <BasePagination :items="store.orders" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useOrdersStore } from "~/store/orders";
const store = useOrdersStore();
</script>

<style scoped></style>
