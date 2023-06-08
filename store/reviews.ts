import { defineStore } from "pinia";
import { useToastsStore } from "./toasts";

export const useReviewsStore = defineStore("reviews", () => {
  const client = useSupabaseClient();
  const toastsStore = useToastsStore();
  const { showErrorToast, showSuccessToast } = toastsStore;

  const updateReviews = async (review: Review) => {
    const { error } = await client.from("ratings").insert([review]);
    if (error) {
      const { toast, message } = toastHandler("add-review-error");
      showErrorToast(toast, message);
    } else {
      const { toast, message } = toastHandler("add-review-success");
      showSuccessToast(toast, message);
    }
    /*
    const { error } = await client
      .from("catalog")
      .update({ reviews })
      .eq("id", id);
    if (error) {
      const { toast, message } = toastHandler("add-review-error");
      showErrorToast(toast, message);
    } else {
      const { toast, message } = toastHandler("add-review-success");
      showSuccessToast(toast, message);
    } */
  };

  return {
    updateReviews,
  };
});
