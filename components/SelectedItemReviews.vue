<template>
  <table class="selected-item__reviews selected-reviews">
    <tbody>
      <template v-if="reviews?.length">
        <tr v-for="item in reviews" :key="item.id">
          <td>
            <div class="review py-3">
              <div class="flex justify-between mb-2">
                <div>
                  <h6 class="text-lg font-semibold">{{ item.author }}</h6>
                  <star-rating
                    v-model:rating="item.rating"
                    star-size="15"
                    read-only
                    :show-rating="false"
                  />
                </div>
                <span>{{ formatDate(item.date) }}</span>
              </div>
              <div class="text-lg py-2">
                {{ item.description }}
              </div>
            </div>
          </td>
        </tr>
      </template>
      <tr v-else>
        <td><div class="py-8">No reviews yet</div></td>
      </tr>
      <tr v-if="isRated === -1">
        <td>
          <form
            class="selected-reviews__form reviews-form"
            @submit.prevent="sendReview()"
          >
            <h3 class="reviews-form__title mb-3 font-semibold text-lg">
              Leave review
            </h3>
            <div class="reviews-form__block flex mb-2">
              <h4 class="font-semibold text-normal min-w-[130px]">
                Your rating
              </h4>
              <star-rating
                v-model:rating="reviewRating"
                star-size="20"
                show-rating="false"
              />
            </div>
            <div class="reviews-form__block flex mb-2">
              <h4 class="font-semibold text-normal min-w-[130px]">
                Your review
              </h4>
              <textarea
                v-model="reviewTxt"
                class="reviews-form__text"
                placeholder="Your review"
              />
            </div>
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
import StarRating from "vue-star-rating";
import { useReviewsStore } from "~/store/reviews";
import { formatDate } from "~/utils/formatDate";

const props = defineProps<{ selectedItem: CatalogItem; reviews: Review[] }>();

const store = useReviewsStore();
const { updateReviews } = store;

const user = useSupabaseUser();

const reviewTxt = ref("");
const reviewRating = ref(0);

const reviews = computed(() => {
  return props.reviews;
});

const isRated = computed(() => {
  if (reviews.value) {
    return reviews.value.findIndex((el) => {
      return el.author === user.value?.email;
    });
  } else return -1;
});

const sendReview = () => {
  const review = {} as Review;
  review.date = new Date();
  review.item_id = props.selectedItem.id;
  review.user_id = 3;
  review.rating = reviewRating.value;
  review.description = reviewTxt.value;
  review.author = user.value?.email;
  updateReviews(review);
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
