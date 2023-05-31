<template>
  <NuxtErrorBoundary>
    <OrdersTable />
    <template #error="{ error }">
      <div class="flex flex-col items-center w-full pt-[50px]">
        <p class="mb-3 text-xl">
          An error occured when loading orders
          <code>{{ error }}</code>
        </p>
        <p class="py-3">
          <button
            class="transition duration-200 hover:bg-sky-500 text-lg px-7 mx-auto py-2 bg-sky-400 text-white border"
            @click="clearError(error)"
          >
            Back to catalog
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
