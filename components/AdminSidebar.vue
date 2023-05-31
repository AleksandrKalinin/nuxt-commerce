<template>
  <aside
    class="admin-panel w-96 max-lg:w-full max-lg:mb-5 border sky-blue-400 p-4 bg-white border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg"
  >
    <div class="admin-panel__categories">
      <div class="">
        <NuxtLink
          class="text-lg p-3 w-full flex cursor-pointer items-center transition duration-200"
          to="/admin"
        >
          <img class="w-6 h-6 mr-2 icon" src="~/assets/shopping-bag.svg" />
          Каталог</NuxtLink
        >
      </div>
      <div>
        <NuxtLink
          class="text-lg p-3 w-full flex cursor-pointer items-center transition duration-200"
          to="/admin/orders"
          ><img class="w-6 h-6 mr-2 icon" src="~/assets/cart.svg" />
          Заказы</NuxtLink
        >
      </div>
      <div>
        <NuxtLink
          class="text-lg p-3 w-full flex cursor-pointer items-center transition duration-200"
          to="/admin/users"
          ><img class="w-6 h-6 mr-2 icon" src="~/assets/users.svg" />
          Пользователи</NuxtLink
        >
      </div>
      <div>
        <NuxtLink
          class="text-lg p-3 w-full flex cursor-pointer items-center transition duration-200"
          to="/admin/dashboard"
          ><img class="w-6 h-6 mr-2 icon" src="~/assets/chart.svg" />
          Статистика</NuxtLink
        >
      </div>
      <div>
        <NuxtLink
          class="text-lg p-3 w-full flex cursor-pointer items-center transition duration-200"
          to="/admin/mailing"
          ><img class="w-6 h-6 mr-2 icon" src="~/assets/mail.svg" />
          Рассылка</NuxtLink
        >
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped>
.icon {
  color: #222222;
}

a.router-link-active {
  @apply bg-gray-200 font-semibold;
}
</style>
