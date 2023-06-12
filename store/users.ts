import { defineStore } from "pinia";
import { useToastsStore } from "./toasts";
import { toastHandler } from "~/utils/toastHandler";

export const useUsersStore = defineStore("users", () => {
  const client = useSupabaseClient();
  const users: Ref<User[] | null> = ref([]);

  const toastsStore = useToastsStore();

  const { showErrorToast } = toastsStore;

  const fetchUsers = async () => {
    const { data, error } = await client
      .from("users")
      .select("id, date, email, role");
    users.value = data;
    if (error) throw error;
  };

  const addUser = async (
    email: string,
    isSubscribed: boolean,
    userId: string,
    role: string
  ) => {
    const { error } = await client.from("users").insert([
      {
        date: new Date(),
        email,
        role,
        user_id: userId,
        cart: [],
        subscribed: isSubscribed,
      },
    ]);
    if (error) {
      const { toast, message } = toastHandler("registration-failed");
      showErrorToast(toast, message);
    }
  };

  return {
    users,
    fetchUsers,
    addUser,
  };
});
