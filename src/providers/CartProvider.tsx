import { CartItem, Product } from "@/types";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
};
const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
});

export default function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(product: Product, size: CartItem["size"]) {
    //if already in cart,increment quantity

    const newCartItem: CartItem = {
      id: "1", //needs to be generated
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems([newCartItem, ...items]);
  }

  //update quantity
  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};
