import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { toastHandler } from "~/utils/toastHandler";
import { useToastsStore } from "./toasts";
import { INPUT_FIELDS } from "~/constants";

export const useAdminStore = defineStore("admin", () => {
  const client = useSupabaseClient();
  const toastsStore = useToastsStore();

  const selectedImage = ref(null);

  const selectImage = (e: any) => {
    selectedImage.value = e.target.files[0];
  };

  const activeItem = ref(false);

  const addItem = async (values: HTMLFormElement) => {
    const formValues = {
      date: new Date().toISOString(),
      popularity: 0,
      rating: 0,
    } as any;

    if (values) {
      for (let i = 0; i < values.length; i++) {
        const curVal = values[i] as HTMLInputElement;
        if (curVal.type !== "submit") {
          const key = curVal.name;
          if (curVal.type === "file") {
            const filename: string = uuidv4();
            try {
              const { data, error } = await client.storage
                .from("catalog")
                .upload(`${filename}.png`, selectedImage.value!, {
                  cacheControl: "3600",
                  upsert: false,
                  contentType: "image/png",
                });
              const path = client.storage
                .from("catalog")
                .getPublicUrl(data?.path!).data.publicUrl;
              formValues[key as keyof BaseAddModalForm] = path;
              if (error) throw error;
            } catch (e) {
              throw e;
            }
          } else {
            formValues[key as keyof BaseAddModalForm] = curVal.value;
          }
        }
      }
    }
    try {
      const { error } = await client.from("catalog").insert([formValues]);
      if (error) {
        const { toast, message } = toastHandler(error.code);
        toastsStore.showErrorToast(toast, message);
      } else {
        const { toast, message } = toastHandler("add-to-database");
        toastsStore.showSuccessToast(toast, message);
      }
    } catch (e) {
      throw e;
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const { error } = await client.from("catalog").delete().eq("id", id);
      if (error) {
        const { toast, message } = toastHandler("item-delete-error");
        toastsStore.showErrorToast(toast, message);
      } else {
        const { toast, message } = toastHandler("item-delete-success");
        toastsStore.showSuccessToast(toast, message);
      }
    } catch (e) {
      throw e;
    }
  };

  const editItem = async (values: HTMLFormElement, id: number) => {
    const formValues = {
      date: new Date().toISOString(),
      popularity: 0,
      rating: 0,
    } as any;

    if (values) {
      for (let i = 0; i < values.length; i++) {
        const curVal = values[i] as HTMLInputElement;
        if (curVal.type !== "submit") {
          const key = curVal.name;
          if (curVal.type === "file") {
            const filename: string = uuidv4();
            try {
              const { data, error } = await client.storage
                .from("catalog")
                .upload(`${filename}.png`, selectedImage.value!, {
                  cacheControl: "3600",
                  upsert: false,
                  contentType: "image/png",
                });
              const path = client.storage
                .from("catalog")
                .getPublicUrl(data?.path!).data.publicUrl;
              formValues[key as keyof BaseAddModalForm] = path;
              if (error) throw error;
            } catch (e) {
              throw e;
            }
          } else {
            formValues[key as keyof BaseAddModalForm] = curVal.value;
          }
        }
      }
    }
    try {
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
    } catch (e) {
      throw e;
    }
  };

  const toggleVisibility = async (event: Event, id: number) => {
    const target = event.target as HTMLInputElement;
    const checked = target?.checked;
    try {
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
    } catch (e) {
      throw e;
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
