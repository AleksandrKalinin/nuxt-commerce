export function toastHandler(error: string) {
  switch (error) {
    case "no-permission":
      return {
        toast: "showErrorToast",
        message: "You don't have permission to access this page",
      };
      break;
    case "not-authorized":
      return {
        toast: "showErrorToast",
        message: "You are not authorized! Please log in",
      };
      break;
    case "add-to-cart":
      return {
        toast: "showSuccessToast",
        message: "Item added to cart!",
      };
      break;
    case "order-confirmed":
      return {
        toast: "showSuccessToast",
        message: "Order confirmed!",
      };
      break;
    case "invalid-email":
      return {
        toast: "showErrorToast",
        message: "Incorrect email or password!",
      };
      break;
    case "user-not-found":
      return {
        toast: "showErrorToast",
        message: "No user with such email was found!",
      };
      break;
    case "wrong-password":
      return { toast: "showErrorToast", message: "Incorrect password!" };
      break;
    case "email-already-in-use":
      return {
        toast: "showErrorToast",
        message: "Email already in use!",
      };
      break;
    case "add-to-database":
      return {
        toast: "showSuccessToast",
        message: "Item added to database!",
      };
      break;
    case "delete-from-database":
      return {
        toast: "showErrorToast",
        message: "Item deleted from database!",
      };
      break;
    case "item-visible":
      return {
        toast: "showSuccessToast",
        message: "Item visible!",
      };
      break;
    case "item-hidden":
      return {
        toast: "showSuccessToast",
        message: "Item hidden!",
      };
      break;
    default:
      return {
        toast: "showErrorToast",
        message: "An error occured! Please try again",
      };
      break;
  }
}
