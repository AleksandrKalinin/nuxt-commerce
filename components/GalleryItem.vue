<template>
  <div class="p-5 border sky-blue-400 max-w-[300px] w-full mx-auto">
    <div class="m-w-full h-36">
      <img class="w-fit h-full mx-auto object-cover" :src="item.photo" />
    </div>
    <div class="py-5">
      <h2 class="text-lg flex justify-between items-center font-semibold py-2">
        <NuxtLink :to="itemRoute">{{ item.name }} </NuxtLink
        ><span class="">{{ item.price }}$</span>
      </h2>
      <p class="text-base mb-4">{{ item.type }}</p>
      <button
        class="transition duration-200 hover:bg-sky-500 text-lg px-7 mx-auto py-2 bg-sky-400 text-white rounded-none w-64"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["item"]);
const item = computed(() => {
  return props.item;
});

const itemRoute = computed(() => {
  return "/catalog/" + props.item.id;
});
</script>

<style scoped></style>
