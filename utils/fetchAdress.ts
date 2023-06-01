let message = [
  {
    name: "support",
    to: "aleksandr_kalinin_1995@mail.ru",
  },
];

const fetchAdress = async () => {
  const client = useSupabaseClient();

  console.log("fire");

  let { data: users, error } = await client
    .from("users")
    .select("email")
    .eq("subscribed", false);

  message = users?.map((email) => {
    const item = {};
    item.to = email;
    return item;
  });
};

export { fetchAdress, message };
