<template>
  <div
    class="container mx-auto py-10 flex min-h-[calc(100vh-160px)] max-lg:flex-col max-lg:px-3"
  >
    <AdminSidebar />
    <section class="w-full lg:ml-10" ref="scrollEl">
      <div class="columns-1">
        <NuxtErrorBoundary>
          <Mailing />
          <template #error="{ error }">
            <div>
              <p>
                An error occured when loading mail settings
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
definePageMeta({
  middleware: ["auth"],
});
import { useEmailStore } from "~/store/emailbuider";

const clearError = async (err) => {
  await navigateTo("/admin");
  err.value = null;
};

const store = useEmailStore();
</script>

<style scoped></style>
