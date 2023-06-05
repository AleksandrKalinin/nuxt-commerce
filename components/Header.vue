<template>
  <header class="header">
    <NuxtLink to="/catalog">
      <div class="logo">
        <div class="logo__outer">
          <div class="logo__inner">Photolens</div>
        </div>
      </div>
    </NuxtLink>
    <div v-if="user" class="flex items-center">
      <NuxtLink to="/cabinet">
        <div class="header-item header__item">
          <div class="header-item__image">
            <img
              src="~/assets/account.svg"
              alt="Account"
              class="header-item__icon"
              loading="eager"
            />
          </div>
          Кабинет
        </div>
      </NuxtLink>
      <NuxtLink to="/cart" v-if="user">
        <div class="header-item header__item">
          <div class="header-item__image">
            <img
              src="~/assets/cart.svg"
              alt="Корзина"
              loading="eager"
              class="header-item__icon"
            />
          </div>
          Корзина
        </div>
      </NuxtLink>
    </div>
    <BaseAuthModal v-else />
  </header>
</template>

<script setup lang="ts">
const user = useSupabaseUser();

const client = useSupabaseClient();
</script>

<style scoped>
.header {
  @apply z-10 h-20 bg-white px-10 max-md:px-5 flex items-center justify-between shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)];
}

.logo {
  @apply p-1 bg-sky-300;
}

.logo__outer {
  @apply p-1 bg-white;
  font-family: "Raleway", sans-serif;
}

.logo__inner {
  @apply text-2xl tracking-wide uppercase bg-sky-300 py-1 px-2 text-white max-md:text-lg;
}

.header-item {
  @apply flex flex-col items-center mx-4 max-md:mx-2;
}

.header-item__image {
  @apply w-8 h-8 mr-2;
}

.header-item__icon {
  @apply w-full h-auto cursor-pointer block;
  color: "red";
}
</style>
