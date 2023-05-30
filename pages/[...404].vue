<template>
  <section class="w-full h-[calc(100vh-80px)] flex justify-center items-center">
    <div class="w-[500px] h-[300px] flex flex-col items-center text-center">
      <img src="~/assets/face-frown.svg" class="w-36 h-36 mb-2" />
      <h1 class="text-4xl text-slate-400 mb-2">Page not found</h1>
      <p class="text-slate-400 text-xl mb-5">
        The page you are looking for does not exist.
      </p>
      <NuxtLink to="/catalog">
        <button
          class="transition duration-200 hover:bg-sky-500 text-lg px-7 mx-auto py-2 bg-sky-400 text-white"
        >
          Go to catalog
        </button>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
