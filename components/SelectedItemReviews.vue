<template>
  <table
    class="w-full border-separate border-spacing-2 sky-blue-400 py-5 px-3 mb-5 bg-white"
  >
    <tbody>
      <tr v-if="reviews?.length" v-for="item in reviews" :key="item.id">
        <td>
          <div class="review py-3">
            <div class="flex justify-between">
              <h6 class="text-lg font-semibold">{{ item.author }}</h6>
              <span>{{ formatDate(item.date) }}</span>
            </div>
            <div class="text-lg py-2">
              {{ item.text }}
            </div>
          </div>
        </td>
      </tr>
      <tr v-else>
        <td><div class="py-8">Отзывов пока нет</div></td>
      </tr>
      <tr>
        <td>
          <form
            class="flex flex-col justify-end"
            @submit.prevent="sendReview()"
          >
            <h3 class="text-2xl font-semibold mb-4">Оставить отзыв</h3>
            <textarea
              v-model="reviewTxt"
              class="w-full resize-none p-3 bg-white border bg-sky-400 min-h-[120px] rounded-none mb-4 p-3 text-lg py-2"
            />
            <input
              type="submit"
              value="Отправить"
              class="self-end bg-sky-400 text-white px-8 max-h-[50px] py-2 text-lg cursor-pointer tracking-wider transition duration-200 hover:bg-sky-500"
            />
          </form>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { useReviewsStore } from "~/store/reviews";
import { formatDate } from "~/utils/formatDate";

const store = useReviewsStore();
const props = defineProps(["selectedItem"]);
const user = useSupabaseUser();

const reviews = computed(() => {
  return props.selectedItem.reviews;
});

const id = computed(() => {
  return props.selectedItem.id;
});

const reviewTxt = ref("");

const sendReview = () => {
  const review = {} as Review;
  review.id = uuidv4();
  review.author = user.value?.email;
  review.date = new Date();
  review.text = reviewTxt.value;
  const updatedReviews = reviews.value;
  updatedReviews.push(review);
  reviewTxt.value = "";
  store.updateReviews(id.value, updatedReviews);
};
</script>

<style scoped></style>
