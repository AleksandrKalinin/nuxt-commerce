<template>
  <div
    class="container mx-auto py-10 flex min-h-[calc(100vh-160px)] max-lg:flex-col max-lg:px-3"
  >
    <AdminSidebar />
    <section class="w-full lg:ml-10">
      <div class="columns-1">
        <NuxtErrorBoundary>
          <Dashboard
            :orders="ordersOverview"
            :users="usersData"
            :revenue="revenue"
            :balance="balanceData"
            :totalOrders="orders?.length"
            :totalUsers="users?.length"
            :totalItems="items?.length"
            :totalRevenue="totalRevenue"
          />
          <template #error="{ error }">
            <div>
              <p>
                An error occured when loading the dashboard!
                <code>{{ error }}</code>
              </p>
              <p>
                <button class="hover:cursor-pointer" @click="clearError(error)">
                  Back
                </button>
              </p>
            </div>
          </template>
        </NuxtErrorBoundary>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

import { useCatalogStore } from "~/store/catalog";
import { useOrdersStore } from "~/store/orders";
import { useUsersStore } from "~/store/users";

const clearError = async (err) => {
  await navigateTo("/admin");
  err.value = null;
};

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

const revenueByMonth = computed(() => {
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
        label: "Revenue by month",
        data: revenueByMonth.value,
        backgroundColor: ["#77CEFF"],
      },
    ],
  };
});

const usersByMonth = computed(() => {
  const data: number[] = [];
  monthes.map((item, id) => {
    data.push(0);
  });
  users.value?.map((item) => {
    let date = new Date(item.registration_date);
    const dateMonth = date.getMonth();
    data[dateMonth] += 1;
  });
  return data;
});

const userGrowth = computed(() => {
  return usersByMonth.value.map((elem, index) =>
    usersByMonth.value.slice(0, index + 1).reduce((a, b) => a + b)
  );
});

const usersData = computed(() => {
  return {
    labels: monthes,
    datasets: [
      {
        label: "User growth statistics",
        data: userGrowth.value,
        backgroundColor: ["#77CEFF"],
      },
    ],
  };
});

const expences = computed(() => {
  return revenueByMonth.value.map((item) => {
    const random = Math.floor(Math.random() * (9 - 6) + 6);
    return (item * random) / 10;
  });
});

const balanceData = computed(() => {
  return {
    labels: monthes,
    datasets: [
      {
        label: "Revenue",
        data: revenueByMonth.value,
        backgroundColor: ["#77CEFF"],
      },
      {
        label: "Expences",
        data: expences.value,
        backgroundColor: ["#0079AF"],
      },
    ],
  };
});

const ordersStatus = computed(() => {
  const data = {
    Completed: 0,
    Pending: 0,
    Cancelled: 0,
  };
  orders.value?.map((item) => {
    data[item.status] = data[item.status] + 1;
  });
  return data;
});

const ordersOverview = computed(() => {
  return {
    labels: Object.keys(ordersStatus.value),
    datasets: [
      {
        data: Object.values(ordersStatus.value),
        backgroundColor: ["#77CEFF", "#0079AF", "#123E6B"],
      },
    ],
  };
});

onMounted(() => {
  ordersStore.fetchOrders();
  usersStore.fetchUsers();
  catalogStore.fetchCatalogItems();
});
</script>

<style scoped></style>
