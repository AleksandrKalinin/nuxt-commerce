<template>
  <header
    class="z-10 h-20 bg-white px-10 flex items-center justify-between shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)]"
  >
    <NuxtLink to="/catalog">
      <div class="logo p-1 bg-sky-300">
        <div class="logo__outer p-1 bg-white">
          <div
            class="logo__inner text-2xl tracking-wide uppercase bg-sky-300 py-1 px-2 text-white"
          >
            Photolens
          </div>
        </div>
      </div>
    </NuxtLink>
    <div v-if="user" class="flex items-center">
      <NuxtLink to="/cabinet">
        <div class="flex flex-col items-center mx-4">
          <div class="w-8 h-8 mr-2">
            <img
              src="~/assets/account.svg"
              alt="Account"
              class="icon text-red w-full h-auto cursor-pointer block"
              loading="eager"
            />
          </div>
          Кабинет
        </div>
      </NuxtLink>

      <NuxtLink to="/cart" v-if="user">
        <div class="flex flex-col items-center">
          <div class="w-8 h-8 mr-2">
            <img
              src="~/assets/cart.svg"
              alt="Корзина"
              loading="eager"
              class="icon text-red w-full cursor-pointer block h-full w-full"
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
.logo__outer {
  font-family: "Raleway", sans-serif;
}

.icon {
  color: "red";
}
</style>
