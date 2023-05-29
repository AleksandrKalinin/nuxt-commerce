<template>
  <div
    class="container mx-auto py-10 flex min-h-[calc(100vh-160px)] max-lg:flex-col max-lg:px-3"
  >
    <AdminSidebar />
    <section class="w-full lg:ml-10">
      <div class="columns-1">
        <Dashboard
          :orders="orders"
          :users="users"
          :revenue="revenue"
          :totalOrders="orders?.length"
          :totalUsers="users?.length"
          :totalItems="items?.length"
          :totalRevenue="totalRevenue"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useCatalogStore } from "~/store/catalog";
import { useOrdersStore } from "~/store/orders";
import { useUsersStore } from "~/store/users";

const ordersStore = useOrdersStore();
const usersStore = useUsersStore();
const catalogStore = useCatalogStore();

const orders = computed(() => {
  return ordersStore.orders;
});

const users = computed(() => {
  return usersStore.users;
});

const items = computed(() => {
  return catalogStore.catalogItems;
});

const totalRevenue = computed(() => {
  return orders.value?.reduce((acc, item) => {
    return acc + item.total;
  }, 0);
});

const monthes = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

const mappedItems = computed(() => {
  const data: number[] = [];
  monthes.map((item, id) => {
    data.push(0);
  });
  orders.value?.map((item) => {
    let date = new Date(item.created_at);
    const dateMonth = date.getMonth();
    data[dateMonth] = data[dateMonth] + item.total;
  });
  return data;
});

const revenue = computed(() => {
  return {
    labels: monthes,
    datasets: [
      {
        data: mappedItems.value,
        backgroundColor: ["#77CEFF"],
      },
    ],
  };
});

watch(mappedItems, () => {
  console.log(mappedItems.value);
});

onMounted(() => {
  ordersStore.fetchOrders();
  usersStore.fetchUsers();
  catalogStore.fetchCatalogItems();
});
</script>

<style scoped></style>
