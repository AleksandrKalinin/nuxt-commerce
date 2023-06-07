<template>
  <BaseTable
    v-if="data?.length"
    :header="USERS_HEADER"
    :data="data"
    :shadowed="true"
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
import { storeToRefs } from "pinia";
import { useUsersStore } from "~/store/users";
import { USERS_HEADER } from "~/constants";

const store = useUsersStore();
const { users: data } = storeToRefs(store);
const { fetchUsers } = store;

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped></style>
