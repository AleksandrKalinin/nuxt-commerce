<template>
  <BaseTable :header="header" :data="data" />
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
