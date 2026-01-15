// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
    success?: boolean;
    status?: boolean;
    code: number,
    data: T;
    message?: string;
    msg?: string;
    pagination?: {
        current_page: number;
        per_page: number;
        total: number;
        total_pages: number;
        keyword: string;
        sort_by: string;
        sort_dir: 'ASC' | 'DESC';
        date_col?: string;
        from_date?: string;
        to_date?: string;
    };
}

export interface TableQueryParams {
    current_page?: number;
    per_page?: number;
    keyword?: string;
    sort_by?: string;
    sort_dir?: 'ASC' | 'DESC';
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    pagination?: {
        total_items: number;
        total_pages: number;
        current_page: number;
        per_page: number;
    };
}

// ============================================
// Auth Types
// ============================================

export interface User {
    id: number | string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    restaurantId?: string;
}

export interface LoginDto {
    email: string;
    password?: string;
}

export interface RegisterDto {
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
}

// ============================================
// Restaurant Types
// ============================================

export interface Restaurant {
    _id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    description: string;
    logo?: string;
    banner?: string;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateRestaurantDto {
    name: string;
    address: string;
    phone: string;
    email: string;
    description: string;
}

// ============================================
// Menu Types
// ============================================

export interface Category {
    _id: string;
    name: string;
    restaurantId: string;
    description?: string;
}

export interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    categoryId: string;
    restaurantId: string;
    isAvailable: boolean;
}

export interface CreateMenuItemDto {
    name: string;
    description: string;
    price: number;
    image: string;
    categoryId: string;
    restaurantId: string;
}

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
    id: string;
    tableNumber: string;
    capacity: number;
    restaurantId?: string;
    qrCode?: string;
    status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED';
    createdAt: string;
    updatedAt: string;
    orders?: any[]; // Simplified for now
}

export interface CreateTableDto {
    tableNumber: string;
    capacity: number;
    status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED';
    qrCode?: string;
}

export interface UpdateTableDto {
    tableNumber?: string;
    capacity?: number;
    status?: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED';
    qrCode?: string;
}

// ============================================
// Permission Types
// ============================================

export interface Permission {
    id: string;
    key: string;
    category: string;
    action: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePermissionDto {
    key: string;
    category: string;
    action: string;
    description: string;
    isActive: boolean;
}

export interface UpdatePermissionDto {
    key?: string;
    category?: string;
    action?: string;
    description?: string;
    isActive?: boolean;
}
