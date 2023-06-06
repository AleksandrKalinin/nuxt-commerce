import { defineStore } from "pinia";

export const useEmailStore = defineStore("email", () => {
  interface EmailTemplate {
    name: string;
    url: string;
  }

  const client = useSupabaseClient();
  const emailTemplate: Ref<EmailEditorData | null> = ref(null);
  const emailTemplatePreset: Ref<EditorDesign | null> = ref(null);
  const templates: Ref<EmailTemplate[]> = ref([]);

  const fetchTemplates = async () => {
    const { data: items, error } = await client.storage
      .from("html-templates")
      .list();
    items?.forEach((item) => {
      const { data: url } = client.storage
        .from("html-templates")
        .getPublicUrl(item.name);
      const template = {
        name: item.name,
        url: url.publicUrl,
      };
      templates.value.push(template);
    });
    if (error) throw error;
  };

  return {
    emailTemplate,
    emailTemplatePreset,
    templates,
    fetchTemplates,
  };
});
