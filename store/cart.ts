import { defineStore, storeToRefs } from "pinia";
import { useCatalogStore } from "./catalog";
import { useToastsStore } from "./toasts";
import { usePopupStore } from "./popup";
import { toastHandler } from "~/utils/toastHandler";

export const useCartStore = defineStore("cart", () => {
  const client = useSupabaseClient();
  const userId: Ref<string | undefined> = ref("");
  const userEmail: Ref<string | undefined> = ref("");
  const cartItems: Ref<Array<CartItem> | []> = ref([]);
  const cartLoaded = ref(false);

  const toastsStore = useToastsStore();
  const popupStore = usePopupStore();
  const catalogStore = useCatalogStore();

  const { catalogItems } = storeToRefs(catalogStore);

  const { fetchCatalogItems } = catalogStore;
  const { openPopup } = popupStore;

  const { showErrorToast, showSuccessToast } = toastsStore;

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
    cartItems.value = data[0].cart;
    cartLoaded.value = true;
  };

  const totalSum = computed(() => {
    return (cartItems.value as CartItem[]).reduce(
      (acc: number, item: CartItem) => {
        if (item.amount) {
          return (acc += item.price * item.amount);
        } else {
          return (acc += item.price);
        }
      },
      0
    );
  });

  const addToCart = async (id: number) => {
    fetchCatalogItems();
    const {
      data: { user },
    } = await client.auth.getUser();
    if (user) {
      const present = cartItems.value.findIndex((el: CartItem) => el.id === id);
      if (present === -1) {
        const item = catalogItems.value?.find(
          (el: CatalogItem) => el.id === id
        ) as unknown as CartItem;
        item.amount = 1;
        item.total = item.amount * item.price;
        (cartItems.value as CartItem[]).push(item);
      } else {
        cartItems.value[present].amount =
          Number(cartItems.value[present].amount) + 1;
        cartItems.value[present].total =
          Number(cartItems.value[present].amount) *
          cartItems.value[present].price;
      }
      const { error } = await client
        .from("users")
        .update({ cart: cartItems.value })
        .eq("user_id", userId.value);
      if (error) {
        throw error;
      } else {
        const { toast, message } = toastHandler("add-to-cart");
        showSuccessToast(toast, message);
      }
    } else {
      const { toast, message } = toastHandler("not-authorized");
      showErrorToast(toast, message);
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
    openPopup("You order was succesfully placed!", "Go to account");
  };

  return {
    cartItems,
    cartLoaded,
    addToCart,
    totalSum,
    updateAmount,
    deleteItem,
    getCartItems,
    placeOrder,
  };
});
