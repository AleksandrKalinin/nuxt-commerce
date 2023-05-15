<template>
  <div class="p-5 border sky-blue-400 mb-5 max-w-[300px]">
    <div class="flew lg:w-60 lg:h-36 w-40 h-24">
      <img class="w-fit h-full mx-auto object-cover" :src="item.photo" />
    </div>
    <div class="py-5">
      <h2 class="text-lg flex justify-between items-center font-semibold py-2">
        <NuxtLink :to="itemRoute">{{ item.name }} </NuxtLink
        ><span class="">{{ item.price }}$</span>
      </h2>
      <p class="text-base mb-4">{{ item.type }}</p>
      <button
        class="text-lg px-7 mx-auto py-2 bg-sky-400 text-white rounded-none"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["item"]);

const itemRoute = computed(() => {
  return "/" + 1;
});
</script>

<style scoped></style>
