const client = useSupabaseClient();

class AuthService {
  async loginUser(email: string, password: string) {
    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });
    return error;
  }

  async registerUser(email: string, password: string) {
    const { error } = await client.auth.signUp({
      email,
      password,
    });
    return error;
  }
}

const authService = new AuthService();

export default authService;
