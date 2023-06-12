export const CATALOG_INPUT_FIELDS = [
  {
    name: "photo",
    dataType: "string",
    elType: "file",
    default: "",
    placeholder: "Drop a photo or select it manually",
  },
  {
    name: "name",
    dataType: "string",
    elType: "input",
    default: "",
    placeholder: "Item name",
  },
  {
    name: "price",
    dataType: "number",
    elType: "input",
    default: "",
    placeholder: "Price",
  },
  {
    name: "manufacturer",
    dataType: "string",
    elType: "input",
    default: "",
    placeholder: "Manufacturer",
  },
  {
    name: "type",
    dataType: "string",
    elType: "input",
    default: "",
    placeholder: "Type",
  },
  {
    name: "battery_type",
    dataType: "string",
    elType: "input",
    default: "",
    placeholder: "Battery type",
  },
  {
    name: "pixels",
    dataType: "number",
    elType: "input",
    default: "",
    placeholder: "Pixels",
  },
  {
    name: "max_FPS_video",
    dataType: "number",
    elType: "input",
    default: "",
    placeholder: "Max. video framerate",
  },
  {
    name: "max_FPS_photo",
    dataType: "number",
    elType: "input",
    default: "",
    placeholder: "Max. photo framerate",
  },
  {
    name: "max_sensitivity",
    dataType: "number",
    elType: "input",
    default: "",
    placeholder: "Max. sensitivity",
  },
  {
    name: "min_sensitivity",
    dataType: "number",
    elType: "input",
    default: "",
    placeholder: "Min. sensitivity",
  },
  {
    name: "max_resolution",
    dataType: "number",
    elType: "input",
    default: "",
    placeholder: "Max. resolution",
  },
  {
    name: "wi_fi",
    dataType: "boolean",
    elType: "select",
    options: [true, false],
    default: "",
    placeholder: "Wi-Fi",
  },
  {
    name: "card_support",
    dataType: "string",
    elType: "input",
    default: "",
    placeholder: "Support card types",
  },
  {
    name: "matrix_type",
    dataType: "string",
    elType: "input",
    default: "",
    placeholder: "Matrix type",
  },
  {
    name: "matrix_size",
    dataType: "string",
    elType: "input",
    default: "",
    placeholder: "Matrix size",
  },
  {
    name: "warranty",
    dataType: "number",
    elType: "input",
    default: "",
    placeholder: "Warranty(months)",
  },
  {
    name: "in_stock",
    dataType: "number",
    elType: "input",
    default: "",
    placeholder: "Items in stock",
  },
  {
    name: "item_code",
    dataType: "number",
    elType: "input",
    default: "",
    placeholder: "Item code",
  },
  {
    name: "is_visible",
    dataType: "boolean",
    elType: "select",
    options: [true, false],
    default: "",
    placeholder: "Visible for customers",
  },
];

export const ORDER_INPUT_FIELDS = [
  {
    name: "name",
    dataType: "string",
    elType: "input",
    default: "",
    placeholder: "Item name",
  },
  {
    name: "is_visible",
    dataType: "boolean",
    elType: "select",
    options: [true, false],
    default: "",
    placeholder: "Visible for customers",
  },
];

export const USER_INPUT_FIELDS = [
  {
    name: "email",
    dataType: "string",
    elType: "input",
    default: "",
    placeholder: "Email",
  },
  {
    name: "password",
    dataType: "string",
    elType: "input",
    default: "",
    placeholder: "Password",
  },
  {
    name: "role",
    dataType: "boolean",
    elType: "select",
    options: ["user", "admin"],
    default: "",
    placeholder: "User role",
  },
  {
    name: "subscribed",
    dataType: "boolean",
    elType: "select",
    options: [true, false],
    default: "",
    placeholder: "Subscribed to newsletter",
  },
];
