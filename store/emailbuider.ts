import { defineStore } from "pinia";

export const useEmailStore = defineStore("email", () => {
  interface EmailTemplate {
    name: string;
    url: string;
  }

  const client = useSupabaseClient();
  const emailTemplate = ref(null);
  const emailTemplatePreset = ref(null);
  const templates: Ref<EmailTemplate[]> = ref([]);

  const fetchTemplates = async () => {
    try {
      const { data: items, error } = await client.storage
        .from("html-templates")
        .list();
      items?.map((item) => {
        try {
          const { data: url } = client.storage
            .from("html-templates")
            .getPublicUrl(item.name);
          const template = {
            name: item.name,
            url: url.publicUrl,
          };
          templates.value.push(template);
        } catch (e) {
          throw e;
        }
      });
      if (error) throw error;
    } catch (e) {
      throw e;
    }
  };

  return {
    emailTemplate,
    emailTemplatePreset,
    templates,
    fetchTemplates,
  };
});
