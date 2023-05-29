<template>
  <section class="w-full">
    <div class="mb-10">
      <h1 class="font-semibold text-4xl mb-7 flex justify-between">
        Аккаунт
        <button
          @click="client.auth.signOut()"
          class="text-lg px-7 py-2 bg-sky-400 text-white rounded-none"
        >
          Log out
        </button>
      </h1>
      <div class="w-full flex flex-wrap justify-between">
        <div
          class="mb-5 bg-white stat-item h-[120px] xl:w-[350px] max-lg:w-full flex justify-between items-center border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg px-4 overflow-hidden"
        >
          <div class="">
            <h3 class="text-2xl font-semibold mb-2">E-mail</h3>
            <h4 class="text-lg">{{ user?.email }}</h4>
          </div>
        </div>
        <div
          class="mb-5 bg-white stat-item h-[120px] w-[350px] max-lg:w-full flex justify-between items-center border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg px-4 overflow-hidden"
        >
          <div class="">
            <h3 class="text-2xl font-semibold mb-2">Phone</h3>
            <h4 class="text-lg">
              {{ user?.phone ? user?.phone : "+1-202-555-0135" }}
            </h4>
          </div>
        </div>
        <div
          class="mb-5 bg-white stat-item h-[120px] w-[350px] max-lg:w-full flex justify-between items-center border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg px-4 overflow-hidden"
        >
          <div class="">
            <h3 class="text-2xl font-semibold mb-2">Дата регистрации</h3>
            <h4 class="text-lg">
              {{ formatDate(new Date(user?.created_at)) }}
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-10">
      <h1 class="font-semibold text-4xl mb-7">Заказы</h1>
      <div
        v-if="data?.length"
        v-for="(item, index) in data"
        :key="item.id"
        class="mb-5 min-w-full w-full bg-white p-5 border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg"
      >
        <span class="text-slate-500 text-lg">{{ dates[index] }}</span>
        <div class="text-xl mb-5">
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { useOrdersStore } from "~/store/orders";
import { USER_ORDERS_HEADER } from "~/constants";

const user = useSupabaseUser();
const client = useSupabaseClient();

const store = useOrdersStore();

const data = computed(() => {
  return store.orders;
});

const dates = computed(() => {
  return store.orders?.map((item) => {
    const created = new Date(item.created_at);
    return formatDate(created);
  });
});

const formatDate = (date: Date) => {
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
};

onMounted(() => {
  store.fetchUserOrders();
});
</script>

<style scoped></style>
