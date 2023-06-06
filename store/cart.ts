import { defineStore } from "pinia";
import { useCatalogStore } from "./catalog";
import { useToastsStore } from "./toasts";
import { usePopupStore } from "./popup";
import { toastHandler } from "~/utils/toastHandler";

export const useCartStore = defineStore("cart", () => {
  const client = useSupabaseClient();
  const userId: Ref<string | undefined> = ref("");
  const userEmail: Ref<string | undefined> = ref("");
  const dbItems: any = ref([]);
  const toastsStore = useToastsStore();
  const popupStore = usePopupStore();
  const catalogStore = useCatalogStore();
  catalogStore.fetchCatalogItems();

  const getCartItems = async () => {
    const {
      data: { user },
    } = await client.auth.getUser();
    userEmail.value = user?.email;
    userId.value = user?.id;
    const { data, error } = await client
      .from("users")
      .select("cart")
      .eq("user_id", user?.id);
    if (error) throw error;
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
    const {
      data: { user },
    } = await client.auth.getUser();
    if (user) {
      const present = dbItems.value.findIndex((el: CartItem) => el.id === id);
      if (present === -1) {
        const item = catalogStore.catalogItems?.find(
          (el: CatalogItem) => el.id === id
        ) as unknown as CartItem;
        item.amount = 1;
        item.total = item.amount * item.price;
        dbItems.value.push(item);
      } else {
        dbItems.value[present].amount =
          Number(dbItems.value[present].amount) + 1;
        dbItems.value[present].total =
          dbItems.value[present].amount * dbItems.value[present].price;
      }
      const { error } = await client
        .from("users")
        .update({ cart: cartItems.value })
        .eq("user_id", userId.value);
      if (error) {
        throw error;
      } else {
        const { toast, message } = toastHandler("add-to-cart");
        toastsStore.showSuccessToast(toast, message);
      }
    } else {
      const { toast, message } = toastHandler("not-authorized");
      toastsStore.showErrorToast(toast, message);
    }
  };

  const updateAmount = async (value: number, id: number) => {
    const item = cartItems.value.find(
      (el: CartItem) => el.id === id
    ) as unknown as CartItem;
    item.amount = value;
    item.total = item.amount * item.price;
    const { error } = await client
      .from("users")
      .update({ cart: cartItems.value })
      .eq("user_id", userId.value);
    if (error) throw error;
  };

  const deleteItem = async (id: number) => {
    const newItems = cartItems.value.filter((item: CartItem) => item.id !== id);
    const { error } = await client
      .from("users")
      .update({ cart: newItems })
      .eq("user_id", userId.value);
    if (error) throw error;
  };

  const placeOrder = async () => {
    const newOrder = {} as Order;
    newOrder.created_at = new Date();
    newOrder.items = cartItems.value;
    newOrder.userId = userId.value as string;
    newOrder.user = userEmail.value as string;
    newOrder.total = totalSum.value;
    newOrder.status = "Pending" as OrderStatus.Pending;
    const { error } = await client.from("orders").insert([newOrder]);
    if (error) throw error;
    const { error: updateError } = await client
      .from("users")
      .update({ cart: [] })
      .eq("user_id", userId.value);
    if (updateError) {
      throw updateError;
    }
    popupStore.openPopup(
      "You order was succesfully placed!",
      "В личный кабинет"
    );
  };

  return {
    cartItems,
    addToCart,
    totalSum,
    updateAmount,
    deleteItem,
    getCartItems,
    placeOrder,
  };
});
