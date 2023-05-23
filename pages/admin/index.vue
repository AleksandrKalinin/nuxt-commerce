<template>
  <div class="container mx-auto py-10 flex">
    <AdminSidebar />
    <section class="w-full lg:ml-10 ml-5">
      <AdminPanel />
      <div class="columns-1">
        <CatalogTable />
        <BasePagination :items="store.catalogItems" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useCatalogStore } from "~/store/catalog";
const store = useCatalogStore();
</script>

<style scoped></style>
