import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useUsersStore = defineStore("users", () => {
  const client = useSupabaseClient();
  const users: Ref<User[] | null> = ref([]);

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
    if (error) throw error;
  };

  return {
    users,
    fetchUsers,
    addUser,
  };
});
