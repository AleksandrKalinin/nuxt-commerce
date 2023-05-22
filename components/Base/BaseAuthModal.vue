<template>
  <button
    @click="modalOpen = true"
    class="text-lg px-7 py-2 bg-white text-sky-300 rounded-none"
  >
    Open modal
  </button>
  <Teleport to="body">
    <Transition>
      <div
        v-if="modalOpen"
        class="overlay fixed overflow-y-auto z-10 w-full h-screen bg-sky-300/75 flex justify-center items-center"
      >
        <div class="w-[500px] bg-white p-10 opacity-100" ref="target">
          <h1 class="text-xl tracking-wider uppercase mb-4 text-center">
            {{ userExists ? "Log into your account" : "Create account" }}
          </h1>
          <form
            class="w-full flex flex-col mb-4"
            @submit.prevent="userExists ? loginUser() : registerUser()"
          >
            <input
              type="email"
              v-model="email"
              class="h-12 bg-white border bg-sky-300 rounded-none mb-4 px-3 text-xl"
            />
            <input
              type="password"
              v-model="password"
              class="h-12 bg-white border bg-sky-300 rounded-none mb-4 px-3 text-xl"
            />
            <input
              type="submit"
              class="bg-sky-300 text-white px-8 py-4 block text-xl uppercase cursor-pointer"
              :value="userExists ? 'Log in' : 'Register now'"
            />
          </form>
          <p
            @click="userExists = !userExists"
            class="cursor-pointer py-4 text-xl text-center"
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

const loginUser = async () => {
  const { data, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
};

const registerUser = async () => {
  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });
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
