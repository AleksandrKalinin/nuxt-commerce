import type { PostgrestError } from "@supabase/supabase-js";

const client = useSupabaseClient();

class CartService {
  async fetchCartItems(id: string) {
    const { data, error } = await client
      .from("users")
      .select("cart")
      .eq("user_id", id);
    return { data, error };
  }

  async addToCart(cart: [] | CartItem[], id: string) {
    const { error } = await client
      .from("users")
      .update({ cart })
      .eq("user_id", id);
    return error;
  }

  async updateAmount(cart: [] | CartItem[], id: string) {
    const { error } = await client
      .from("users")
      .update({ cart })
      .eq("user_id", id);
    return error;
  }

  async deleteItem(cart: [] | CartItem[], id: string) {
    const { error } = await client
      .from("users")
      .update({ cart })
      .eq("user_id", id);
    return error;
  }

  async placeOrder(order: Order, id: string): Promise<PostgrestError | null> {
    const { error } = await client.from("orders").insert([order]);
    if (error) throw error;
    const { error: updateError } = await client
      .from("users")
      .update({ cart: [] })
      .eq("user_id", id);
    return updateError;
  }
}

const cartService = new CartService();

export default cartService;
