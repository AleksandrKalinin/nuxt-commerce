<template>
  <div
    class="container mx-auto py-10 flex min-h-[calc(100vh-160px)] max-lg:flex-col max-lg:px-3"
  >
    <AdminSidebar />
    <section class="w-full lg:ml-10" ref="scrollEl">
      <AdminPanel />
      <div class="columns-1">
        <CatalogTable />
        <BasePagination :items="store.catalogItems" :targetRef="scrollEl" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

import { useCatalogStore } from "~/store/catalog";

const store = useCatalogStore();
const scrollEl = ref(null);
</script>

<style scoped></style>
