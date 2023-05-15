<template>
  <div class="pagination-container w-full flex justify-end mt-3">
    <div class="pagination flex cursor-pointer">
      <div
        class="flex justify-center items-center border sky-blue-400 font-lg font-semibold px-3"
      >
        Previous
      </div>
      <div
        class="pagination-item pagination-item_active flex justify-center items-center border sky-blue-400 w-10 h-10 font-lg font-semibold"
      >
        1
      </div>
      <div
        class="pagination-item flex justify-center items-center border sky-blue-400 w-10 h-10 font-lg font-semibold"
      >
        2
      </div>
      <div
        class="pagination-item flex justify-center items-center border sky-blue-400 w-10 h-10 font-lg font-semibold"
      >
        3
      </div>
      <div
        class="flex justify-center items-center border sky-blue-400 font-lg font-semibold px-3"
      >
        Next
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.pagination-item {
  transition: 1s all;
}

.pagination-item_active {
  background-color: #38bdf8;
  border: 1px solid #38bdf8;
  color: #ffffff;
}
</style>
