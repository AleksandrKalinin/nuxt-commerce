<template>
  <div class="container w-full mx-auto py-10 flex min-h-[calc(100vh-160px)]">
    <Cabinet />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>

<style scoped></style>
