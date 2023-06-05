<template>
  <aside class="admin-sidebar">
    <div class="admin-sidebar__categories">
      <div class="">
        <NuxtLink class="admin-sidebar__link sidebar-link" to="/admin">
          <img
            class="sidebar-link__image"
            src="~/assets/shopping-bag.svg"
            alt="Каталог"
            loading="eager"
          />
          Каталог</NuxtLink
        >
      </div>
      <div>
        <NuxtLink class="admin-sidebar__link sidebar-link" to="/admin/orders"
          ><img
            class="sidebar-link__image"
            src="~/assets/cart.svg"
            alt="Корзина"
            loading="eager"
          />
          Заказы</NuxtLink
        >
      </div>
      <div>
        <NuxtLink class="admin-sidebar__link sidebar-link" to="/admin/users"
          ><img
            class="sidebar-link__image"
            src="~/assets/users.svg"
            alt="Пользователи"
            loading="eager"
          />
          Пользователи</NuxtLink
        >
      </div>
      <div>
        <NuxtLink class="admin-sidebar__link sidebar-link" to="/admin/dashboard"
          ><img
            class="sidebar-link__image"
            src="~/assets/chart.svg"
            alt="Статистика"
            loading="eager"
          />
          Статистика</NuxtLink
        >
      </div>
      <div>
        <NuxtLink class="admin-sidebar__link sidebar-link" to="/admin/mailing"
          ><img
            class="sidebar-link__image"
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

.admin-sidebar {
  @apply w-96 max-lg:w-full max-lg:mb-5 border p-4 bg-white border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg;
}

.admin-sidebar__link {
  @apply text-lg p-3 w-full flex cursor-pointer items-center transition duration-200;
}

.sidebar-link__image {
  @apply w-6 h-6 mr-2 icon;
}
</style>
