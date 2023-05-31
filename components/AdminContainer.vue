<template>
  <section class="w-full lg:ml-10 ml-5" ref="scrollEl">
    <AdminPanel />
    <div class="columns-1">
      kjafefee
      <CatalogTable />
      <BasePagination :targetRef="scrollEl" />
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollEl = ref(null);
</script>

<style scoped></style>
