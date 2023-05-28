<template>
  <div class="container mx-auto py-10 flex min-h-[calc(100vh-160px)]">
    <AdminSidebar />
    <section class="w-full lg:ml-10 ml-5">
      <AdminPanel />
      <div class="columns-1">
        <UsersTable />
        <BasePagination :items="store.users" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from "~/store/users";
const store = useUsersStore();
</script>

<style scoped></style>
