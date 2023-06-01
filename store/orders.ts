import { defineStore } from "pinia";
import { useToastsStore } from "./toasts";

export const useOrdersStore = defineStore("orders", () => {
  const client = useSupabaseClient();
  const orders: Ref<Order[] | null> = ref([]);
  const toastsStore = useToastsStore();

  const fetchOrders = async () => {
    try {
      let { data, error } = await client
        .from("orders")
        .select("id, created_at, items, userId, user, total, status");
      orders.value = data;
      if (error) throw error;
    } catch (e) {
      throw e;
    }
  };

  const fetchUserOrders = async () => {
    const {
      data: { user },
    } = await client.auth.getUser();
    try {
      let { data, error } = await client
        .from("orders")
        .select("id, created_at, items, userId, user, total, status")
        .eq("userId", user?.id);
      orders.value = data;
      if (error) throw error;
    } catch (e) {
      throw e;
    }
  };

  const updateOrderStatus = async (id: number, e) => {
    const status = e.target.value;
    try {
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
    } catch (e) {
      throw e;
    }
  };

  return {
    orders,
    updateOrderStatus,
    fetchOrders,
    fetchUserOrders,
  };
});
