<template>
  <header class="z-10 h-20 bg-sky-400 px-10 flex items-center justify-between">
    <span>Logo</span>
    <div v-if="user" @click="client.auth.signOut()" class="cursor-pointer">
      {{ user.email }}
    </div>
    <BaseAuthModal v-else />
  </header>
</template>

<script setup lang="ts">
const user = useSupabaseUser();

const client = useSupabaseClient();
</script>

<style scoped></style>
