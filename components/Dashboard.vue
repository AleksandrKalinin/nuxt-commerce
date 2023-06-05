<template>
  <div class="dashboard px-3">
    <div class="dashboard__info dashboard-info">
      <div class="dashboard-info__item info-item">
        <div>
          <h3 class="info-item__title">Customers</h3>
          <h4 class="text-2xl font-semibold">{{ props.totalUsers }}</h4>
        </div>
        <div class="info-item__picture">
          <img
            class="info-item__image"
            src="~/assets/icons/users.svg"
            alt="Users"
            loading="eager"
          />
        </div>
      </div>
      <div class="dashboard-info__item info-item">
        <div class="">
          <h3 class="info-item__title">Total Orders</h3>
          <h4 class="text-2xl font-semibold">{{ props.totalOrders }}</h4>
        </div>
        <div class="info-item__picture">
          <img
            class="info-item__image"
            src="~/assets/icons/cart.svg"
            alt="Корзина"
            loading="eager"
          />
        </div>
      </div>
      <div class="dashboard-info__item info-item">
        <div class="">
          <h3 class="info-item__title">Total Products</h3>
          <h4 class="text-2xl font-semibold">{{ props.totalItems }}</h4>
        </div>
        <div class="info-item__picture">
          <img
            class="info-item__image filter"
            src="~/assets/icons/shopping-bag.svg"
            loading="eager"
          />
        </div>
      </div>
      <div class="dashboard-info__item info-item">
        <div class="">
          <h3 class="info-item__title">Total Revenue</h3>
          <h4 class="text-2xl font-semibold">${{ props.totalRevenue }}</h4>
        </div>
        <div class="info-item__picture">
          <img
            class="info-item__image"
            src="~/assets/icons/currency.svg"
            loading="eager"
          />
        </div>
      </div>
    </div>
    <div class="dashboard__statistics dashboard-statistics">
      <div class="dashboard-statistics__item statistics-item">
        <h2 class="statistics-item__title">Income statistics</h2>
        <BarChart :height="250" :chartData="props.revenue" :options="options" />
      </div>
      <div class="dashboard-statistics__item statistics-item">
        <h2 class="statistics-item__title">Orders infoistics</h2>
        <PieChart :height="250" :chartData="props.orders" :options="options" />
      </div>
      <div class="dashboard-statistics__item statistics-item">
        <h2 class="statistics-item__title">User growth</h2>
        <LineChart :height="250" :chartData="props.users" :options="options" />
      </div>
      <div class="dashboard-statistics__item statistics-item">
        <h2 class="statistics-item__title">Balance overview</h2>
        <LineChart :height="250" :chartData="balance" :options="options" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BarChart, LineChart, PieChart } from "vue-chart-3";
const props = defineProps([
  "revenue",
  "users",
  "orders",
  "balance",
  "totalItems",
  "totalRevenue",
  "totalUsers",
  "totalOrders",
]);

const options = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: false,
    },
  },
});
</script>

<style scoped>
.dashboard__info {
  @apply flex flex-wrap justify-between items-center;
}

.dashboard-info__item {
  @apply relative mb-5 bg-white info-item h-[120px] w-[270px] max-lg:mb-4 max-sm:w-full flex justify-between items-center border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg px-4 overflow-hidden;
}

.info-item__title {
  @apply text-lg tracking-wide text-teal-600 uppercase mb-2 font-semibold;
}

.dashboard-statistics {
  @apply flex flex-wrap justify-between items-center py-7;
}

.dashboard-statistics__item {
  @apply max-2xl:mx-auto max-2xl:w-[700px] bg-white mb-10 w-[550px] h-[350px] px-10 py-5 border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg;
}

.statistics-item__title {
  @apply text-2xl mb-3 font-semibold;
}

.info-item::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #38bdf8;
  width: 100%;
  height: 8px;
  z-index: 999;
}

.filter {
  filter: brightness(0%) saturate(100%);
}

.pie-wrapper .axis {
  display: none;
}

.info-item__picture {
  @apply w-16 h-16 bg-sky-200 flex justify-center items-center border border-sky-200 rounded-lg;
}

.info-item__image {
  @apply h-8 w-8;
}
</style>
