import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useAdminStore = defineStore("admin", () => {
  const client = useSupabaseClient();

  const inputFields = [
    {
      name: "photo",
      dataType: "string",
      elType: "file",
      default: "",
      placeholder: "Drop a photo or select it manually",
    },
    {
      name: "name",
      dataType: "string",
      elType: "input",
      default: "",
      placeholder: "Item name",
    },
    {
      name: "price",
      dataType: "number",
      elType: "input",
      default: "",
      placeholder: "Price",
    },
    {
      name: "manufacturer",
      dataType: "string",
      elType: "input",
      default: "",
      placeholder: "Manufacturer",
    },
    {
      name: "type",
      dataType: "string",
      elType: "input",
      default: "",
      placeholder: "Type",
    },
    {
      name: "battery_type",
      dataType: "string",
      elType: "input",
      default: "",
      placeholder: "Battery type",
    },
    {
      name: "pixels",
      dataType: "number",
      elType: "input",
      default: "",
      placeholder: "Pixels",
    },
    {
      name: "max_FPS_video",
      dataType: "number",
      elType: "input",
      default: "",
      placeholder: "Max. video framerate",
    },
    {
      name: "max_FPS_photo",
      dataType: "number",
      elType: "input",
      default: "",
      placeholder: "Max. photo framerate",
    },
    {
      name: "max_sensitivity",
      dataType: "number",
      elType: "input",
      default: "",
      placeholder: "Max. sensitivity",
    },
    {
      name: "min_sensitivity",
      dataType: "number",
      elType: "input",
      default: "",
      placeholder: "Min. sensitivity",
    },
    {
      name: "max_resolution",
      dataType: "number",
      elType: "input",
      default: "",
      placeholder: "Max. resolution",
    },
    {
      name: "wi_fi",
      dataType: "boolean",
      elType: "select",
      options: [true, false],
      default: "",
      placeholder: "Wi-Fi",
    },
    {
      name: "card_support",
      dataType: "string",
      elType: "input",
      default: "",
      placeholder: "Support card types",
    },
    {
      name: "matrix_type",
      dataType: "string",
      elType: "input",
      default: "",
      placeholder: "Matrix type",
    },
    {
      name: "matrix_size",
      dataType: "string",
      elType: "input",
      default: "",
      placeholder: "Matrix size",
    },
    {
      name: "warranty",
      dataType: "number",
      elType: "input",
      default: "",
      placeholder: "Warranty(months)",
    },
    {
      name: "in_stock",
      dataType: "number",
      elType: "input",
      default: "",
      placeholder: "Items in stock",
    },
    {
      name: "item_code",
      dataType: "number",
      elType: "input",
      default: "",
      placeholder: "Item code",
    },
    {
      name: "is_visible",
      dataType: "boolean",
      elType: "select",
      options: [true, false],
      default: "",
      placeholder: "Visible for customers",
    },
  ];

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
              formValues[key as keyof BaseItemModalForm] = path;
            } catch (e) {
              console.log(e);
            }
          } else {
            formValues[key as keyof BaseItemModalForm] = curVal.value;
          }
        }
      }
    }
    const { data, error } = await client.from("catalog").insert([formValues]);
  };

  const editItem = () => {};

  const toggleVisibility = async (event, id) => {
    const checked = event.target.checked;
    const { error } = await client
      .from("catalog")
      .update({ is_visible: checked })
      .eq("id", id);
  };

  return {
    addItem,
    editItem,
    inputFields,
    selectImage,
    activeItem,
    toggleVisibility,
  };
});
