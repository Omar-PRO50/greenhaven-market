import { Tables } from "./database.types";

export type CartItem = Tables<"products"> & {
  orderQuantity: number;
};
