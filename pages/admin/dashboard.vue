<template>
  <div
    class="container mx-auto py-10 flex min-h-[calc(100vh-160px)] max-lg:flex-col max-lg:px-3"
  >
    <AdminSidebar />
    <section class="w-full lg:ml-10">
      <div class="columns-1">
        <Dashboard />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
