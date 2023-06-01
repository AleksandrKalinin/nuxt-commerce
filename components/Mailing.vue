<template>
  <div class="w-full min-h-[120px] px-[30px] py-5">
    <h2 class="text-2xl font-semibold mb-5">Настройки</h2>
    <div class="">
      <div class="flex mb-6">
        <h3 class="text-xl font-semibold min-w-[200px]">Время:</h3>
        <select class="text-lg bg-transparent">
          <option value="9">09.00</option>
          <option value="12">12.00</option>
          <option value="15">15.00</option>
          <option value="16">18.00</option>
        </select>
      </div>
      <div class="flex mb-6">
        <h3 class="text-xl font-semibold min-w-[200px]">Периодичность:</h3>
        <select class="text-lg bg-transparent">
          <option value="9">Каждые 24 часа</option>
          <option value="12">Каждую неделю</option>
          <option value="15">Каждый месяц</option>
        </select>
      </div>
      <div class="flex flex-wrap mb-6">
        <h3 class="text-xl font-semibold min-w-[200px]">Шаблон</h3>
        <template v-if="templates.length">
          <div class="cursor-pointer mr-4 mb-4" v-for="item in templates">
            <img
              src="~/assets/svg-file.svg"
              class="mb-3 w-[80px] h-[80px]"
              alt="File"
              loading="eager"
            />
            <p class="text-xl text-center font-semibold">{{ item.name }}</p>
          </div>
        </template>
        <template v-else>
          <div class="w-full text-center text-xl py-5">
            У вас нет готовых шаблонов
          </div>
        </template>
      </div>
      <button
        @click="sendMail"
        class="transition duration-200 hover:bg-sky-500 text-lg px-7 mx-auto py-2 bg-sky-400 text-white rounded-none w-64"
      >
        Подтвердить
      </button>
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
svg {
  color: #0079af;
}
</style>
