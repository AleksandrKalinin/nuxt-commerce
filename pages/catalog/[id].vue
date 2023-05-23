<template>
  <div class="container mx-auto py-10 flex">
    <Sidebar />
    <SelectedItem />
  </div>
</template>

<script setup lang="ts">
const id = ref(useRoute().params.id);
</script>

<style scoped></style>
