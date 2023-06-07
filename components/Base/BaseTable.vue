<template>
  <table
    :class="shadowed ? 'shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)]' : ''"
    class="w-full min-w-full border-separate border-spacing-2 border sky-blue-400 py-5 px-3 bg-white border border-white rounded-lg"
  >
    <thead>
      <tr class="text-left cursor-pointer">
        <th
          v-for="(item, index) in header"
          :key="index"
          @click="updateSort(item.value)"
        >
          {{ item.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in sortedItems" :key="index" class="text-left">
        <template v-for="(option, optionId) in header" :key="optionId">
          <td v-if="option.type === 'plain'" class="py-4">
            {{ item[option.value] }}
          </td>
          <td v-else-if="option.type === 'image'" class="py-4">
            <div
              class="w-16 h-12 overflow-hidden flex justify-center items-center"
            >
              <img
                class="h-full object-cover object-center"
                :src="item[option.value]"
                :alt="option.value"
                loading="eager"
              />
            </div>
          </td>
          <td v-else-if="option.type === 'toggle'" class="py-4">
            <BaseToggleInput
              :state="item[option.value]"
              @change="toggleVisibility($event, item.id)"
            />
          </td>
          <td v-else-if="option.type === 'number'" class="py-4">
            <input
              v-model.number="item[option.value]"
              min="1"
              type="number"
              @input="option.action ? option.action(item.id, $event) : ''"
            />
          </td>
          <td v-else-if="option.type === 'icon'" class="py-4">
            <img
              :src="images[option.value]"
              class="w-[25px] h-[25px] cursor-pointer duration-100 hover:scale-[1.1]"
              :alt="images[option.value]"
              loading="eager"
              @click="option.action ? option.action(item.id) : ''"
            />
          </td>
          <td v-else-if="option.type === 'select'" class="py-4">
            <select
              :name="item.name"
              class="h-12 bg-white border bg-sky-400 rounded-none mb-4 px-3 text-xl"
              @change="option.action ? option.action(item.id, $event) : ''"
            >
              <option :value="item[option.toString()]">
                {{ item[option.value] }}
              </option>
              <template v-for="(el, elId) in option.options" :key="elId">
                <option v-if="el !== item[option.value]" :value="el">
                  {{ el }}
                </option>
              </template>
            </select>
          </td>
          <td v-else-if="option.type === 'markup'" class="py-4">
            <BaseUpdateModal :item="item" :original-items="originalItems">
              <img
                :src="images[option.value]"
                :alt="images[option.value]"
                class="w-[25px] h-[25px] cursor-pointer"
                loading="eager"
              />
            </BaseUpdateModal>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { filename } from "pathe/utils";
import { useFilterStore } from "~/store/filter";
import { useAdminStore } from "~/store/admin";

interface BaseTableProps {
  header: BaseTableHeader[];
  shadowed: boolean;
  data: Array<CatalogItem> | Array<OrderItem> | Array<User>;
  originalItems?: CatalogItem[];
}

const props = defineProps<BaseTableProps>();

const store = useFilterStore();
const adminStore = useAdminStore();

const { sortOrder, searchValue, sortValue } = storeToRefs(store);
const { updateSort } = store;
const { toggleVisibility } = adminStore;

const images = computed(() => {
  const glob: Record<string, { default: string }> = import.meta.glob(
    "~/assets/icons/*.svg",
    { eager: true }
  );
  const entries = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
  );
  return entries;
});

const filteredItems = computed(() => {
  return props.data.filter((item: CatalogItem | OrderItem | User) => {
    return item.id
      .toString()
      .toLowerCase()
      .includes(searchValue.value.toLowerCase());
  });
});

const sortedItems = computed(() => {
  const val = sortValue.value;
  const order = sortOrder.value;
  if (val === "default") {
    return filteredItems.value;
  } else {
    if (order === true) {
      return [
        ...filteredItems.value.sort((a: CatalogItem, b: CatalogItem) => {
          if (a[val as keyof CatalogItem] === "") return +1;
          else if (b[val as keyof CatalogItem] === "") return -1;
          else
            return a[val as keyof CatalogItem]
              .toString()
              .localeCompare(b[val as keyof CatalogItem].toString());
        }),
      ];
    } else {
      return [
        ...filteredItems.value.sort((a: CatalogItem, b: CatalogItem) => {
          if (a[val as keyof CatalogItem] === "") return +1;
          if (b[val as keyof CatalogItem] === "") return -1;
          else
            return b[val as keyof CatalogItem]
              .toString()
              .localeCompare(a[val as keyof CatalogItem].toString());
        }),
      ];
    }
  }
});
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}
</style>
