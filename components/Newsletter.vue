<template>
  <section class="newsletter">
    <div class="newsletter__bg newsletter-bg">
      <img
        class="w-full h-auto"
        src="~/assets/newsletter.jpg"
        alt="Newsletter"
        loading="lazy"
      />
    </div>
    <div class="newsletter-content newsletter__content">
      <div class="newsletter-content__description newsletter-description">
        <h2 class="newsletter-description__title">
          Subscribe to our newsletter
        </h2>
        <form @submit.prevent="subscribeToNews" class="newsletter-form">
          <input
            type="text"
            placeholder="Ваш e-mail"
            class="newsletter-form__input"
          />
          <input
            type="submit"
            value="Отправить"
            class="newsletter-form__submit"
          />
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const subscribeToNews = () => {};
</script>

<style scoped>
.newsletter {
  @apply w-full h-[350px] flex relative;
}

.newsletter__bg {
  @apply w-full h-full absolute top-0 left-0 z-10 overflow-hidden;
}

.newsletter__content {
  @apply w-full h-full object-cover absolute top-0 left-0 z-20 bg-gray-700 bg-opacity-75 flex justify-center items-center;
}

.newsletter-content__description {
  @apply container mx-auto flex flex-col justify-center items-center;
}

.newsletter-description {
  @apply container mx-auto flex flex-col justify-center items-center;
}

.newsletter-description__title {
  @apply text-white text-4xl tracking-wide font-semibold mb-6 max-md:text-2xl;
}

.newsletter-form__input {
  @apply w-[400px] max-md:w-[200px] border bg-transparent px-5 py-3 mr-3 border border-white rounded-none text-white text-xl rounded-none;
}

.newsletter-form__submit {
  @apply transition duration-200 hover:bg-sky-500 text-xl px-7 mx-auto py-3 bg-sky-400 text-white rounded-none border border-sky-400 cursor-pointer;
}
</style>
