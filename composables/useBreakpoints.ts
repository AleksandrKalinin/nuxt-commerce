export const useBreakpoints = () => {
  let windowWidth = ref(window.innerWidth);

  const onWidthChange = () => (windowWidth.value = window.innerWidth);
  onMounted(() => window.addEventListener("resize", onWidthChange));
  onUnmounted(() => window.removeEventListener("resize", onWidthChange));

  const type = computed(() => {
    if (windowWidth.value < 996) return "md";
    if (windowWidth.value >= 996 && windowWidth.value < 1400) return "lg";
    if (windowWidth.value >= 1400 && windowWidth.value < 1920) return "xl";
    else return "xxl";
  });

  const width = computed(() => windowWidth.value);

  return { type };
};
