<template>
  <table
    class="w-full border-separate border-spacing-2 border sky-blue-400 py-5 px-3"
  >
    <tbody>
      <tr v-for="(value, key) in item" :key="key" class="text-left">
        <th class="py-4">
          {{ key }}
        </th>
        <td class="py-4">
          {{ value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const props = defineProps(["item"]);
</script>

<style scoped></style>
