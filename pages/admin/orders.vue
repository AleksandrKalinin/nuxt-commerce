<template>
  <NuxtErrorBoundary>
    <OrdersTable />
    <template #error="{ error }">
      <div>
        <p>
          An error occured when loading orders
          <code>{{ error }}</code>
        </p>
        <p>
          <button class="hover:cursor-pointer" @click="clearError(error)">
            Go back
          </button>
        </p>
      </div>
    </template>
  </NuxtErrorBoundary>
  <BasePagination :items="store.orders" :targetRef="scrollEl" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "admin",
});

import { useOrdersStore } from "~/store/orders";

const clearError = async (err) => {
  await navigateTo("/admin");
  err.value = null;
};

const store = useOrdersStore();
const scrollEl = ref(null);
</script>

<style scoped></style>
