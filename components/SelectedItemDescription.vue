<template>
  <table
    class="w-full border-separate border-spacing-2 border sky-blue-400 py-5 px-3"
  >
    <tbody>
      <tr
        v-for="(item, key) in selectedProperties"
        :key="key"
        class="text-left"
      >
        <th class="py-4">
          {{ item.label }}
        </th>
        <td class="py-4">
          {{ selectedItem[item.value as keyof CatalogItem] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const props = defineProps(["selectedProperties", "selectedItem"]);
</script>

<style scoped></style>
