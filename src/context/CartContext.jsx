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
  const menuCartData = [
    {
      title: [],
      name: [],
      price: [],
      quantity: [],
      id: [],
    },
  ];
  const [cartItems, setCartItems] = useState(menuCartData);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [itemTitle, setItemTitle] = useState("");
  const [orders, setOrders] = useState([]);

  const addToCart = (item) => {
    setItemTitle(item.title || item.name);
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    localStorage.setItem("cart", JSON.stringify(cartItems));

    //setIsSidebarOpen(true); // Open sidebar when adding item
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));

    localStorage.setItem("cart", JSON.stringify(cartItems));
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

    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const clearCart = () => setCartItems([]);

  const placeOrder = () => {
    setOrders((prev) => [...prev, ...cartItems]);
    setCartItems([]);
  };

  const clearOrders = () => setOrders([]);

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
        orders,
        placeOrder,
        clearOrders,
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
