<template>
  <section class="w-full cabinet">
    <div class="cabinet__block">
      <h1 class="cabinet__title">
        Аккаунт
        <button class="button_regular" @click="logoutUser()">
          <img
            src="~/assets/icons/exit.svg"
            class="button__image"
            alt="Exit"
            loading="eager"
          />
          Выйти
        </button>
      </h1>
      <div class="cabinet-block__info">
        <div class="cabinet-info__item info-item">
          <div>
            <h3 class="info-item__title">E-mail</h3>
            <h4 class="text-lg">{{ user?.email }}</h4>
          </div>
        </div>
        <div class="cabinet-info__item info-item">
          <div class="">
            <h3 class="info-item__title">Phone</h3>
            <h4 class="text-lg">
              {{ user?.phone ? user?.phone : "+1-202-555-0135" }}
            </h4>
          </div>
        </div>
        <div class="cabinet-info__item info-item">
          <div class="">
            <h3 class="info-item__title">Дата регистрации</h3>
            <h4 class="text-lg">
              {{ formatDate(new Date(user?.created_at)) }}
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div class="cabinet__block cabinet-block">
      <h1 class="cabinet-block__header">Настройка уведомлений</h1>
      <div class="cabinet-block__content">
        <p class="flex items-center text-xl mb-3">
          Получать новостную рассылку
          <input class="ml-3 w-[20px] h-[20px]" type="checkbox" />
        </p>
        <p class="flex items-center text-xl mb-3">
          Получать уведомления об изменении статуса заказов
          <input class="ml-3 w-[20px] h-[20px]" type="checkbox" />
        </p>
      </div>
    </div>
    <div class="cabinet__block">
      <h1 class="cabinet-block__header">Заказы</h1>
      <template v-if="data?.length">
        <div
          v-for="(item, index) in data"
          :key="item.id"
          class="cabinet-block__orders cabinet-orders"
        >
          <span class="text-slate-500 text-lg">{{ dates[index] }}</span>
          <div class="text-xl mb-5">
            Заказ <span class="font-semibold">№{{ item.id }}</span
            >, Товаров:
            <span class="font-semibold">{{ item.items.length }}</span
            >, на сумму: <span class="font-semibold">${{ item.total }}</span
            ><span
              class="cabinet-orders__status"
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
            :shadowed="false"
          />
        </div>
      </template>
      <div v-else-if="data === null" class="preloader-wrapper">
        <img
          class="w-16"
          src="~/assets/icons/oval.svg"
          alt="Preloader"
          loading="eager"
        />
      </div>
      <div v-else class="preloader-wrapper">
        <p class="preloader-wrapper__text">You don't have any orders</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useOrdersStore } from "~/store/orders";
import { USER_ORDERS_HEADER } from "~/constants";
import { formatDate } from "~/utils/formatDate";

const router = useRouter();
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

const logoutUser = () => {
  router.push("/catalog");
  client.auth.signOut();
};

onMounted(() => {
  store.fetchUserOrders();
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
  @apply mb-5 bg-white h-[120px] lg:min-w-[320px] max-lg:w-full flex justify-between items-center border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg px-4 overflow-hidden;
}

.cabinet-orders__status {
  @apply ml-4 text-red-700 font-semibold;
}

.info-item__title {
  @apply text-2xl font-semibold mb-2;
}
</style>
