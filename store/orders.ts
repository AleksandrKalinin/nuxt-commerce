import { defineStore } from "pinia";

export const useOrdersStore = defineStore("orders", () => {
  const client = useSupabaseClient();
  const orders: Ref<Order[] | null> = ref([]);

  async function fetchOrders() {
    try {
      let { data, error } = await client
        .from("orders")
        .select("id, created_at, items, userId, user, total, status");
      orders.value = data;
      if (error) throw error;
    } catch (e) {
      throw e;
    }
  }

  async function fetchUserOrders() {
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
  }

  return {
    orders,
    fetchOrders,
    fetchUserOrders,
  };
});
