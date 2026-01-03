import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  title: string;
  name?: string;
  price: number;
  quantity: number;
  image?: string;
  [key: string]: any;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  itemTitle: string;
  cartTotal: number;
  itemCount: number;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedTableId: string | null;
  selectTable: (id: string) => void;
  orders: Order[];
  placeOrder: () => void;
  clearOrders: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [itemTitle, setItemTitle] = useState("");
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem("orderHistory");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const addToCart = (item: CartItem) => {
    setItemTitle(item.title || item.name || "");
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      let newCart: CartItem[];
      if (existing) {
        newCart = prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newCart = [...prev, { ...item, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const newCart = prev.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      const newCart = prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const placeOrder = () => {
    if (cartItems.length === 0) return;

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleString(),
      items: [...cartItems],
      total: cartTotal,
      status: "Processing",
    };

    setOrders((prev) => {
      const newOrders = [newOrder, ...prev];
      localStorage.setItem("orderHistory", JSON.stringify(newOrders));
      return newOrders;
    });
    clearCart();
  };

  const clearOrders = () => {
    setOrders([]);
    localStorage.removeItem("orderHistory");
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const selectTable = (id: string) => setSelectedTableId(id);

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
