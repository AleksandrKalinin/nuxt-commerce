<template>
  <div
    class="container mx-auto py-10 flex min-h-[calc(100vh-160px)] max-lg:flex-col"
  >
    <Sidebar />
    <SelectedItem />
  </div>
</template>

<script setup lang="ts">
const id = ref(useRoute().params.id);
</script>

<style scoped></style>
