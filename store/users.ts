import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
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

  const addUser = async (values) => {
    const initialValues = {
      date: new Date(),
      cart: [],
      user_ud: uuidv4(),
    };

    delete values.password;

    const formValues = {
      ...initialValues,
      ...values,
    };

    const { error } = await client.from("users").insert([formValues]);
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
