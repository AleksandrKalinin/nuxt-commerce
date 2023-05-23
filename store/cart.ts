import { defineStore } from "pinia";
import { useCatalogStore } from "./catalog";

export const useCartStore = defineStore("cart", () => {
  const client = useSupabaseClient();
  const userId = ref("");
  const dbItems: any = ref([]);
  const catalogStore = useCatalogStore();
  catalogStore.fetchCatalogItems();

  const getCartItems = async () => {
    const {
      data: { user },
    } = await client.auth.getUser();

    let { data, error } = await client
      .from("users")
      .select("cart")
      .eq("user_id", user?.id);
    dbItems.value = data[0].cart;
  };

  const cartItems = computed(() => {
    return dbItems.value.map((el) => {
      const item = el.item;
      item.amount = el.amount;
      item.total = el.amount * item.price;
      return item;
    });
  });

  const totalSum = computed(() => {
    return cartItems.value.reduce((acc: number, item: CartItem) => {
      return (acc += item.price * item.amount);
    }, 0);
  });

  const addToCart = (id: number) => {
    const present = cartItems.value.findIndex((el: CartItem) => el.id === id);
    if (present === -1) {
      const item = catalogStore.catalogItems.find(
        (el: CatalogItem) => el.id === id
      ) as unknown as CartItem;
      item.amount = 1;
      cartItems.value.push(item);
      item.total = item.amount * item.price;
    } else {
      cartItems.value[present].amount =
        Number(cartItems.value[present].amount) + 1;
      cartItems.value[present].total =
        cartItems.value[present].amount * cartItems.value[present].price;
    }
  };

  const updateAmount = (value: number, id: number) => {
    const item = cartItems.value.find(
      (el: CartItem) => el.id === id
    ) as unknown as CartItem;
    item.amount = value;
    item.total = item.amount * item.price;
  };

  const deleteItem = (id: number) => {
    const newItems = cartItems.value.filter((item) => item.id !== id);
    cartItems.value = newItems;
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
