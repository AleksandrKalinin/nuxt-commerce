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
          <img
            class="w-6 h-6 mr-2 icon"
            src="~/assets/shopping-bag.svg"
            alt="Каталог"
            loading="eager"
          />
          Каталог</NuxtLink
        >
      </div>
      <div>
        <NuxtLink
          class="text-lg p-3 w-full flex cursor-pointer items-center transition duration-200"
          to="/admin/orders"
          ><img
            class="w-6 h-6 mr-2 icon"
            src="~/assets/cart.svg"
            alt="Корзина"
            loading="eager"
          />
          Заказы</NuxtLink
        >
      </div>
      <div>
        <NuxtLink
          class="text-lg p-3 w-full flex cursor-pointer items-center transition duration-200"
          to="/admin/users"
          ><img
            class="w-6 h-6 mr-2 icon"
            src="~/assets/users.svg"
            alt="Пользователи"
            loading="eager"
          />
          Пользователи</NuxtLink
        >
      </div>
      <div>
        <NuxtLink
          class="text-lg p-3 w-full flex cursor-pointer items-center transition duration-200"
          to="/admin/dashboard"
          ><img
            class="w-6 h-6 mr-2 icon"
            src="~/assets/chart.svg"
            alt="Статистика"
            loading="eager"
          />
          Статистика</NuxtLink
        >
      </div>
      <div>
        <NuxtLink
          class="text-lg p-3 w-full flex cursor-pointer items-center transition duration-200"
          to="/admin/mailing"
          ><img
            class="w-6 h-6 mr-2 icon"
            src="~/assets/mail.svg"
            alt="Рассылка"
            loading="eager"
          />
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
