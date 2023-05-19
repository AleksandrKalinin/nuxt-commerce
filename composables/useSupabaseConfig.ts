export const useSupabaseConfig = () => {
  const config = useRuntimeConfig();
  const URL = config.public.supabaseUrl;
  const KEY = config.public.supabaseKey;

  return {
    URL,
    KEY,
  };
};
