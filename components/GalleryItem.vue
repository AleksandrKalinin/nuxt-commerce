<template>
  <div class="gallery__item gallery-item">
    <div class="m-w-full h-36">
      <img class="gallery-item__image" :src="item.photo" loading="eager" />
    </div>
    <div class="py-5">
      <h2 class="gallery-item__title">
        <NuxtLink :to="itemRoute">{{ item.name }} </NuxtLink
        ><span class="">{{ item.price }}$</span>
      </h2>
      <p class="text-base mb-4">{{ item.type }}</p>
      <button class="button_regular button_centered">Add to cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: CatalogItem;
}>();

const item = computed(() => {
  return props.item;
});

const itemRoute = computed(() => {
  return "/catalog/" + props.item.id;
});
</script>

<style scoped lang="css">
.gallery__item {
  @apply p-5 border max-w-[300px] w-full mx-auto;
}

.gallery-item__image {
  @apply w-fit h-full mx-auto object-cover;
}

.gallery-item__title {
  @apply text-lg flex justify-between items-center font-semibold py-2;
}
</style>
