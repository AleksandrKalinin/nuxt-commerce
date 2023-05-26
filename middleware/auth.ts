import { useToastsStore } from "~/store/toasts";
import { toastHandler } from "~/utils/toastHandler";
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  const toastsStore = useToastsStore();

  if (!user.value) {
    console.log("fafafefef");
    const { toast, message } = toastHandler("no-permission");
    console.log(toast, message);
    toastsStore.showErrorToast(toast, message);
    //return navigateTo("/catalog");
  }
});
