<template>
  <form
    v-if="options.length"
    ref="baseList"
    class="base-list h-[200px] mb-4"
    @submit.prevent="submitForm"
  >
    <h3 class="text-xl mb-5">Create order</h3>
    <input
      v-model="email"
      type="string"
      placeholder="User email"
      class="modal-form__input w-full"
    />
    <div class="base-list flex">
      <select
        v-if="options.length"
        class="modal-form__select mr-2"
        @change="selectItem($event)"
      >
        <option v-for="item in options" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
      <input
        v-model.number="quantity"
        type="number"
        placeholder="Quanity"
        class="modal-form__input w-[120px] mr-2"
      />
      <input
        v-model.number="total"
        type="string"
        readonly
        placeholder="Total"
        class="modal-form__input w-[120px]"
      />
    </div>
    <input class="button_regular" type="submit" value="Create order" />
  </form>
</template>

<script setup lang="ts">
import { useFormStore } from "~/store/form";
import { useOrdersStore } from "~/store/orders";

const client = useSupabaseClient();
const formStore = useFormStore();
const ordersStore = useOrdersStore();

const { addOrder } = ordersStore;

const baseList = ref(null);
const options = ref([]);
const email = ref("");
const itemId = ref(null);
const quantity = ref(0);

const selectedItem = computed(() => {
  return options.value.find((item) => {
    return item.id === Number(itemId.value);
  });
});

const total = computed(() => {
  if (selectedItem.value && quantity.value) {
    return selectedItem.value.price * Number(quantity.value);
  } else return 0;
});

const selectItem = (e) => {
  itemId.value = e.target.value;
};

const closeModal = inject("closeModal", () => {});

const submitForm = (e) => {
  const values = {
    user: email.value,
    total: total.value,
    created_at: new Date(),
    status: "Pending",
    items: selectedItem.value,
  };
  addOrder(values);
  closeModal();
};

onMounted(async () => {
  const { data, error } = await client.from("catalog").select("*");
  if (error) {
    throw error;
  } else {
    options.value = data;
  }
});
</script>

<style scoped></style>
