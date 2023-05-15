<template>
  <div class="container mx-auto py-10 flex">
    <section class="w-full">
      <div class="columns-1">
        <SelectedItem />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const id = ref(useRoute().params.id);
</script>

<style scoped></style>
