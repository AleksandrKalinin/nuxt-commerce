<template>
  <div class="w-full flex items-center justify-start h-[80px] px-[30px]">
    <button
      v-on:click="saveDesign"
      class="mr-4 transition duration-200 hover:bg-sky-500 text-lg px-7 py-2 bg-sky-400 text-white"
    >
      Save Design
    </button>
    <button
      v-on:click="exportHtml"
      class="transition duration-200 hover:bg-sky-500 text-lg px-7 py-2 bg-sky-400 text-white"
    >
      Export HTML
    </button>
  </div>
  <div id="app" class="h-[calc(100vh-160px)]">
    <EmailEditor minHeight="500" ref="emailEditor" v-on:load="editorLoaded" />
  </div>
</template>

<script setup lang="ts">
import { EmailEditor } from "vue-email-editor";
import { useEmailStore } from "~/store/emailbuider";

const emailEditor = ref(null);
const emailStore = useEmailStore();

const editorLoaded = () => {
  if (emailStore.emailTemplate) {
    emailEditor.value.editor.loadDesign(emailStore.emailTemplatePreset);
  }
};

const saveDesign = () => {
  emailEditor.value.editor.saveDesign((design) => {
    emailStore.emailTemplatePreset = design;
  });
};

const exportHtml = () => {
  emailEditor.value.editor.exportHtml((data) => {
    emailStore.emailTemplate = data;
  });
};

onMounted(() => {
  emailStore.fetchTemplates();
});
</script>

<style scoped>
.unlayer-editor {
  height: calc(100vh - 160px);
}
</style>
