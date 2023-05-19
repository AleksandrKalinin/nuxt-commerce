import { defineStore } from "pinia";
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = "https://usbrxauceznoueaaakai.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzYnJ4YXVjZXpub3VlYWFha2FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5MDQ0MTksImV4cCI6MTk5OTQ4MDQxOX0.DGEWI7HQFjO8aDVYvPjMNJYlbSvTzXs82qCgVU9oUiU";
const client = createClient(SUPABASE_URL, SUPABASE_KEY);

const item = {
  name: "Panasonic EOS 80",
  price: 900,
  date: "16.05.2023",
  manufacturer: "Panasonic",
  photo: "catalog/1.jpg",
  type: "компакт-камера",
  battery_type: "Li-ion (LP-E10)",
  pixels: 24,
  max_FPS_video: 30,
  max_FPS_photo: 3,
  max_sensitivity: 6400,
  max_resolution: "1920 x 1080",
  min_sensitivity: 100,
  wi_fi: true,
  card_support: "SD, SDHC, SDXC",
  matrix_type: "CMOS",
  matrix_size: "1.5",
  popularity: 5,
  rating: 3.5,
  warranty: 12,
  in_stock: 5,
};

export const useDatabaseStore = defineStore("database", () => {
  let arr = [];
  const execute = () => {
    fetch("./items.json")
      .then((res) => res.json())
      .then((json) => {
        arr = json;
      })
      .then(() => {
        insertIntoTable();
      });
  };

  async function insertIntoTable() {
    for (let i = 0; i < arr.length; i++) {
      await client.from("catalog").insert([
        {
          name: arr[i].name,
          price: arr[i].price,
          date: arr[i].date,
          manufacturer: arr[i].manufacturer,
          photo: arr[i].photo,
          type: arr[i].type,
          battery_type: arr[i].battery_type,
          pixels: arr[i].pixels,
          max_FPS_video: 30,
          max_FPS_photo: 3,
          max_sensitivity: Number(arr[i].max_sensitivity),
          max_resolution: arr[i].max_resolution,
          min_sensitivity: Number(arr[i].min_sensitivity),
          wi_fi: true,
          card_support: arr[i].card_support,
          matrix_type: arr[i].matrix_type,
          matrix_size: arr[i].matrix_size,
          popularity: 123,
          rating: 4,
          warranty: 12,
          in_stock: 5,
        },
      ]);
    }
  }

  return {
    execute,
    insertIntoTable,
  };
});
