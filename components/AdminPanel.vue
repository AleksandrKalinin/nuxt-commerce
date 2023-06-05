<template>
  <div class="admin-panel">
    <h2 class="adming-panel__title">Каталог</h2>
    <div class="flex">
      <input type="text" placeholder="Search" class="admin-panel__search" />
      <BaseAddModal>
        <button class="button_regular">Добавить</button>
      </BaseAddModal>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.admin-panel {
  @apply border w-full flex justify-between items-center py-5 px-5 mb-5 bg-white border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg;
}

.admin-panel__title {
  @apply text-lg font-bold py-2;
}
.admin-panel__search {
  @apply leading-7 py-2 px-4 border w-72 mr-2;
}
</style>
