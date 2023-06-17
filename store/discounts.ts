import { defineStore } from "pinia";
import { useToastsStore } from "./toasts";
import { toastHandler } from "~/utils/toastHandler";

export const useDiscountsStore = defineStore("discounts", () => {
  const client = useSupabaseClient();
  const discounts: Ref<Discount[] | null> = ref([]);

  const toastsStore = useToastsStore();

  const { showErrorToast } = toastsStore;

  const fetchDiscounts = async () => {
    const { data, error } = await client
      .from("discounts")
      .select("id, product_id, date_start, date_end, discount_number");
    discounts.value = data;
    if (error) throw error;
  };

  const addDiscount = async (
    product_id: number,
    date_start: Date,
    date_end: Date,
    discount_number: number
  ) => {
    const { error } = await client.from("discount").insert([
      {
        product_id,
        date_start,
        date_end,
        discount_number,
      },
    ]);
    if (error) {
      const { toast, message } = toastHandler("discount-create-error");
      showErrorToast(toast, message);
    }
  };

  return {
    addDiscount,
    fetchDiscounts,
    discounts,
  };
});
