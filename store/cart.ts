import { defineStore } from "pinia";
import { useCatalogStore } from "./catalog";

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([]);
  const catalogStore = useCatalogStore();
  catalogStore.fetchCatalogItems();

  const totalSum = computed(() => {
    return cartItems.value.reduce((acc, item) => {
      return (acc += item.price * item.amount);
    }, 0);
  });

  const addToCart = (id: number) => {
    const present = cartItems.value.findIndex((el) => el.id === id);
    if (present === -1) {
      const item = catalogStore.catalogItems.find((el) => el.id === id);
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

  const updateAmount = (value, id) => {
    const item = catalogStore.catalogItems.find((el) => el.id === id);
    item.amount = value;
    item.total = item.amount * item.price;
  };

  return {
    cartItems,
    addToCart,
    totalSum,
    updateAmount,
  };
});
