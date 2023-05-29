<template>
  <section class="w-full h-[350px] flex relative">
    <div class="w-full h-full absolute top-0 left-0 z-1 overflow-hidden">
      <img class="w-full h-auto" src="~/assets/newsletter.jpg" />
    </div>
    <div
      class="w-full h-full object-cover absolute top-0 left-0 z-2 bg-gray-700 bg-opacity-75 flex justify-center items-center"
    >
      <div class="container mx-auto flex flex-col justify-center items-center">
        <h2
          class="text-white text-4xl tracking-wide font-semibold mb-6 max-md:text-2xl"
        >
          Subscribe to our newsletter
        </h2>
        <form @submit.prevent="subscribeToNews">
          <input
            type="text"
            placeholder="Ваш e-mail"
            class="w-[400px] max-md:w-[200px] border bg-transparent px-5 py-3 mr-3 border border-white rounded-0 text-white text-xl rounded-none"
          />
          <input
            type="submit"
            value="Отправить"
            class="transition duration-200 hover:bg-sky-500 text-xl px-7 mx-auto py-3 bg-sky-400 text-white rounded-none border border-sky-400 cursor-pointer"
          />
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const subscribeToNews = () => {};
</script>

<style scoped></style>
