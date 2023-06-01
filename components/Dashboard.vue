<template>
  <div class="px-3">
    <div class="flex flex-wrap justify-between items-center">
      <div
        class="mb-5 bg-white stat-item h-[120px] w-[270px] flex justify-between items-center border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg px-4 overflow-hidden"
      >
        <div class="">
          <h3
            class="text-lg tracking-wide text-teal-600 uppercase mb-2 font-semibold"
          >
            Customers
          </h3>
          <h4 class="text-2xl font-semibold">{{ props.totalUsers }}</h4>
        </div>
        <div
          class="w-16 h-16 bg-sky-200 flex justify-center items-center border border-sky-200 rounded-lg"
        >
          <img
            class="h-8 w-8"
            src="~/assets/users.svg"
            alt="Users"
            loading="eager"
          />
        </div>
      </div>
      <div
        class="mb-5 bg-white stat-item h-[120px] w-[270px] flex justify-between items-center border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg px-4 overflow-hidden"
      >
        <div class="">
          <h3
            class="text-lg tracking-wide text-teal-600 uppercase mb-2 font-semibold"
          >
            Total Orders
          </h3>
          <h4 class="text-2xl font-semibold">{{ props.totalOrders }}</h4>
        </div>
        <div
          class="w-16 h-16 bg-sky-200 flex justify-center items-center border border-sky-200 rounded-lg"
        >
          <img
            class="h-8 w-8"
            src="~/assets/cart.svg"
            alt="Корзина"
            loading="eager"
          />
        </div>
      </div>
      <div
        class="mb-5 bg-white stat-item h-[120px] w-[270px] flex justify-between items-center border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg px-4 overflow-hidden"
      >
        <div class="">
          <h3
            class="text-lg tracking-wide text-teal-600 uppercase mb-2 font-semibold"
          >
            Total Products
          </h3>
          <h4 class="text-2xl font-semibold">{{ props.totalItems }}</h4>
        </div>
        <div
          class="w-16 h-16 bg-sky-200 flex justify-center items-center border border-sky-200 rounded-lg"
        >
          <img
            class="h-8 w-8 filter"
            src="~/assets/shopping-bag.svg"
            loading="eager"
          />
        </div>
      </div>
      <div
        class="mb-5 bg-white stat-item h-[120px] w-[270px] flex justify-between items-center border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg px-4 overflow-hidden"
      >
        <div class="">
          <h3
            class="text-lg tracking-wide text-teal-600 uppercase mb-2 font-semibold"
          >
            Total Revenue
          </h3>
          <h4 class="text-2xl font-semibold">${{ props.totalRevenue }}</h4>
        </div>
        <div
          class="w-16 h-16 bg-sky-200 flex justify-center bg-sky-200 items-center border border-sky-200 rounded-lg"
        >
          <img class="h-8 w-8" src="~/assets/currency.svg" loading="eager" />
        </div>
      </div>
    </div>
    <div class="flex flex-wrap justify-between items-center py-7">
      <div
        class="max-2xl:mx-auto max-2xl:w-[700px] bg-white mb-10 w-[550px] h-[350px] px-10 py-5 border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg"
      >
        <h2 class="text-2xl mb-3 font-semibold">Income statistics</h2>
        <BarChart :height="250" :chartData="props.revenue" :options="options" />
      </div>
      <div
        class="max-2xl:mx-auto max-2xl:w-[700px] bg-white mb-10 w-[550px] h-[350px] px-10 py-5 border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg"
      >
        <h2 class="text-2xl mb-3 font-semibold">Orders statistics</h2>
        <PieChart :height="250" :chartData="props.orders" :options="options" />
      </div>
      <div
        class="max-2xl:mx-auto max-2xl:w-[700px] bg-white mb-10 w-[550px] h-[350px] px-10 py-5 border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg"
      >
        <h2 class="text-2xl mb-3 font-semibold">User growth</h2>
        <LineChart :height="250" :chartData="props.users" :options="options" />
      </div>
      <div
        class="max-2xl:mx-auto max-2xl:w-[700px] bg-white mb-10 w-[550px] h-[350px] px-10 py-5 border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg"
      >
        <h2 class="text-2xl mb-3 font-semibold">Balance overview</h2>
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
.stat-item {
  position: relative;
}
.stat-item::before {
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
</style>
