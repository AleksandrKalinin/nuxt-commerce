<template>
  <div>Item page</div>
</template>

<script setup lang="ts">
const id = ref(useRoute().params.id);
console.log(id.value);
</script>

<style scoped></style>
