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
  };
});
