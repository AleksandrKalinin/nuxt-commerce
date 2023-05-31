<template>
  <NuxtErrorBoundary>
    <EmailBuilder />
    <template #error="{ error }">
      <div>
        <p>
          An error occured when loading email builder
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
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const clearError = async (err) => {
  await navigateTo("/admin");
  err.value = null;
};
</script>

<style scoped>
svg {
  color: #0079af;
}
</style>
