export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      catalog: {
        Row: {
          battery_type: string | null;
          card_support: string | null;
          date: string | null;
          discount: number | null;
          id: number;
          in_stock: number | null;
          is_visible: boolean | null;
          item_code: number | null;
          manufacturer: string | null;
          matrix_size: string | null;
          matrix_type: string | null;
          max_FPS_photo: number | null;
          max_FPS_video: number | null;
          max_resolution: string | null;
          max_sensitivity: number | null;
          min_sensitivity: number | null;
          name: string | null;
          photo: string | null;
          pixels: number | null;
          popularity: number | null;
          price: number | null;
          rating: number | null;
          reviews: Json | null;
          type: string | null;
          warranty: number | null;
          wi_fi: boolean | null;
        };
        Insert: {
          battery_type?: string | null;
          card_support?: string | null;
          date?: string | null;
          discount?: number | null;
          id?: number;
          in_stock?: number | null;
          is_visible?: boolean | null;
          item_code?: number | null;
          manufacturer?: string | null;
          matrix_size?: string | null;
          matrix_type?: string | null;
          max_FPS_photo?: number | null;
          max_FPS_video?: number | null;
          max_resolution?: string | null;
          max_sensitivity?: number | null;
          min_sensitivity?: number | null;
          name?: string | null;
          photo?: string | null;
          pixels?: number | null;
          popularity?: number | null;
          price?: number | null;
          rating?: number | null;
          reviews?: Json | null;
          type?: string | null;
          warranty?: number | null;
          wi_fi?: boolean | null;
        };
        Update: {
          battery_type?: string | null;
          card_support?: string | null;
          date?: string | null;
          discount?: number | null;
          id?: number;
          in_stock?: number | null;
          is_visible?: boolean | null;
          item_code?: number | null;
          manufacturer?: string | null;
          matrix_size?: string | null;
          matrix_type?: string | null;
          max_FPS_photo?: number | null;
          max_FPS_video?: number | null;
          max_resolution?: string | null;
          max_sensitivity?: number | null;
          min_sensitivity?: number | null;
          name?: string | null;
          photo?: string | null;
          pixels?: number | null;
          popularity?: number | null;
          price?: number | null;
          rating?: number | null;
          reviews?: Json | null;
          type?: string | null;
          warranty?: number | null;
          wi_fi?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "catalog_discount_fkey";
            columns: ["discount"];
            referencedRelation: "discounts";
            referencedColumns: ["id"];
          }
        ];
      };
      discounts: {
        Row: {
          date_end: string | null;
          date_start: string | null;
          discount_number: number;
          id: number;
        };
        Insert: {
          date_end?: string | null;
          date_start?: string | null;
          discount_number: number;
          id?: number;
        };
        Update: {
          date_end?: string | null;
          date_start?: string | null;
          discount_number?: number;
          id?: number;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          created_at: string | null;
          id: number;
          items: Json | null;
          status: string | null;
          total: number | null;
          user: string | null;
          userId: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          items?: Json | null;
          status?: string | null;
          total?: number | null;
          user?: string | null;
          userId?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          items?: Json | null;
          status?: string | null;
          total?: number | null;
          user?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "orders_userId_fkey";
            columns: ["userId"];
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      ratings: {
        Row: {
          author: string;
          date: string | null;
          description: string;
          id: number;
          item_id: number;
          rating: string | null;
          user_id: number;
        };
        Insert: {
          author?: string;
          date?: string | null;
          description?: string;
          id?: number;
          item_id?: number;
          rating?: string | null;
          user_id?: number;
        };
        Update: {
          author?: string;
          date?: string | null;
          description?: string;
          id?: number;
          item_id?: number;
          rating?: string | null;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ratings_item_id_fkey";
            columns: ["item_id"];
            referencedRelation: "catalog";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ratings_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          cart: Json | null;
          date: string | null;
          email: string | null;
          id: number;
          role: string | null;
          subscribed: boolean | null;
          user_id: string | null;
        };
        Insert: {
          cart?: Json | null;
          date?: string | null;
          email?: string | null;
          id?: number;
          role?: string | null;
          subscribed?: boolean | null;
          user_id?: string | null;
        };
        Update: {
          cart?: Json | null;
          date?: string | null;
          email?: string | null;
          id?: number;
          role?: string | null;
          subscribed?: boolean | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
