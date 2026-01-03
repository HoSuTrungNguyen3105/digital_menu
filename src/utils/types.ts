/* =======================
   COMMON TYPES
======================= */

export type ID = string;
export type DecimalString = string; // Prisma Decimal -> string
export type ISODateString = string;

/* =======================
   ENUMS
======================= */

export enum OrderStatus {
    PENDING = "PENDING",
    PREPARING = "PREPARING",
    SERVED = "SERVED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

export enum OrderType {
    DINE_IN = "DINE_IN",
    TAKE_AWAY = "TAKE_AWAY",
}

export enum TableStatus {
    AVAILABLE = "AVAILABLE",
    OCCUPIED = "OCCUPIED",
    RESERVED = "RESERVED",
    OUT_OF_SERVICE = "OUT_OF_SERVICE",
}

export enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED",
}

export enum PaymentMethod {
    CASH = "CASH",
    MOMO = "MOMO",
    ZALOPAY = "ZALOPAY",
    STRIPE = "STRIPE",
}

export enum TransferStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
}

export enum Role {
    GUEST = "GUEST",
    CUSTOMER = "CUSTOMER",
    ADMIN = "ADMIN",
    MONITOR = "MONITOR",
}

export enum Rank {
    NONE = "NONE",
    SILVER = "SILVER",
    GOLD = "GOLD",
    PLATINUM = "PLATINUM",
}

export enum LeaveStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED",
}

export enum UnlockStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

export enum EmployeeStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED",
    TERMINATED = "TERMINATED",
}

export enum AttendanceStatus {
    PRESENT = "PRESENT",
    ABSENT = "ABSENT",
    LATE = "LATE",
    ON_LEAVE = "ON_LEAVE",
    REMOTE = "REMOTE",
}

export enum PayrollStatus {
    DRAFT = "DRAFT",
    FINALIZED = "FINALIZED",
    PAID = "PAID",
}

export enum Department {
    HR = "HR",
    IT = "IT",
    FINANCE = "FINANCE",
    OPS = "OPS",
    SECURITY = "SECURITY",
    OTHER = "OTHER",
}

/* =======================
   PRODUCT & CATEGORY
======================= */

export interface Category {
    id: ID;
    name: string;
    isActive: boolean;
    displayOrder: number;
    products?: Product[];
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

export interface Product {
    id: ID;
    name: string;
    description?: string | null;
    price: DecimalString;
    imageUrl?: string | null;
    isAvailable: boolean;
    isFeatured: boolean;
    displayOrder: number;
    calories?: number | null;
    allergens: string[];
    categoryId: ID;
    category?: Category;
    tags?: ProductTag[];
    optionGroups?: ProductOptionGroup[];
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

export interface ProductTag {
    id: ID;
    name: string;
    color?: string | null;
    icon?: string | null;
    products?: Product[];
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

export interface ProductOptionGroup {
    id: ID;
    name: string;
    minSelect: number;
    maxSelect: number;
    isRequired: boolean;
    productId: ID;
    options?: ProductOption[];
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

export interface ProductOption {
    id: ID;
    name: string;
    price: DecimalString;
    isAvailable: boolean;
    optionGroupId: ID;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

/* =======================
   ORDER
======================= */

export interface RestaurantTable {
    id: ID;
    tableNumber: string;
    capacity: number;
    status: TableStatus;
    qrCode?: string | null;
    orders?: Order[];
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

export interface Order {
    id: ID;
    status: OrderStatus;
    type: OrderType;
    totalAmount: DecimalString;
    notes?: string | null;
    tableId?: ID | null;
    tableNumber?: string | null;
    table?: RestaurantTable | null;
    items?: OrderItem[];
    paymentStatus: PaymentStatus;
    paymentMethod?: PaymentMethod | null;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

export interface OrderItem {
    id: ID;
    quantity: number;
    price: DecimalString;
    notes?: string | null;
    selectedOptions?: any;
    productId: ID;
    product?: Product;
    orderId: ID;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

/* =======================
   STAFF & AUTH
======================= */

export interface Staff {
    id: number;
    email: string;
    name: string;
    role: Role;
    password: string;
    pictureUrl: string;
    rank: Rank;
    department?: Department | null;
    employeeNo?: string | null;
    status: EmployeeStatus;
    phone: string;
    isDeleted: boolean;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

export interface UserSession {
    id: number;
    userId?: number | null;
    token: string;
    browser?: string | null;
    device?: string | null;
    ipAddress?: string | null;
    isCurrent: boolean;
}

/* =======================
   PAYROLL & ATTENDANCE
======================= */

export interface Payroll {
    id: number;
    employeeId: number;
    month: number;
    year: number;
    baseSalary: number;
    allowances: number;
    deductions: number;
    tax: number;
    netPay: number;
    status: PayrollStatus;
}

export interface Attendance {
    id: number;
    employeeId: number;
    date: DecimalString;
    checkIn: DecimalString;
    checkOut: DecimalString;
    status: AttendanceStatus;
    workedHours?: number | null;
}
