import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { useToastsStore } from "./toasts";
import { useUsersStore } from "./users";
import { useOrdersStore } from "./orders";
import { useDiscountsStore } from "./discounts";
import { useCatalogStore } from "./catalog";
import { useAuthStore } from "./auth";
import { toastHandler } from "~/utils/toastHandler";

export const useFormStore = defineStore("form", () => {
  const client = useSupabaseClient();

  const catalogStore = useCatalogStore();
  const usersStore = useUsersStore();
  const ordersStore = useOrdersStore();
  const discountsStore = useDiscountsStore();
  const authStore = useAuthStore();
  const toastsStore = useToastsStore();

  const { showErrorToast, showSuccessToast } = toastsStore;
  const { addItem, fetchCatalogItems } = catalogStore;
  const { addOrder, fetchOrders } = ordersStore;
  const { fetchUsers } = usersStore;
  const { addDiscount, fetchDiscounts } = discountsStore;
  const { registerUser } = authStore;

  const selectedImage: Ref<File | null> = ref(null);

  const checkIfFilled = (values: any) => {
    for (const key in values) {
      if (values[key] === "") {
        return false;
      }
    }
    return true;
  };

  const formatFormValues = async (
    values: HTMLFormElement,
    currentPage: string
  ) => {
    const formValues = {} as any;

    const valuesObject = Array.from(values).reduce((obj, item) => {
      const convertedItem = item as unknown as ValueElement;
      return Object.assign(obj, { [convertedItem.name]: convertedItem.value });
    }, {}) as CatalogItem;

    if (values) {
      for (let i = 0; i < values.length; i++) {
        const curVal = values[i] as HTMLInputElement;
        if (curVal.type !== "submit") {
          const key = curVal.name;
          if (curVal.type === "file") {
            const filename: string = uuidv4();

            const { data, error } = await client.storage
              .from("catalog")
              .upload(`${filename}.png`, selectedImage.value!, {
                cacheControl: "3600",
                upsert: false,
                contentType: "image/png",
              });
            if (data?.path) {
              const path = client.storage
                .from("catalog")
                .getPublicUrl(data?.path).data.publicUrl;
              if (error) {
                const { toast, message } = toastHandler(
                  "upload-to-storage-error"
                );
                showErrorToast(toast, message);
              } else {
                formValues[key as keyof typeof valuesObject] = path;
              }
            }
          } else {
            formValues[key as keyof typeof valuesObject] = curVal.value;
          }
        }
      }
    }
    if (checkIfFilled(formValues)) {
      callFunction(formValues, currentPage);
    } else {
      const { toast, message } = toastHandler("empty-form-fields");
      showErrorToast(toast, message);
    }
  };

  const callFunction = (values: FormValues, currentPage: string) => {
    switch (currentPage) {
      case "catalog":
        addItem(values);
        fetchCatalogItems();
        break;
      case "orders":
        addOrder(values);
        fetchOrders();
        break;
      case "users":
        registerUser(values);
        fetchUsers();
        break;
      case "discounts":
        addDiscount(values);
        fetchDiscounts();
        break;
    }
  };

  return {
    formatFormValues,
  };
});
