<template>
  <BaseTable :header="header" :data="data" v-if="data.length" />
  <div
    v-else
    class="preloader-wrapper flex justify-center items-center h-full w-full"
  >
    <img class="w-16" src="~/public/oval.svg" />
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from "~/store/users";
const store = useUsersStore();

const data = computed(() => {
  return [...store.users];
});

onMounted(() => {
  store.fetchUsers();
});

const header = [
  {
    label: "ID",
    value: "id",
    type: "plain",
  },
  {
    label: "E-mail",
    value: "email",
    type: "plain",
  },
  {
    label: "Registered on",
    value: "registration_date",
    type: "plain",
  },
  {
    label: "Role",
    value: "role",
    type: "plain",
  },
];
</script>

<style scoped></style>
