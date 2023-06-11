export const CATALOG_HEADER = [
  {
    label: "ID",
    value: "id",
    type: "plain",
  },
  {
    label: "Name",
    value: "name",
    type: "plain",
  },
  {
    label: "Photo",
    value: "photo",
    type: "image",
  },
  {
    label: "Item code",
    value: "item_code",
    type: "plain",
  },
  {
    label: "Date",
    value: "date",
    type: "plain",
  },
  {
    label: "Residue",
    value: "in_stock",
    type: "plain",
  },
  {
    label: "Visibility",
    value: "is_visible",
    type: "toggle",
    action: "toggleVisibility",
  },
  {
    label: "",
    value: "edit",
    type: "markup",
  },
  {
    label: "",
    value: "delete",
    type: "icon",
    action: "deleteItem",
  },
];
