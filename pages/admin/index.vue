<template>
  <NuxtErrorBoundary>
    <CatalogTable />
    <template #error="{ error }">
      <div>
        <p>
          An error occured when loading catalog
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
  <BasePagination :items="store.catalogItems" :targetRef="scrollEl" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "admin",
});

import { useCatalogStore } from "~/store/catalog";

const clearError = async (err) => {
  await navigateTo("/admin");
  err.value = null;
};

const store = useCatalogStore();
const scrollEl = ref(null);
</script>

<style scoped></style>
