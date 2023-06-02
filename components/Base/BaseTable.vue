<template>
  <table
    :class="shadowed ? 'shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)]' : ''"
    class="w-full min-w-full border-separate border-spacing-2 border sky-blue-400 py-5 px-3 bg-white border border-white rounded-lg"
  >
    <thead>
      <tr class="text-left cursor-pointer">
        <th @click="store.updateSort(item.value)" v-for="item in header">
          {{ item.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in sortedItems" class="text-left">
        <template v-for="option in header">
          <td v-if="option.type === 'plain'" class="py-4">
            {{ item[option.value] }}
          </td>
          <td v-else-if="option.type === 'image'" class="py-4">
            <div class="w-16 h-12 overflow-hidden">
              <img
                class="object-cover"
                :src="item[option.value]"
                :alt="option.value"
                loading="eager"
              />
            </div>
          </td>
          <td v-else-if="option.type === 'toggle'" class="py-4">
            <BaseToggleInput
              :state="item[option.value]"
              @change="adminStore.toggleVisibility($event, item.id)"
            />
          </td>
          <td v-else-if="option.type === 'number'" class="py-4">
            <input
              min="1"
              type="number"
              v-model.number="item[option.value]"
              @input="option.action($event, item.id)"
            />
          </td>
          <td v-else-if="option.type === 'icon'" class="py-4">
            <img
              :src="images[option.value]"
              class="w-[25px] h-[25px] cursor-pointer"
              @click="option.action(item.id)"
              :alt="images[option.value]"
              loading="eager"
            />
          </td>
          <td v-else-if="option.type === 'select'" class="py-4">
            <select
              :name="item.name"
              @change="option.action(item.id, $event)"
              class="h-12 bg-white border bg-sky-400 rounded-none mb-4 px-3 text-xl"
            >
              <option :value="item[option]">{{ item[option.value] }}</option>
              <template v-for="el in option.options">
                <option v-if="el !== item[option.value]" :value="el">
                  {{ el }}
                </option>
              </template>
            </select>
          </td>
          <td v-else-if="option.type === 'markup'" class="py-4">
            <BaseUpdateModal :item="item" :originalItems="originalItems">
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
import { filename } from "pathe/utils";
import { useFilterStore } from "~/store/filter";
import { useAdminStore } from "~/store/admin";
const props = defineProps(["header", "data", "shadowed", "originalItems"]);
const store = useFilterStore();
const adminStore = useAdminStore();

const images = computed(() => {
  const glob = import.meta.glob("~/assets/*.svg", { eager: true });
  const mapped = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
  );
  console.log(mapped);:
  return mapped;
});

const sortOrder = computed(() => {
  return store.sortOrder;
});

const searchValue = computed(() => {
  return store.searchValue;
});

const sortValue = computed(() => {
  return store.sortValue;
});

const filteredItems = computed(() => {
  return props.data.filter((item: any) => {
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
          if (b[val as keyof CatalogItem] === "") return -1;
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
