import { defineStore } from "pinia";
import { useToastsStore } from "./toasts";

export const useRatingsStore = defineStore("ratings", () => {
  const client = useSupabaseClient();
  const toastsStore = useToastsStore();
  const { showErrorToast, showSuccessToast } = toastsStore;

  const ratings: Ref<Review[] | null> = ref(null);

  const fetchRating = async (id: number) => {
    const { data, error } = await client
      .from("ratings")
      .select("*")
      .eq("item_id", id);
    if (error) throw Error;
    else {
      ratings.value = data;
    }
  };

  const updateReviews = async (review: Review) => {
    const { error } = await client.from("ratings").insert([review]);
    if (error) {
      const { toast, message } = toastHandler("add-review-error");
      showErrorToast(toast, message);
    } else {
      const { toast, message } = toastHandler("add-review-success");
      showSuccessToast(toast, message);
    }
  };

  return {
    fetchRating,
    updateReviews,
    ratings,
  };
});
