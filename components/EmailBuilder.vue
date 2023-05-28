<template>
  <div id="app" class="h-[calc(100vh-160px)]">
    <EmailEditor
      minHeight="500"
      ref="emailEditor"
      v-on:load="editorLoaded"
      v-on:ready="editorReady"
    />
  </div>
</template>

<script setup lang="ts">
import { EmailEditor } from "vue-email-editor";
const emailEditor = ref(null);

const editorLoaded = () => {
  //emailEditor.value.editor.loadDesign({});
};

const editorReady = () => {
  console.log("editorReady");
};

const saveDesign = () => {
  emailEditor.value.editor.saveDesign((design) => {
    console.log("saveDesign", design);
  });
};
const exportHtml = () => {
  emailEditor.value.editor.exportHtml((data) => {
    console.log("exportHtml  ", data);
  });
};
</script>

<style scoped>
.unlayer-editor {
  height: calc(100vh - 160px);
}
</style>
