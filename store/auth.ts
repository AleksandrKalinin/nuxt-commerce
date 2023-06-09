import { defineStore } from "pinia";
import { useToastsStore } from "./toasts";
import { toastHandler } from "~/utils/toastHandler";
import { useUsersStore } from "~/store/users";

export const useAuthStore = defineStore("auth", () => {
  const client = useSupabaseClient();

  const usersStore = useUsersStore();
  const toastsStore = useToastsStore();

  const { addUser } = usersStore;
  const { showErrorToast, showSuccessToast } = toastsStore;

  const loginUser = async (email: string, password: string) => {
    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      const { toast, message } = toastHandler("login-failed");
      showErrorToast(toast, message);
    }
  };

  const registerUser = async (
    email: string,
    password: string,
    isSubscribed: boolean
  ) => {
    const { error } = await client.auth.signUp({
      email,
      password,
    });
    if (error) {
      const { toast, message } = toastHandler("registration-failed");
      showErrorToast(toast, message);
    } else {
      addUser(email, isSubscribed);
      const { toast, message } = toastHandler("registration-successfull");
      showSuccessToast(toast, message);
    }
  };
  return {
    loginUser,
    registerUser,
  };
});
