import { defineStore } from "pinia";
import { useToastsStore } from "./toasts";

export const useOrdersStore = defineStore("orders", () => {
  const client = useSupabaseClient();
  const orders: Ref<Order[] | null> = ref([]);
  const toastsStore = useToastsStore();

  const fetchOrders = async () => {
    const { data, error } = await client
      .from("orders")
      .select("id, created_at, items, userId, user, total, status");
    orders.value = data;
    if (error) throw error;
  };

  const fetchUserOrders = async () => {
    const {
      data: { user },
    } = await client.auth.getUser();
    const { data, error } = await client
      .from("orders")
      .select("id, created_at, items, userId, user, total, status")
      .eq("userId", user?.id);
    orders.value = data;
    if (error) throw error;
  };

  const updateOrderStatus = async (id: number, e: Event) => {
    const target = e.target as HTMLInputElement;
    const status = target.value;
    const { error } = await client
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) {
      const { toast, message } = toastHandler("status-update-error");
      toastsStore.showErrorToast(toast, message);
    } else {
      const { toast, message } = toastHandler("status-update-success");
      toastsStore.showSuccessToast(toast, message);
    }
  };

  return {
    orders,
    updateOrderStatus,
    fetchOrders,
    fetchUserOrders,
  };
});
