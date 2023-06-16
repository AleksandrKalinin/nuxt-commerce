<template>
  <section class="w-full cabinet">
    <div class="cabinet__block">
      <h1 class="cabinet__title">
        Account
        <button class="button_regular" @click="logoutUser()">Log out</button>
      </h1>
      <div class="cabinet-block__info">
        <div class="cabinet-info__item info-item">
          <div class="info-item__content">
            <h3 class="info-item__title">
              E-mail
              <Icon name="heroicons:face-frown" color="#444444" size="30px" />
            </h3>
            <h4 class="text-lg">{{ user?.email }}</h4>
          </div>
        </div>
        <div class="cabinet-info__item info-item">
          <div class="info-item__content">
            <h3 class="info-item__title">
              Phone
              <Icon
                name="heroicons:device-phone-mobile-20-solid"
                color="#444444"
                size="30px"
              />
            </h3>
            <h4 class="text-lg">
              {{ user?.phone ? user?.phone : "+1-202-555-0135" }}
            </h4>
          </div>
        </div>
        <div class="cabinet-info__item info-item">
          <div class="info-item__content">
            <h3 class="info-item__title">
              Registration date
              <Icon
                name="heroicons:calendar-days"
                color="#444444"
                size="30px"
              />
            </h3>
            <h4 class="text-lg">
              {{ formatDate(new Date(user!.created_at)) }}
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div class="cabinet__block cabinet-block">
      <h1 class="cabinet-block__header">Notification settings</h1>
      <div class="cabinet-block__content">
        <p class="flex items-center text-xl mb-3">
          <input class="mr-3 w-[20px] h-[20px]" type="checkbox" />
          I want to receive news and promotions by email
        </p>
        <p class="flex items-center text-xl mb-3">
          <input class="mr-3 w-[20px] h-[20px]" type="checkbox" />
          Send me notifications about my orders status
        </p>
      </div>
    </div>
    <div class="cabinet__block">
      <h1 class="cabinet-block__header">Orders</h1>
      <template v-if="data?.length && ordersLoaded">
        <div
          v-for="(item, index) in data"
          :key="item.id"
          class="cabinet-block__orders cabinet-orders"
        >
          <span class="text-slate-500 text-lg">{{ dates[index] }}</span>
          <div class="text-xl mb-5">
            Order <span class="font-semibold">№{{ item.id }}</span
            >, Items: <span class="font-semibold">{{ item.items.length }}</span
            >, Total: <span class="font-semibold">${{ item.total }}</span
            ><span class="cabinet-orders__status" :class="itemsStatus[index]">{{
              item.status
            }}</span>
          </div>
          <BaseTable
            v-if="item.items.length"
            :header="USER_ORDERS_HEADER"
            :data="item.items"
            :shadowed="false"
          />
        </div>
      </template>
      <TableSkeleton v-else-if="data?.length === 0 && !ordersLoaded" />
      <div v-else class="preloader-wrapper">
        <p class="preloader-wrapper__text">You don't have any orders</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useOrdersStore } from "~/store/orders";
import { USER_ORDERS_HEADER } from "~/constants/cabinet";
import { formatDate } from "~/utils/formatDate";

const router = useRouter();
const user = useSupabaseUser();
const client = useSupabaseClient();

const store = useOrdersStore();
const { orders: data, ordersLoaded } = storeToRefs(store);
const { fetchUserOrders } = store;

const dates = computed(() => {
  if (data.value) {
    return data.value?.map((item) => {
      const created = new Date(item.created_at);
      return formatDate(created);
    });
  } else return [];
});

const itemsStatus = computed(() => {
  if (data.value) {
    return data.value?.map((item) => {
      switch (item.status) {
        case "Cancelled":
          return "text-red-600";
        case "Pending":
          return "text-sky-600";
        case "Completed":
          return "text-green-600";
        default:
          return "sky-blue-400";
      }
    });
  } else {
    return [];
  }
});

const logoutUser = () => {
  router.push("/catalog");
  client.auth.signOut();
};

onMounted(() => {
  fetchUserOrders();
});
</script>

<style scoped lang="css">
.cabinet__title {
  @apply font-semibold text-4xl mb-7 flex justify-between;
}

.cabinet__block {
  @apply mb-10;
}

.cabinet-block__header {
  @apply font-semibold text-4xl mb-7 flex justify-between;
}

.cabinet-block__categories {
  @apply w-full flex flex-wrap justify-between;
}

.cabinet-block__content {
  @apply w-full flex flex-col flex-wrap justify-between bg-white border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg p-4;
}

.cabinet-block__orders {
  @apply mb-5 min-w-full w-full bg-white p-5 border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg;
}

.cabinet-block__info {
  @apply flex justify-between max-lg:flex-col;
}
.cabinet-info__item {
  @apply relative mb-5 bg-white h-[120px] lg:min-w-[320px] w-[calc(100%/3-50px)] max-lg:w-full flex justify-between items-center border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg px-4 overflow-hidden;
}

.cabinet-orders__status {
  @apply ml-4 font-semibold;
}

.info-item__content {
  @apply w-full;
}

.info-item__title {
  @apply text-2xl font-semibold mb-2 flex justify-between;
}

.cabinet-info__item::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #38bdf8;
  width: 100%;
  height: 8px;
  z-index: 999;
}
</style>
