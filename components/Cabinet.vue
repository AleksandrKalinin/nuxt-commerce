<template>
  <section class="w-full">
    <h1 class="font-semibold text-4xl mb-5">Личный кабинет</h1>
    <div
      v-if="data?.length"
      v-for="(item, index) in data"
      :key="item.id"
      class="mb-5 min-w-full w-full bg-white p-5 border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg"
    >
      <span class="text-slate-500 text-lg">{{ dates[index] }}</span>
      <div class="text-xl">
        Заказ <span class="font-semibold">№{{ item.id }}</span
        >, Товаров: <span class="font-semibold">{{ item.items.length }}</span
        >, на сумму: <span class="font-semibold">${{ item.total }}</span
        ><span
          class="ml-4 text-red-700 font-semibold"
          :class="
            item.status === 'Cancelled' ? 'text-red-600' : 'text-green-600'
          "
          >{{ item.status }}</span
        >
      </div>
      <BaseTable
        v-if="item.items.length"
        :header="USER_ORDERS_HEADER"
        :data="item.items"
      />
    </div>
    <div
      v-else-if="data === null"
      class="preloader-wrapper flex justify-center items-center h-full w-full"
    >
      <img class="w-16" src="~/assets/oval.svg" />
    </div>
    <div
      v-else="data.length === 0"
      class="preloader-wrapper flex justify-center items-center h-full w-full"
    >
      <p class="text-2xl text-center">You don't have any orders</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useOrdersStore } from "~/store/orders";
import { USER_ORDERS_HEADER } from "~/constants";

const store = useOrdersStore();

const data = computed(() => {
  return store.orders;
});

const dates = computed(() => {
  return store.orders?.map((item) => {
    const date = new Date(item.created_at);
    return (
      date.getDate() +
      "." +
      (date.getMonth() + 1) +
      "." +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds()
    );
  });
});

onMounted(() => {
  store.fetchUserOrders();
});
</script>

<style scoped></style>
