"use client";
import { CartItem } from "@/types/cart";
import { Tables } from "@/types/database.types";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CartContextType {
  cart: CartItem[];
  removeItem: (item: Tables<"products">) => void;
  updateQuantity: (
    item: Tables<"products">,
    type: "inc" | "dec",
    num: number,
  ) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log("cart", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeItem = (item: Tables<"products">) => {
    setCart((prevCart) => {
      return prevCart.filter((i) => i.id !== item.id);
    });
  };

  const updateQuantity = (
    item: Tables<"products">,
    type: "inc" | "dec",
    num: number,
  ) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      // If the item doesn't exist in the cart
      if (!existingItem) {
        if (type === "inc") {
          // Add the item to the cart with an initial quantity of 1
          return [...prevCart, { ...item, orderQuantity: num }];
        } else {
          // If type is "dec", do nothing
          return prevCart;
        }
      }

      const { orderQuantity, quantity, id } = existingItem;

      // Handle increment
      if (type === "inc") {
        if (orderQuantity < quantity) {
          return prevCart.map((i) =>
            i.id === id ? { ...i, orderQuantity: orderQuantity + num } : i,
          );
        } else {
          // If orderQuantity >= quantity, do nothing
          return prevCart;
        }
      } else {
        // Handle decrement
        const newQuantity = orderQuantity - num;
        if (newQuantity <= 0) {
          // Remove the item if the quantity reaches 0
          return prevCart.filter((i) => i.id !== id);
        } else {
          //decrement the quantity
          return prevCart.map((i) =>
            i.id === id ? { ...i, orderQuantity: orderQuantity - num } : i,
          );
        }
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, updateQuantity, clearCart, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
