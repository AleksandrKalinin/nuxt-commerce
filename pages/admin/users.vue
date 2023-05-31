<template>
  <NuxtErrorBoundary>
    <UsersTable />
    <template #error="{ error }">
      <div>
        <p>
          An error occured when rendering users page
          <code>{{ error }}</code>
        </p>
        <p>
          <button class="hover:cursor-pointer" @click="clearError(error)">
            Go back
          </button>
        </p>
      </div>
    </template>
  </NuxtErrorBoundary>
  <BasePagination :items="store.users" :targetRef="scrollEl" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "admin",
});

import { useUsersStore } from "~/store/users";

const clearError = async (err) => {
  await navigateTo("/admin");
  err.value = null;
};

const store = useUsersStore();
const scrollEl = ref(null);
</script>

<style scoped></style>
