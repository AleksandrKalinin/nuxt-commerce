<template>
  <table class="selected-item__reviews selected-reviews">
    <tbody>
      <template v-if="reviews?.length">
        <tr v-for="item in reviews" :key="item.id">
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
      </template>
      <tr v-else>
        <td><div class="py-8">No reviews yet</div></td>
      </tr>
      <tr>
        <td>
          <form
            class="selected-reviews__form reviews-form"
            @submit.prevent="sendReview()"
          >
            <h3 class="reviews-form__title">Leave review</h3>
            <textarea v-model="reviewTxt" class="reviews-form__text" />
            <input
              type="submit"
              value="Отправить"
              class="reviews-form__submit"
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

const props = defineProps<{ selectedItem: CatalogItem }>();

const store = useReviewsStore();
const { updateReviews } = store;
const user = useSupabaseUser();
const reviewTxt = ref("");

const reviews = computed(() => {
  return props.selectedItem.reviews;
});

const id = computed(() => {
  return props.selectedItem.id;
});

const sendReview = () => {
  const review = {} as Review;
  review.id = uuidv4();
  review.author = user.value?.email;
  review.date = new Date();
  review.text = reviewTxt.value;
  const updatedReviews = reviews.value;
  updatedReviews.push(review);
  reviewTxt.value = "";
  updateReviews(id.value, updatedReviews);
};
</script>

<style scoped lang="css">
.selected-item__reviews {
  @apply w-full border-separate border-spacing-2 py-5 px-3 mb-5 bg-white;
}
.selected-reviews__form {
  @apply flex flex-col justify-end;
}
.reviews-title {
  @apply text-2xl font-semibold mb-4;
}
.reviews-form__text {
  @apply w-full resize-none p-3 bg-white border min-h-[120px] rounded-none mb-4 p-3 text-lg py-2;
}

.reviews-form__submit {
  @apply self-end bg-sky-400 text-white px-8 max-h-[50px] py-2 text-lg cursor-pointer tracking-wider transition duration-200 hover:bg-sky-500;
}
</style>
