import { defineStore } from "pinia";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { useToastsStore } from "./toasts";
import { toastHandler } from "~/utils/toastHandler";
import discountService from "~/services/discountService";

export const useDiscountsStore = defineStore("discounts", () => {
  const client = useSupabaseClient();
  let realtimeChannel: RealtimeChannel;

  const discounts: Ref<Discount[] | null> = ref([]);

  const toastsStore = useToastsStore();

  const { showErrorToast } = toastsStore;

  const fetchDiscounts = async () => {
    const { data, error } = await discountService.fetchDiscounts();
    if (error) {
      throw error;
    } else {
      if (data) {
        discounts.value = formatDiscounts(data);
      }
    }
  };

  const subscribeToUpdates = () => {
    realtimeChannel = client
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "discounts" },
        () => fetchDiscounts()
      );
    realtimeChannel.subscribe();
  };

  const unsubscribeFromUpdates = () => {
    client.removeChannel(realtimeChannel);
  };

  const formatDiscounts = (data: Discount[]) => {
    return data?.map((item: Discount) => {
      item.is_active = ifDateInRange(
        item.date_start,
        item.date_end,
        new Date()
      );
      return item;
    });
  };

  const ifDateInRange = (a: Date, b: Date, date: Date) => {
    const start = new Date(a);
    const end = new Date(b);
    if (date > start && date < end) {
      return true;
    } else {
      return false;
    }
  };

  const addDiscount = async (values: DiscountInput) => {
    const error = await discountService.addDiscount(values);
    if (error) {
      const { toast, message } = toastHandler("discount-create-error");
      showErrorToast(toast, message);
    }
  };

  return {
    addDiscount,
    fetchDiscounts,
    discounts,
    subscribeToUpdates,
    unsubscribeFromUpdates,
  };
});
