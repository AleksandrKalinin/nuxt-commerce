export const useIfAuthorized = () => {
  const user = ref(null);
  const client = useSupabaseClient();
  const useIfAuthorized = async () => {
    const {
      data: { user },
    } = await client.auth.getUser();
    if (user) {
      return user.id;
    } else {
      return null;
    }
  };
  return {
    useIfAuthorized,
  };
};
