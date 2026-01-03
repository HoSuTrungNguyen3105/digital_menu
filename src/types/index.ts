// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

// ============================================
// Menu Types
// ============================================

export interface Menu {
    _id: string;
    name: string;
    description?: string;
    restaurantId: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateMenuDto {
    name: string;
    description?: string;
}

export interface UpdateMenuDto {
    name?: string;
    description?: string;
    isActive?: boolean;
}

// ============================================
// MenuItem Types
// ============================================

export interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
    menuId: string;
    isAvailable: boolean;
    rating?: number;
    sold?: number;
    isPromo?: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateMenuItemDto {
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
}

export interface UpdateMenuItemDto {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    image?: string;
    isAvailable?: boolean;
}

// ============================================
// Restaurant Types
// ============================================

export interface Restaurant {
    _id: string;
    name: string;
    description?: string;
    location?: string;
    ownerId: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateRestaurantDto {
    name: string;
    description?: string;
    location?: string;
}

export interface UpdateRestaurantDto {
    name?: string;
    description?: string;
    location?: string;
    isActive?: boolean;
}

// ============================================
// Auth Types
// ============================================

export interface User {
    _id: string;
    email: string;
    name: string;
    role: 'owner' | 'customer' | 'admin';
    createdAt: string;
    updatedAt: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

// ============================================
// Cart Types
// ============================================

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    category?: string;
}

export interface Cart {
    items: CartItem[];
    total: number;
    itemCount: number;
}

// ============================================
// Order Types
// ============================================

export interface Order {
    _id: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
    tableId?: string;
    customerId?: string;
    restaurantId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateOrderDto {
    items: CartItem[];
    tableId?: string;
    restaurantId: string;
}

// ============================================
// Table Types
// ============================================

export interface Table {
    _id: string;
    number: string;
    restaurantId: string;
    qrCode?: string;
    isOccupied: boolean;
    createdAt: string;
    updatedAt: string;
}
