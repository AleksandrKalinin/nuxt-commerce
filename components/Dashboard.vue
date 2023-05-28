<template>
  <div class="px-3">
    <div class="flex flex-wrap justify-between items-center">
      <div
        class="mb-5 stat-item h-[120px] w-[250px] flex justify-between items-center border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg px-4 overflow-hidden"
      >
        <div class="">
          <h3 class="text-xl font-semibold mb-1">Total Users</h3>
          <h4 class="text-2xl font-semibold">4</h4>
        </div>
        <img class="h-8 w-8" src="~/assets/users.svg" />
      </div>
      <div
        class="mb-5 stat-item h-[120px] w-[250px] flex justify-between items-center border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg px-4 overflow-hidden"
      >
        <div class="">
          <h3 class="text-xl font-semibold mb-1">Total Orders</h3>
          <h4 class="text-2xl font-semibold">14</h4>
        </div>
        <img class="h-8 w-8" src="~/assets/users.svg" />
      </div>
      <div
        class="mb-5 stat-item h-[120px] w-[250px] flex justify-between items-center border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg px-4 overflow-hidden"
      >
        <div class="">
          <h3 class="text-xl font-semibold mb-1">Total Products</h3>
          <h4 class="text-2xl font-semibold">23</h4>
        </div>
        <img class="h-8 w-8 filter" src="~/assets/shopping-bag.svg" />
      </div>
      <div
        class="mb-5 stat-item h-[120px] w-[250px] flex justify-between items-center border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg px-4 overflow-hidden"
      >
        <div class="">
          <h3 class="text-xl font-semibold mb-1">Total Revenue</h3>
          <h4 class="text-2xl font-semibold">$2340</h4>
        </div>
        <img class="h-8 w-8" src="~/assets/currency.svg" />
      </div>
    </div>
    <div class="flex flex-wrap justify-between items-center py-7">
      <div
        class="mb-10 w-[550px] h-[350px] px-10 py-5 border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg"
      >
        <h2 class="text-2xl font-semibold">Revenue</h2>
        <DoughnutChart :height="250" :chartData="testData" :options="options" />
      </div>
      <div
        class="mb-10 w-[550px] h-[350px] px-10 py-5 border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg"
      >
        <h2 class="text-2xl font-semibold">Revenue</h2>
        <BarChart :height="250" :chartData="testData" :options="options" />
      </div>
      <div
        class="mb-10 w-[550px] h-[350px] px-10 py-5 border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg"
      >
        <h2 class="text-2xl font-semibold">Revenue</h2>
        <LineChart :height="250" :chartData="testData" :options="options" />
      </div>
      <div
        class="mb-10 w-[550px] h-[350px] px-10 py-5 border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg"
      >
        <h2 class="text-2xl font-semibold">Revenue</h2>
        <PieChart :height="250" :chartData="testData" :options="options" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DoughnutChart, BarChart, LineChart, PieChart } from "vue-chart-3";

const options = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Doughnut Chart",
    },
  },
});

const testData = {
  labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
  datasets: [
    {
      data: [30, 40, 60, 70, 5],
      backgroundColor: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"],
    },
  ],
};
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
