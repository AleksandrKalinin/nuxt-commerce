<template>
  <table :class="shadowed ? 'table_shadowed' : ''" class="table">
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
      <TransitionGroup name="table">
        <tr v-for="(item, index) in sortedItems" :key="index" class="text-left">
          <template v-for="(option, optionId) in header" :key="optionId">
            <td
              v-if="option.type === 'plain'"
              class="py-4 max-w-[300px] min-w-[40px] w-fit"
            >
              {{ item[option.value as keyof BaseItem] }}
            </td>
            <td v-if="option.type === 'date'" class="py-4">
              {{ formatDate(new Date(item[option.value as keyof BaseItem])) }}
            </td>
            <td v-else-if="option.type === 'image'" class="py-4">
              <div class="table__image">
                <img
                  class="h-full object-cover object-center"
                  :src="item[option.value as keyof BaseItem].toString()"
                  :alt="option.value"
                  loading="eager"
                />
              </div>
            </td>
            <td v-else-if="option.type === 'toggle'" class="py-4">
              <BaseToggleInput
                :state="(item[option.value as keyof BaseItem] as unknown as boolean)"
                @change="toggleVisibility($event, item.id)"
              />
            </td>
            <td v-else-if="option.type === 'number'" class="py-4">
              <input
                v-model.number="item[option.value as keyof BaseItem]"
                min="1"
                type="number"
                @input="
                  option.action
                    ? $emit(option.action, { id: item.id, event: $event })
                    : ''
                "
              />
            </td>
            <td v-else-if="option.type === 'icon'" class="py-4">
              <img
                :src="images[option.value]"
                class="table__icon"
                :alt="images[option.value]"
                loading="eager"
                @click="option.action ? $emit(option.action, item.id) : ''"
              />
            </td>
            <td v-else-if="option.type === 'select'" class="py-4">
              <select
                class="table__select"
                @change="
                  option.action
                    ? $emit(option.action, { id: item.id, event: $event })
                    : ''
                "
              >
                <option :value="item[option.toString() as keyof BaseItem]">
                  {{ item[option.value as keyof BaseItem] }}
                </option>
                <template v-for="(el, elId) in option.options" :key="elId">
                  <option
                    v-if="el !== item[option.value as keyof BaseItem].toString()"
                    :value="el"
                  >
                    {{ el }}
                  </option>
                </template>
              </select>
            </td>
            <td v-else-if="option.type === 'markup'" class="py-4">
              <BaseModal>
                <template #trigger>
                  <img
                    :src="images[option.value]"
                    :alt="images[option.value]"
                    class="w-[25px] h-[25px] cursor-pointer"
                    loading="eager"
                  />
                </template>
                <template #content>
                  <BaseUpdateForm
                    :item="(item as CatalogItem | OrderItem | User)"
                    :original-items="originalItems"
                  >
                  </BaseUpdateForm>
                </template>
              </BaseModal>
            </td>
          </template>
        </tr>
      </TransitionGroup>
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
  data: Array<CatalogItemTable> | Array<OrderItemTable> | Array<User>;
  originalItems?: CatalogItem[];
  emitOptions?: string[];
}

const props = defineProps<BaseTableProps>();

// const defineEmits = props.emitOptions;

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
  if (props.data.length) {
    const arr: CatalogItemTable[] | OrderItemTable[] | User[] = props.data;
    return (arr as Array<CatalogItemTable | OrderItemTable | User>).filter(
      (item) => {
        return item.id
          .toString()
          .toLowerCase()
          .includes(searchValue.value.toLowerCase());
      }
    );
  } else return [];
});

const sortedItems = computed(() => {
  const val = sortValue.value;
  const order = sortOrder.value;
  if (val === "default") {
    return filteredItems.value;
  } else {
    if (order === true) {
      return [
        ...filteredItems.value.sort((a: BaseItem, b: BaseItem) => {
          if ((a[val as keyof BaseItem] as unknown as string) === "") return +1;
          else if ((b[val as keyof BaseItem] as unknown as string) === "")
            return -1;
          else {
            return a[val as keyof BaseItem]
              .toString()
              .localeCompare(b[val as keyof BaseItem].toString());
          }
        }),
      ];
    } else {
      return [
        ...filteredItems.value.sort((a: BaseItem, b: BaseItem) => {
          if ((a[val as keyof BaseItem] as unknown as string) === "") return +1;
          if ((b[val as keyof BaseItem] as unknown as string) === "") return -1;
          else
            return b[val as keyof BaseItem]
              .toString()
              .localeCompare(a[val as keyof BaseItem].toString());
        }),
      ];
    }
  }
});
</script>

<style scoped lang="css">
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}

.table {
  @apply w-full min-w-full border-separate border-spacing-2 border py-5 px-3 bg-white border border-white rounded-lg;
}

.table_shadowed {
  @apply shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)];
}

.table__image {
  @apply w-16 h-12 overflow-hidden flex justify-center items-center;
}

.table__icon {
  @apply w-[25px] h-[25px] cursor-pointer duration-100 hover:scale-[1.1];
}

.table__select {
  @apply h-12 bg-white border rounded-none px-3;
}

.table-enter-active,
.table-leave-active {
  transition: opacity 0.1s ease;
}

.table-enter-active {
  transition-delay: 0.15s;
}

.table-enter-from,
.table-leave-to {
  opacity: 0.5;
}
</style>
