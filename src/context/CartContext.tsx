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
  orders: any[];
  placeOrder: () => void;
  clearOrders: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const menuCartData = [
    // {
    //   title: "",
    //   name: "",
    //   price: 0,
    //   quantity: "",
    //   id: "",
    // },
  ];
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [itemTitle, setItemTitle] = useState("");
  const [orders, setOrders] = useState<any[]>(() => {
    const savedOrders = localStorage.getItem("orderHistory");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const addToCart = (item: CartItem) => {
    setItemTitle(item.title || item.name || "");
    setCartItems((prev: CartItem[]) => {
      const existing = prev.find((i: CartItem) => i.id === item.id);
      let newCart;
      if (existing) {
        newCart = prev.map((i: any) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newCart = [...prev, { ...item, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (id: any) => {
    setCartItems((prev: any) => {
      const newCart = prev.filter((item: any) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (id: any, delta: any) => {
    setCartItems((prev: any) => {
      const newCart = prev
        .map((item: any) => {
          if (item.id === id) {
            const newQuantity = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item: any) => item.quantity > 0);
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

    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleString(),
      items: [...cartItems],
      total: cartTotal,
      status: "Processing",
    };

    setOrders((prev: any) => {
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
    (total: any, item: any) => total + item.price * item.quantity,
    0
  );

  const itemCount = cartItems.reduce((count: number, item: CartItem) => count + item.quantity, 0);

  const toggleSidebar = () => setIsSidebarOpen((prev: boolean) => !prev);
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
