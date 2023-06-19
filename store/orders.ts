import { defineStore } from "pinia";
import { useToastsStore } from "./toasts";

export const useOrdersStore = defineStore("orders", () => {
  const client = useSupabaseClient();
  const orders: Ref<Order[] | null> = ref([]);
  const ordersLoaded = ref(false);

  const toastsStore = useToastsStore();
  const { showErrorToast, showSuccessToast } = toastsStore;

  const fetchOrders = async () => {
    const { data, error } = await client
      .from("orders")
      .select("id, created_at, items, userId, user, total, status");
    if (error) throw error;
    orders.value = data;
    ordersLoaded.value = true;
  };

  const fetchUserOrders = async () => {
    const {
      data: { user },
    } = await client.auth.getUser();
    const { data, error } = await client
      .from("orders")
      .select("id, created_at, items, userId, user, total, status")
      .eq("userId", user?.id);
    if (error) throw error;
    orders.value = data;
    ordersLoaded.value = true;
  };

  const getUserId = async (values) => {
    const { data, error } = await client
      .from("users")
      .select("user_id")
      .eq("email", values.user);
    if (error) {
      const { toast, message } = toastHandler("user-not-found");
      showErrorToast(toast, message);
    } else {
      return data[0];
    }
  };

  const addOrder = async (values) => {
    const selected = await getUserId(values);
    const formValues = {
      userId: selected.user_id,
      ...values,
    };
    const { error } = await client.from("orders").insert([formValues]);
    if (error) {
      const { toast, message } = toastHandler("registration-failed");
      showErrorToast(toast, message);
    }
  };

  const updateOrderStatus = async ({
    id,
    event,
  }: {
    id: number;
    event: Event;
  }) => {
    const target = event.target as HTMLInputElement;
    const status = target.value;
    const { error } = await client
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) {
      const { toast, message } = toastHandler("status-update-error");
      showErrorToast(toast, message);
    } else {
      const { toast, message } = toastHandler("status-update-success");
      showSuccessToast(toast, message);
    }
  };

  return {
    orders,
    ordersLoaded,
    updateOrderStatus,
    fetchOrders,
    fetchUserOrders,
    addOrder,
  };
});
