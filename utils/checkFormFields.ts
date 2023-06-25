export const checkFormFields = (values: any) => {
  for (const key in values) {
    if (values[key] === "") {
      return false;
    }
  }
  return true;
};
