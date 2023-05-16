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
    max_FPS_video: string;
    max_FPS_photo: string;
    max_sensitivity: string;
    max_resolution: string;
    min_sensitivity: string;
    wi_fi: string;
    card_support: string;
    matrix_type: string;
    matrix_size: string;
    popularity: number;
    rating: number;
  }
}
