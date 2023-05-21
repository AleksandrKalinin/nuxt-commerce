<template>
  <button @click="modalOpen = true">Open modal</button>
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
            class="w-full flex flex-col"
            @submit.prevent="userExists ? loginUser() : registerUser()"
          >
            <input
              type="email"
              class="h-12 bg-white border bg-sky-300 rounded-none mb-4 px-3 text-xl"
            />
            <input
              type="password"
              class="h-12 bg-white border bg-sky-300 rounded-none mb-4 px-3 text-xl"
            />
            <input
              type="submit"
              class="bg-sky-300 text-white px-8 py-6 block text-xl uppercase cursor-pointer"
              :value="userExists ? 'Log in' : 'Register now'"
            />
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const modalOpen = ref(false);

const target = ref(null);

onClickOutside(target, () => {
  modalOpen.value = false;
});

const userExists = ref(false);

const loginUser = () => {
  console.log("login");
};

const registerUser = () => {
  console.log("register");
};
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
