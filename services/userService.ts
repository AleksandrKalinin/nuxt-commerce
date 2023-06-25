const client = useSupabaseClient();

class UserService {
  async fetchUsers() {
    const { data, error } = await client
      .from("users")
      .select("id, date, email, role");
    return { data, error };
  }

  async addUser(formValues: UserInput) {
    const { error } = await client.from("users").insert([formValues]);
    return error;
  }
}

const userService = new UserService();

export default userService;
