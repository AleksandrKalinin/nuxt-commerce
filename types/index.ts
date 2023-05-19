export {};

declare global {
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
  }

  interface CartItem extends CatalogItem {
    amount: number;
    total: number;
  }

  interface SelectOption {
    label: string;
    selected: boolean;
  }

  interface SelectedOptions {
    manufacturer: string[];
    type: string[];
    matrix_type: string[];
    matrix_size: string[];
    pixels: string[];
  }
}
