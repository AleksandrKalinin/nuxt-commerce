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
    discounts.value = formatDiscounts(data);
    if (error) throw error;
  };

  const formatDiscounts = (data: Discount[]) => {
    return data.map((item: Discount) => {
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

  const addDiscount = async (values: FormValues) => {
    const { error } = await client.from("discounts").insert([values]);
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
