import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", () => {
  const client = useSupabaseClient();
  const users: Ref<User[] | null> = ref([]);

  async function fetchUsers() {
    try {
      let { data, error } = await client
        .from("users")
        .select("id, registration_date, email, role");
      users.value = data;
    } catch (e) {
      console.log(e);
    }
  }

  const addUser = async (email: string) => {
    try {
      const { data, error } = await client.from("users").insert([
        {
          registration_date: new Date(),
          email: email,
          role: "user",
          cart: [],
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    users,
    fetchUsers,
    addUser,
  };
});
