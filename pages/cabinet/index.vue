<template>
  <div class="container w-full mx-auto py-10 flex min-h-[calc(100vh-160px)]">
    <NuxtErrorBoundary>
      <Cabinet />
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const clearError = async (err) => {
  await navigateTo("/catalog");
  err.value = null;
};
</script>

<style scoped></style>
