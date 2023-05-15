<template>
  <table
    class="w-full border-separate border-spacing-2 border sky-blue-400 py-5 px-3"
  >
    <thead>
      <tr class="text-left cursor-pointer">
        <th v-for="item in header">{{ item.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" class="text-left">
        <template v-for="option in header">
          <td v-if="option.type === 'plain'" class="py-4">
            {{ item[option.value] }}
          </td>
          <td v-else-if="option.type === 'image'" class="py-4">
            <div class="w-16 h-12 overflow-hidden">
              <img class="object-cover" :src="item[option.value]" />
            </div>
          </td>
          <td v-else-if="option.type === 'toggle'" class="py-4">
            <BaseToggleInput :state="item[option.value]" />
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const props = defineProps(["header", "data"]);
</script>

<style scoped></style>
