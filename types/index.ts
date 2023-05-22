export {};

declare global {
  interface User {
    id: number;
    registration_date: Date;
    email: string;
    role: string;
  }

  interface Order {
    id: number;
    created_at: Date;
    items: OrderItem[];
    userId: number;
    user: string;
    total: number;
    status: OrderStatus;
  }

  interface OrderItem {
    id: number;
    amount: number;
  }

  enum OrderStatus {
    Pending = "Pending",
    Completed = "Completed",
    Cancelled = "Cancelled",
  }

  interface CatalogItem {
    name: string;
    id: number;
    price: number;
    date: Date;
    manufacturer: string;
    photo: string;
    type: string;
    battery_type: string;
    pixels: number;
    max_FPS_video: number;
    max_FPS_photo: number;
    max_sensitivity: number;
    max_resolution: string;
    min_sensitivity: number;
    wi_fi: boolean;
    card_support: string;
    matrix_type: string;
    matrix_size: string;
    popularity: number;
    rating: number;
    warranty: number;
    in_stock: number;
    item_code: number;
    is_visible: boolean;
  }

  interface CartItem extends CatalogItem {
    amount: number;
    total: number;
  }

  interface SelectOption {
    label: string | number;
    selected: boolean;
  }

  interface SelectedOptions {
    manufacturer: string[];
    type: string[];
    matrix_type: string[];
    matrix_size: string[];
    pixels: string[];
  }

  interface BaseItemModalForm {
    name: string;
    dataType: string;
    elType: string;
    default: string;
    placeholder: string;
    options?: Boolean[];
  }
}
