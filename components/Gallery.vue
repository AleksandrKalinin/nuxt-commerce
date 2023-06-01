<template>
  <section class="py-10 bg-white" :class="`max-w-[${380 * itemsNumber}px]`">
    <div class="gallery__header flex justify-between mb-5 py-3 px-5">
      <h2 class="text-3xl font-semibold">Похожие товары</h2>
    </div>
    <carousel :items-to-show="itemsNumber" :style="maxWidth" class="mx-auto">
      <slide v-for="item in items" :key="item.id">
        <GalleryItem :item="item" />
      </slide>
      <template #addons>
        <navigation />
      </template>
    </carousel>
  </section>
</template>

<script setup lang="ts">
import { Carousel, Slide, Navigation } from "vue3-carousel";
const props = defineProps(["items"]);
const { type } = useBreakpoints();

const itemsNumber = computed(() => {
  switch (type.value) {
    case "xxl":
      return 3;
    case "xl":
      return 3;
    case "lg":
      return 1;
    default:
      return 1;
  }
});

const maxWidth = computed(() => {
  return `max-width: ${380 * itemsNumber.value}px`;
});
</script>

<style>
.carousel__prev {
  margin-left: 0;
}

.carousel__next {
  margin-right: 0;
}
</style>
