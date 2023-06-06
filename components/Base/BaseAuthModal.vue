<template>
  <button
    class="transition duration-200 hover:bg-sky-500 text-lg px-7 py-2 bg-sky-400 text-white rounded-none"
    @click="modalOpen = true"
  >
    Войти
  </button>
  <Teleport to="body">
    <Transition>
      <div
        v-if="modalOpen"
        class="overlay fixed top-0 left-0 overflow-y-auto z-10 w-full h-screen bg-sky-400/75 flex justify-center items-center"
      >
        <div ref="target" class="w-[500px] bg-white p-10 opacity-100">
          <h1 class="text-xl tracking-wider uppercase mb-4 text-center">
            {{ userExists ? "Log into your account" : "Create account" }}
          </h1>
          <form
            class="w-full flex flex-col mb-4"
            @submit.prevent="userExists ? loginUser() : registerUser()"
          >
            <input
              v-model="email"
              type="email"
              class="h-12 bg-white border bg-sky-400 rounded-none mb-4 px-3 text-xl"
            />
            <input
              v-model="password"
              type="password"
              class="h-12 bg-white border bg-sky-400 rounded-none mb-4 px-3 text-xl"
            />
            <div v-if="!userExists" class="flex justify-between py-4">
              <p class="text-lg max-w-[320px]">
                Я хочу получать новости на электронную почту
              </p>
              <BaseToggleInput
                :state="isSubscribed"
                @change="setSubscription"
              />
            </div>
            <input
              type="submit"
              class="transition duration-200 hover:bg-sky-500 bg-sky-400 text-white px-8 py-4 block text-xl cursor-pointer tracking-wider"
              :value="userExists ? 'Log in' : 'Register now'"
            />
          </form>
          <p
            class="cursor-pointer py-4 text-xl text-center"
            @click="userExists = !userExists"
          >
            {{
              !userExists
                ? "I already have an account"
                : "I don't have an account"
            }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useUsersStore } from "~/store/users";

const usersStore = useUsersStore();
const modalOpen = ref(false);
const userExists = ref(true);
const target = ref(null);

onClickOutside(target, () => {
  modalOpen.value = false;
});

const user = useSupabaseUser();

const client = useSupabaseClient();
const password = ref("");
const email = ref("");
const isSubscribed = ref(true);

const setSubscription = () => {
  isSubscribed.value = !isSubscribed.value;
};

const loginUser = async () => {
  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) throw Error;
};

const registerUser = async () => {
  const { error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) {
    throw Error;
  } else {
    usersStore.addUser(email.value, isSubscribed.value);
  }
};

onMounted(() => {
  watchEffect(() => {
    if (user.value) {
      navigateTo("/admin/users");
    }
  });
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
