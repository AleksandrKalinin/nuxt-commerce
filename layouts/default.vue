<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>
<script setup>
const route = useRoute();
useHead(() => ({
  link: [
    {
      rel: "canonical",
      href: "/catalog",
    },
  ],
}));
</script>
