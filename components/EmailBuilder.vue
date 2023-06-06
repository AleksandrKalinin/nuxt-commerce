<template>
  <div class="builder__panel">
    <button class="button_regular mr-4" @click="saveDesign">Save Design</button>
    <button class="button_regular mr-4" @click="exportHtml">Export HTML</button>
  </div>
  <div class="editor-wrapper">
    <EmailEditor ref="emailEditor" min-height="500" @load="editorLoaded" />
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

<style scoped lang="css">
.builder__panel {
  @apply w-full flex items-center justify-start h-[80px] px-[30px];
}

.editor-wrapper {
  @apply h-[calc(100vh-160px)];
}

.unlayer-editor {
  height: calc(100vh - 160px);
}
</style>
