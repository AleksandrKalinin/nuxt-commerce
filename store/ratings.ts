import { defineStore } from "pinia";

export const useRatingsStore = defineStore("ratings", () => {
  const client = useSupabaseClient();

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

  return {
    fetchRating,
    ratings,
  };
});
