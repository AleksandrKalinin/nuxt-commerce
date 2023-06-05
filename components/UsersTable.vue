<template>
  <BaseTable
    :header="USERS_HEADER"
    :data="data"
    :shadowed="true"
    v-if="data.length"
  />
  <div v-else class="preloader-wrapper">
    <img
      class="w-16"
      src="~/assets/icons/oval.svg"
      alt="Preloader"
      loading="eager"
    />
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from "~/store/users";
import { USERS_HEADER } from "~/constants";
const store = useUsersStore();

const data = computed(() => {
  return [...store.users];
});

onMounted(() => {
  store.fetchUsers();
});
</script>

<style scoped></style>
