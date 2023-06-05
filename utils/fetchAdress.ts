let message = [
  {
    name: "support",
    to: "aleksandr_kalinin_1995@mail.ru",
  },
];

const fetchAdress = async () => {
  const client = useSupabaseClient();

  try {
    let { data: users, error } = await client
      .from("users")
      .select("email")
      .eq("subscribed", false);
    if (error) {
      throw error;
    } else {
      message = users?.map((email) => {
        const item = {};
        item.to = email;
        return item;
      });
    }
  } catch (e) {
    throw e;
  }
};

export { fetchAdress, message };
