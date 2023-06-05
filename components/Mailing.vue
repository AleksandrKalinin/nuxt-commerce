<template>
  <div class="mailing">
    <h2 class="mailing__title">Настройки</h2>
    <div>
      <div class="mailing__item mailing-item">
        <h3 class="mailing-item__title">Время:</h3>
        <select class="text-lg bg-transparent">
          <option value="9">09.00</option>
          <option value="12">12.00</option>
          <option value="15">15.00</option>
          <option value="16">18.00</option>
        </select>
      </div>
      <div class="mailing__item mailing-item">
        <h3 class="mailing-item__title">Периодичность:</h3>
        <select class="text-lg bg-transparent">
          <option value="9">Каждые 24 часа</option>
          <option value="12">Каждую неделю</option>
          <option value="15">Каждый месяц</option>
        </select>
      </div>
      <div class="mailing__item mailing-item">
        <h3 class="mailing-item__title">Шаблон</h3>
        <template v-if="templates.length">
          <div class="mailing-template" v-for="item in templates">
            <img
              src="~/assets/svg-file.svg"
              class="mailing-template__image"
              alt="File"
              loading="eager"
            />
            <p class="mailing-template__name">{{ item.name }}</p>
          </div>
        </template>
        <template v-else>
          <div class="mailing-template__placeholder">
            У вас нет готовых шаблонов
          </div>
        </template>
      </div>
      <button @click="sendMail" class="button_regular">Подтвердить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEmailStore } from "~/store/emailbuider";

const emailStore = useEmailStore();

const templates = computed(() => {
  return emailStore.templates;
});

onMounted(() => {
  emailStore.fetchTemplates();
});

const mail = useMail();

const sendMail = () => {
  mail.send({
    from: "John Doe",
    subject: "Incredible",
    text: "This is an incredible test message",
    to: "1995kalininaleksandr@gmail.com",
  });
};
</script>

<style scoped>
.mailing {
  @apply w-full min-h-[120px] px-[30px] py-5;
}

.mailing__title {
  @apply text-2xl font-semibold mb-5;
}

.mailing__item {
  @apply flex mb-6;
}

.mailing-item__title {
  @apply text-xl font-semibold min-w-[200px];
}

.mailing-template {
  @apply cursor-pointer mr-4 mb-4;
}

.mailing-template__image {
  @apply mb-3 w-[80px] h-[80px];
}

.mailing-template__name {
  @apply text-xl text-center font-semibold;
}

.mailing-template__placeholder {
  @apply w-full text-center text-xl py-5;
}

svg {
  color: #0079af;
}
</style>
