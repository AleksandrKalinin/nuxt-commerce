import { defineStore } from "pinia";
import { useCatalogStore } from "./catalog";

export const useCartStore = defineStore("cart", () => {
  const client = useSupabaseClient();
  const userId: Ref<string | undefined> = ref("");
  const dbItems: any = ref([]);
  const catalogStore = useCatalogStore();
  catalogStore.fetchCatalogItems();

  const getCartItems = async () => {
    const {
      data: { user },
    } = await client.auth.getUser();
    userId.value = user?.id;
    let { data, error } = await client
      .from("users")
      .select("cart")
      .eq("user_id", user?.id);
    dbItems.value = data[0].cart;
  };

  const cartItems = computed(() => {
    return dbItems.value.map((item: any) => {
      return item;
    });
  });

  const totalSum = computed(() => {
    return cartItems.value.reduce((acc: number, item: CartItem) => {
      return (acc += item.price * item.amount);
    }, 0);
  });

  const addToCart = async (id: number) => {
    const present = dbItems.value.findIndex((el: CartItem) => el.id === id);
    if (present === -1) {
      const item = catalogStore.catalogItems?.find(
        (el: CatalogItem) => el.id === id
      ) as unknown as CartItem;
      item.amount = 1;
      item.total = item.amount * item.price;
      dbItems.value.push(item);
    } else {
      dbItems.value[present].amount = Number(dbItems.value[present].amount) + 1;
      dbItems.value[present].total =
        dbItems.value[present].amount * dbItems.value[present].price;
    }
    try {
      const { error } = await client
        .from("users")
        .update({ cart: cartItems.value })
        .eq("user_id", userId.value);
    } catch (e) {
      console.log(e);
    }
  };

  const updateAmount = async (value: number, id: number) => {
    const item = cartItems.value.find(
      (el: CartItem) => el.id === id
    ) as unknown as CartItem;
    item.amount = value;
    item.total = item.amount * item.price;
    try {
      const { error } = await client
        .from("users")
        .update({ cart: cartItems.value })
        .eq("user_id", userId.value);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteItem = async (id: number) => {
    const newItems = cartItems.value.filter((item: CartItem) => item.id !== id);
    try {
      const { error } = await client
        .from("users")
        .update({ cart: newItems })
        .eq("user_id", userId.value);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    cartItems,
    addToCart,
    totalSum,
    updateAmount,
    deleteItem,
    getCartItems,
  };
});
