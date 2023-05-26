import { defineStore } from "pinia";
export const useToastsStore = defineStore("toasts", () => {
  const { $toast } = useNuxtApp();

  const showSuccessToast = (_, message: string) => {
    $toast.success(message, { timeout: 2000 });
  };

  const showErrorToast = (_, message: string) => {
    $toast.error(message, { timeout: 2000 });
  };

  const showWarningToast = (_, message: string) => {
    $toast.warning(message, { timeout: 2000 });
  };

  return {
    showErrorToast,
    showSuccessToast,
    showWarningToast,
  };
});
