<template>
  <div
    class="container mx-auto py-10 flex min-h-[calc(100vh-160px)] max-lg:flex-col"
  >
    <Sidebar />
    <NuxtErrorBoundary>
      <SelectedItem />

      <template #error="{ error }">
        <div>
          <p>
            An error occured when loading selected item
            <code>{{ error }}</code>
          </p>
          <p>
            <button class="hover:cursor-pointer" @click="clearError(error)">
              Back to catalog
            </button>
          </p>
        </div>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>

<script setup lang="ts">
const id = ref(useRoute().params.id);

const clearError = async (err) => {
  await navigateTo("/catalog");
  err.value = null;
};
</script>

<style scoped></style>
