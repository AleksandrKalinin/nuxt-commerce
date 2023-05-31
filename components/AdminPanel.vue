<template>
  <div
    class="admin-panel border sky-blue-400 w-100 flex justify-between items-center py-5 px-5 mb-5 bg-white border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg"
  >
    <h2 class="text-lg font-bold py-2">Каталог</h2>
    <div class="flex">
      <input
        type="text"
        placeholder="Search"
        class="leading-7 py-2 px-4 border sky-blue-400 w-72 mr-2"
      />
      <BaseAddModal>
        <button
          class="transition duration-200 hover:bg-sky-500 text-lg px-7 mx-auto py-2 bg-sky-400 text-white"
        >
          Добавить
        </button>
      </BaseAddModal>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
