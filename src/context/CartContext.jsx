import { createContext, useContext, useState, ReactNode } from "react";

// export interface CartItem extends MenuItem {
//   quantity: number;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   addToCart: (item: MenuItem) => void;
//   removeFromCart: (id: number) => void;
//   updateQuantity: (id: number, delta: number) => void;
//   clearCart: () => void;
//   itemTitle: string;
//   cartTotal: number;
//   itemCount: number;
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
//   selectedTableId: number | null;
//   selectTable: (id: number | null) => void;
// }

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [itemTitle, setItemTitle] = useState([]);

  const addToCart = (item) => {
    console.log("item", item);
    setItemTitle(item.title);
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    //setIsSidebarOpen(true); // Open sidebar when adding item
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const selectTable = (id) => setSelectedTableId(id);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemTitle,
        cartTotal,
        itemCount,
        isSidebarOpen,
        toggleSidebar,
        selectedTableId,
        selectTable,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
