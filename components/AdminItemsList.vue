<template>
  <table
    class="w-full border-separate border-spacing-2 border sky-blue-400 py-5 px-3"
  >
    <thead>
      <tr class="text-left cursor-pointer">
        <th>Название</th>
        <th>Фото</th>
        <th>Артикул</th>
        <th>Остаток</th>
        <th>Видимость</th>
      </tr>
    </thead>
    <tbody>
      <tr class="text-left">
        <td class="py-4">Canon 2340</td>
        <td class="py-4">
          <div class="w-16 h-12">
            <img class="object-cover" src="/images/1.jpg" />
          </div>
        </td>
        <td class="py-4">196138784</td>
        <td class="py-4">
          <input type="number" value="12" min="0" class="w-16" />
        </td>
        <th class="py-4">
          <BaseToggleInput />
        </th>
      </tr>
      <tr class="text-left">
        <td>Canon 2340</td>
        <td>
          <div class="w-16 h-12">
            <img class="object-cover" src="/images/1.jpg" />
          </div>
        </td>
        <td>196138784</td>
        <td class="py-4">
          <input type="number" value="12" min="0" class="w-16" />
        </td>
        <th>
          <BaseToggleInput />
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts"></script>

<style scoped></style>
