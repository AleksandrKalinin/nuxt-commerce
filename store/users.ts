import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", () => {
  const client = useSupabaseClient();
  const users: Ref<User[] | null> = ref([]);

  async function fetchUsers() {
    const { data, error } = await client
      .from("users")
      .select("id, registration_date, email, role");
    users.value = data;
    if (error) throw error;
  }

  const addUser = async (email: string, isSubscribed: boolean) => {
    const { error } = await client.from("users").insert([
      {
        registration_date: new Date(),
        email,
        role: "user",
        user_id: "",
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
