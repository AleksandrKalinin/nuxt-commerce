<template>
  <aside
    class="admin-panel w-96 border sky-blue-400 p-4 bg-white border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg"
  >
    <div class="admin-panel__categories">
      <div class="">
        <NuxtLink class="text-lg p-2 w-full flex cursor-pointer" to="/admin"
          >Каталог</NuxtLink
        >
      </div>
      <div>
        <NuxtLink
          class="text-lg p-2 w-full flex cursor-pointer"
          to="/admin/orders"
          >Заказы</NuxtLink
        >
      </div>
      <div>
        <NuxtLink
          class="text-lg p-2 w-full flex cursor-pointer"
          to="/admin/users"
          >Пользователи</NuxtLink
        >
      </div>
      <div>
        <NuxtLink
          class="text-lg p-2 w-full flex cursor-pointer"
          to="/admin/dashboard"
          >Статистика</NuxtLink
        >
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped></style>
