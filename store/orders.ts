import { defineStore } from "pinia";
import { createClient } from "@supabase/supabase-js";

export const useOrdersStore = defineStore("orders", () => {
  const config = useSupabaseConfig();
  const client = createClient(config.URL, config.KEY);
  const orders: Ref<Order[] | null> = ref([]);

  async function fetchOrders() {
    try {
      let { data, error } = await client
        .from("orders")
        .select("id, created_at, items, userId, user, total, status");
      orders.value = data;
    } catch (e) {
      console.log(e);
    }
  }

  return {
    orders,
    fetchOrders,
  };
});
