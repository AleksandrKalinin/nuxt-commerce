import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { useToastsStore } from "./toasts";
import { toastHandler } from "~/utils/toastHandler";
import { INPUT_FIELDS } from "~/constants";

export const useAdminStore = defineStore("admin", () => {
  const client = useSupabaseClient();
  const toastsStore = useToastsStore();

  const selectedImage: Ref<File | null> = ref(null);

  const selectImage = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      selectedImage.value = target.files[0];
    }
  };

  const activeItem = ref(false);

  const addItem = async (values: HTMLFormElement) => {
    const formValues = {
      date: new Date().toISOString(),
      popularity: 0,
      rating: 0,
    } as CatalogItem;

    const valuesObject = Array.from(values).reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.value }),
      {}
    ) as CatalogItem;

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
              formValues[key as keyof typeof valuesObject] = path;

              if (error) throw error;
            }
          } else {
            formValues[key as keyof typeof valuesObject] = curVal.value;
          }
        }
      }
    }

    const { error } = await client.from("catalog").insert([formValues]);

    if (error) {
      const { toast, message } = toastHandler(error.code);
      toastsStore.showErrorToast(toast, message);
    } else {
      const { toast, message } = toastHandler("add-to-database");
      toastsStore.showSuccessToast(toast, message);
    }
  };

  const deleteItem = async (id: number) => {
    const { error } = await client.from("catalog").delete().eq("id", id);
    if (error) {
      const { toast, message } = toastHandler("item-delete-error");
      toastsStore.showErrorToast(toast, message);
    } else {
      const { toast, message } = toastHandler("item-delete-success");
      toastsStore.showSuccessToast(toast, message);
    }
  };

  const editItem = async (values: HTMLFormElement, id: number) => {
    const formValues = {
      date: new Date().toISOString(),
      popularity: 0,
      rating: 0,
    } as CatalogItem;

    const valuesObject = Array.from(values).reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.value }),
      {}
    ) as CatalogItem;

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
                .getPublicUrl(data.path).data.publicUrl;
              formValues[key as keyof typeof valuesObject] = path;
              if (error) throw error;
            }
          } else {
            formValues[key as keyof typeof valuesObject] = curVal.value;
          }
        }
      }
    }
    const { error } = await client
      .from("catalog")
      .update([formValues])
      .eq("id", id);
    if (error) {
      const { toast, message } = toastHandler("item-update-error");
      toastsStore.showErrorToast(toast, message);
    } else {
      const { toast, message } = toastHandler("item-update-success");
      toastsStore.showSuccessToast(toast, message);
    }
  };

  const toggleVisibility = async (event: Event, id: number) => {
    const target = event.target as HTMLInputElement;
    const checked = target?.checked;
    const { error } = await client
      .from("catalog")
      .update({ is_visible: checked })
      .eq("id", id);
    if (error) {
      const { toast, message } = toastHandler(error.code);
      toastsStore.showErrorToast(toast, message);
    } else {
      const { toast, message } = toastHandler(
        checked ? "item-visible" : "item-hidden"
      );
      toastsStore.showSuccessToast(toast, message);
    }
  };

  return {
    addItem,
    editItem,
    deleteItem,
    INPUT_FIELDS,
    selectImage,
    activeItem,
    toggleVisibility,
  };
});
