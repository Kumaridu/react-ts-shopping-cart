import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

type shoppingCartProviderProps = {
  children: ReactNode;
};

type shoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartItems: cartItem[];
  cartQuantity: number;
};

type cartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as shoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: shoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartItems((cartItems) => {
      if (cartItems.find((item) => item.id === id) == null) {
        return [...cartItems, { id, quantity: 1 }];
      } else {
        return cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
    console.log(cartItems);
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((cartItems) => {
      if (cartItems.find((item) => item.id === id)?.quantity == 1) {
        return cartItems.filter((item) => item.id === id);
      } else {
        return cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
    console.log(cartItems);
  }

  function removeFromCart(id: number) {
    setCartItems((cartItems) => {
      return cartItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
