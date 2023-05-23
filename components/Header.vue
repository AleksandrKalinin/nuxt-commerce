<template>
  <header class="z-10 h-20 bg-sky-400 px-10 flex items-center justify-between">
    <span>Logo</span>
    <div v-if="user" class="flex items-center">
      <p @click="client.auth.signOut()" class="cursor-pointer text-white">
        {{ user.email }}
      </p>
      <NuxtLink to="/cart">
        <div class="border rounded flex items-center ml-6 bg-white py-2 px-4">
          <div class="w-8 h-8 mr-2">
            <img
              src="~/assets/cart.svg"
              class="w-full text-white cursor-pointer block"
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

<style scoped></style>
