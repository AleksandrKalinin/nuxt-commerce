<template>
  <div class="container mx-auto py-10 flex min-h-[calc(100vh-160px)]">
    <section class="w-full">
      <div class="columns-1 min-h-full">
        <NuxtErrorBoundary>
          <Cart />
          <template #error="{ error }">
            <div>
              <p>
                An error occured when rendering your cart
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
    </section>
  </div>
</template>

<script setup lang="ts">
const clearError = async (err) => {
  await navigateTo("/catalog");
  err.value = null;
};
</script>

<style scoped></style>
