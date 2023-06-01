import { defineStore } from "pinia";
import { useToastsStore } from "./toasts";

export const useReviewsStore = defineStore("reviews", () => {
  const client = useSupabaseClient();
  const toastsStore = useToastsStore();

  const updateReviews = async (id: number, reviews: Review[]) => {
    try {
      const { error } = await client
        .from("catalog")
        .update({ reviews })
        .eq("id", id);
      if (error) {
        const { toast, message } = toastHandler("add-review-error");
        toastsStore.showErrorToast(toast, message);
      } else {
        const { toast, message } = toastHandler("add-review-success");
        toastsStore.showSuccessToast(toast, message);
      }
    } catch (e) {
      throw e;
    }
  };

  return {
    updateReviews,
  };
});
