export const INPUT_FIELDS = [
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

export const ORDERS_HEADER = [
  {
    label: "№",
    value: "id",
    type: "plain",
  },
  {
    label: "Дата заказа",
    value: "created_at",
    type: "plain",
  },
  {
    label: "Сумма",
    value: "total",
    type: "plain",
  },
  {
    label: "Статус",
    value: "status",
    type: "select",
    options: ["Pending", "Completed", "Cancelled"],
  },
];

export const USERS_HEADER = [
  {
    label: "ID",
    value: "id",
    type: "plain",
  },
  {
    label: "E-mail",
    value: "email",
    type: "plain",
  },
  {
    label: "Registered on",
    value: "registration_date",
    type: "plain",
  },
  {
    label: "Role",
    value: "role",
    type: "plain",
  },
];

export const USER_ORDERS_HEADER = [
  {
    label: "ID",
    value: "id",
    type: "plain",
  },
  {
    label: "Название",
    value: "name",
    type: "plain",
  },
  {
    label: "Фото",
    value: "photo",
    type: "image",
  },
  {
    label: "Артикул",
    value: "item_code",
    type: "plain",
  },
  {
    label: "Цена",
    value: "price",
    type: "plain",
  },
  {
    label: "Кол-во",
    value: "amount",
    type: "plain",
  },
  {
    label: "Общая цена",
    value: "total",
    type: "plain",
  },
];
