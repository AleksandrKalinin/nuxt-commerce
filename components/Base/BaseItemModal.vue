<template>
  <button
    @click="modalOpen = true"
    class="transition duration-200 hover:bg-sky-500 text-lg px-7 mx-auto py-2 bg-sky-400 text-white rounded-none"
  >
    Добавить
  </button>
  <Teleport to="body">
    <Transition>
      <div
        v-if="modalOpen"
        class="overlay fixed overflow-y-auto z-10 w-full h-screen bg-sky-400/75 flex justify-center items-center"
      >
        <div
          class="w-[700px] h-[calc(100vh_-_100px)] overflow-y-auto bg-white p-10 opacity-100"
          ref="target"
        >
          <form
            ref="form"
            class="w-full flex flex-col mb-4"
            @submit.prevent="getValues"
          >
            <template v-for="item in inputFields">
              <input
                v-if="item.elType === 'input'"
                v-model="item.default"
                :name="item.name"
                :placeholder="item.placeholder"
                class="h-12 bg-white border bg-sky-400 rounded-none mb-4 px-3 text-xl"
              />
              <input
                v-else-if="item.elType === 'file'"
                type="file"
                @change="selectImage"
                :name="item.name"
                :placeholder="item.placeholder"
                class="file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xl file:bg-sky-400 file:text-white hover:file:bg-sky-500 cursor-pointer mb-4"
              />
              <select
                v-else-if="item.elType === 'select'"
                :name="item.name"
                class="h-12 bg-white border bg-sky-400 rounded-none mb-4 px-3 text-xl"
              >
                <option disabled selected>{{ item.placeholder }}</option>
                <option v-for="option in item.options" :value="option">
                  {{ option }}
                </option>
              </select>
            </template>
            <input
              type="submit"
              class="bg-sky-400 text-white px-8 py-4 block text-xl cursor-pointer tracking-wider"
              :value="activeItem ? 'Edit item' : 'Create item'"
            />
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
const modalOpen = ref(false);
const target = ref(null);

onClickOutside(target, () => {
  modalOpen.value = false;
});

const activeItem = ref(false);
const image = ref(null);
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

const selectImage = (e: any) => {
  image.value = e.target.files[0];
};

const form = ref(null);

const formValues = {
  date: new Date().toISOString(),
  popularity: 0,
  rating: 0,
} as any;

const client = useSupabaseClient();

const getValues = async () => {
  if (form.value) {
    for (let i = 0; i < form.value.length; i++) {
      const curVal = form.value[i] as HTMLInputElement;
      if (curVal.type !== "submit") {
        const key = curVal.name;
        if (curVal.type === "file") {
          const filename: string = uuidv4();
          try {
            const { data, error } = await client.storage
              .from("catalog")
              .upload(`${filename}.png`, image.value!, {
                cacheControl: "3600",
                upsert: false,
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
  addItem();
};

const addItem = async () => {
  const { data, error } = await client.from("catalog").insert([formValues]);
};

const editItem = () => {};
</script>

<style scoped></style>
