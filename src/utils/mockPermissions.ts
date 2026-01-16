import { Permission } from "../types";

/**
 * Mock Permission Data for Master Definitions
 * Categories: MENU, ORDER, TABLE, USER, RESTAURANT, PAYMENT, ANALYTICS, SYSTEM
 */

export const mockPermissions: Permission[] = [
    // ============================================
    // MENU_MANAGEMENT
    // ============================================
    {
        id: "perm_001",
        key: "MENU_VIEW_ALL",
        category: "MENU_MANAGEMENT",
        action: "VIEW",
        description: "View all menu items and categories across the restaurant",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_002",
        key: "MENU_CREATE_ITEM",
        category: "MENU_MANAGEMENT",
        action: "CREATE",
        description: "Create new menu items and add them to categories",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_003",
        key: "MENU_UPDATE_ITEM",
        category: "MENU_MANAGEMENT",
        action: "UPDATE",
        description: "Edit existing menu items, prices, and availability",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T14:20:00Z"
    },
    {
        id: "perm_004",
        key: "MENU_DELETE_ITEM",
        category: "MENU_MANAGEMENT",
        action: "DELETE",
        description: "Remove menu items from the system permanently",
        isActive: false,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T09:15:00Z"
    },
    {
        id: "perm_005",
        key: "MENU_MANAGE_CATEGORIES",
        category: "MENU_MANAGEMENT",
        action: "MANAGE",
        description: "Full control over menu categories including create, edit, and delete",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_006",
        key: "MENU_TOGGLE_AVAILABILITY",
        category: "MENU_MANAGEMENT",
        action: "UPDATE",
        description: "Toggle menu item availability status (in-stock/out-of-stock)",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },

    // ============================================
    // ORDER_MANAGEMENT
    // ============================================
    {
        id: "perm_007",
        key: "ORDER_VIEW_ALL",
        category: "ORDER_MANAGEMENT",
        action: "VIEW",
        description: "View all orders across all tables and time periods",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_008",
        key: "ORDER_CREATE",
        category: "ORDER_MANAGEMENT",
        action: "CREATE",
        description: "Create new orders and assign them to tables",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_009",
        key: "ORDER_UPDATE_STATUS",
        category: "ORDER_MANAGEMENT",
        action: "UPDATE",
        description: "Update order status (pending, confirmed, preparing, ready, completed)",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T11:45:00Z"
    },
    {
        id: "perm_010",
        key: "ORDER_CANCEL",
        category: "ORDER_MANAGEMENT",
        action: "DELETE",
        description: "Cancel orders and process refunds if applicable",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_011",
        key: "ORDER_MANAGE_KITCHEN",
        category: "ORDER_MANAGEMENT",
        action: "MANAGE",
        description: "Full kitchen order management including priority and timing",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_012",
        key: "ORDER_MODIFY_ITEMS",
        category: "ORDER_MANAGEMENT",
        action: "UPDATE",
        description: "Add or remove items from existing orders",
        isActive: false,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T08:30:00Z"
    },

    // ============================================
    // TABLE_MANAGEMENT
    // ============================================
    {
        id: "perm_013",
        key: "TABLE_VIEW_ALL",
        category: "TABLE_MANAGEMENT",
        action: "VIEW",
        description: "View all tables and their current status",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_014",
        key: "TABLE_CREATE",
        category: "TABLE_MANAGEMENT",
        action: "CREATE",
        description: "Add new tables to the restaurant floor plan",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_015",
        key: "TABLE_UPDATE_STATUS",
        category: "TABLE_MANAGEMENT",
        action: "UPDATE",
        description: "Change table status (available, occupied, reserved)",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_016",
        key: "TABLE_DELETE",
        category: "TABLE_MANAGEMENT",
        action: "DELETE",
        description: "Remove tables from the system",
        isActive: false,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T13:20:00Z"
    },
    {
        id: "perm_017",
        key: "TABLE_GENERATE_QR",
        category: "TABLE_MANAGEMENT",
        action: "CREATE",
        description: "Generate and regenerate QR codes for table ordering",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_018",
        key: "TABLE_ASSIGN_WAITER",
        category: "TABLE_MANAGEMENT",
        action: "MANAGE",
        description: "Assign waitstaff to specific tables and sections",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },

    // ============================================
    // USER_MANAGEMENT
    // ============================================
    {
        id: "perm_019",
        key: "USER_VIEW_ALL",
        category: "USER_MANAGEMENT",
        action: "VIEW",
        description: "View all system users and their roles",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_020",
        key: "USER_CREATE",
        category: "USER_MANAGEMENT",
        action: "CREATE",
        description: "Create new user accounts and assign roles",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_021",
        key: "USER_UPDATE_PROFILE",
        category: "USER_MANAGEMENT",
        action: "UPDATE",
        description: "Edit user profiles and personal information",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T10:00:00Z"
    },
    {
        id: "perm_022",
        key: "USER_UPDATE_ROLE",
        category: "USER_MANAGEMENT",
        action: "UPDATE",
        description: "Change user roles and permission levels",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_023",
        key: "USER_DEACTIVATE",
        category: "USER_MANAGEMENT",
        action: "DELETE",
        description: "Deactivate user accounts and revoke access",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_024",
        key: "USER_MANAGE_PERMISSIONS",
        category: "USER_MANAGEMENT",
        action: "MANAGE",
        description: "Full control over user permissions and access control",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_025",
        key: "USER_RESET_PASSWORD",
        category: "USER_MANAGEMENT",
        action: "UPDATE",
        description: "Reset user passwords and manage authentication",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },

    // ============================================
    // RESTAURANT_MANAGEMENT
    // ============================================
    {
        id: "perm_026",
        key: "RESTAURANT_VIEW_INFO",
        category: "RESTAURANT_MANAGEMENT",
        action: "VIEW",
        description: "View restaurant information and settings",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_027",
        key: "RESTAURANT_UPDATE_INFO",
        category: "RESTAURANT_MANAGEMENT",
        action: "UPDATE",
        description: "Edit restaurant details, contact info, and branding",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T15:30:00Z"
    },
    {
        id: "perm_028",
        key: "RESTAURANT_UPDATE_HOURS",
        category: "RESTAURANT_MANAGEMENT",
        action: "UPDATE",
        description: "Modify operating hours and special schedules",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_029",
        key: "RESTAURANT_MANAGE_LOCATIONS",
        category: "RESTAURANT_MANAGEMENT",
        action: "MANAGE",
        description: "Add, edit, or remove restaurant locations (multi-branch)",
        isActive: false,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T12:10:00Z"
    },
    {
        id: "perm_030",
        key: "RESTAURANT_UPDATE_BRANDING",
        category: "RESTAURANT_MANAGEMENT",
        action: "UPDATE",
        description: "Upload and manage restaurant logo, banner, and theme",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },

    // ============================================
    // PAYMENT_MANAGEMENT
    // ============================================
    {
        id: "perm_031",
        key: "PAYMENT_VIEW_TRANSACTIONS",
        category: "PAYMENT_MANAGEMENT",
        action: "VIEW",
        description: "View all payment transactions and history",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_032",
        key: "PAYMENT_PROCESS",
        category: "PAYMENT_MANAGEMENT",
        action: "CREATE",
        description: "Process payments and complete transactions",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_033",
        key: "PAYMENT_REFUND",
        category: "PAYMENT_MANAGEMENT",
        action: "DELETE",
        description: "Issue refunds and process payment reversals",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T09:45:00Z"
    },
    {
        id: "perm_034",
        key: "PAYMENT_MANAGE_METHODS",
        category: "PAYMENT_MANAGEMENT",
        action: "MANAGE",
        description: "Configure payment methods and gateway settings",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_035",
        key: "PAYMENT_EXPORT_REPORTS",
        category: "PAYMENT_MANAGEMENT",
        action: "VIEW",
        description: "Export payment reports and financial summaries",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_036",
        key: "PAYMENT_SPLIT_BILL",
        category: "PAYMENT_MANAGEMENT",
        action: "UPDATE",
        description: "Split bills between multiple customers or payment methods",
        isActive: false,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T14:00:00Z"
    },

    // ============================================
    // ANALYTICS
    // ============================================
    {
        id: "perm_037",
        key: "ANALYTICS_VIEW_DASHBOARD",
        category: "ANALYTICS",
        action: "VIEW",
        description: "Access analytics dashboard and key metrics",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_038",
        key: "ANALYTICS_VIEW_SALES",
        category: "ANALYTICS",
        action: "VIEW",
        description: "View sales reports and revenue analytics",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_039",
        key: "ANALYTICS_VIEW_MENU_PERFORMANCE",
        category: "ANALYTICS",
        action: "VIEW",
        description: "Analyze menu item performance and popularity trends",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T11:20:00Z"
    },
    {
        id: "perm_040",
        key: "ANALYTICS_VIEW_CUSTOMER",
        category: "ANALYTICS",
        action: "VIEW",
        description: "Access customer analytics and behavior insights",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_041",
        key: "ANALYTICS_EXPORT_DATA",
        category: "ANALYTICS",
        action: "CREATE",
        description: "Export analytics data and generate custom reports",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_042",
        key: "ANALYTICS_VIEW_REALTIME",
        category: "ANALYTICS",
        action: "VIEW",
        description: "Monitor real-time statistics and live activity",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },

    // ============================================
    // SYSTEM_SETTINGS
    // ============================================
    {
        id: "perm_043",
        key: "SYSTEM_VIEW_SETTINGS",
        category: "SYSTEM_SETTINGS",
        action: "VIEW",
        description: "View system configuration and settings",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_044",
        key: "SYSTEM_UPDATE_SETTINGS",
        category: "SYSTEM_SETTINGS",
        action: "UPDATE",
        description: "Modify system settings and configurations",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T16:00:00Z"
    },
    {
        id: "perm_045",
        key: "SYSTEM_MANAGE_BACKUPS",
        category: "SYSTEM_SETTINGS",
        action: "MANAGE",
        description: "Create, restore, and manage system backups",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_046",
        key: "SYSTEM_VIEW_LOGS",
        category: "SYSTEM_SETTINGS",
        action: "VIEW",
        description: "Access system logs and audit trails",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_047",
        key: "SYSTEM_MANAGE_INTEGRATIONS",
        category: "SYSTEM_SETTINGS",
        action: "MANAGE",
        description: "Configure third-party integrations and API keys",
        isActive: false,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-16T10:30:00Z"
    },
    {
        id: "perm_048",
        key: "SYSTEM_MANAGE_NOTIFICATIONS",
        category: "SYSTEM_SETTINGS",
        action: "MANAGE",
        description: "Configure notification settings and email templates",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_049",
        key: "SYSTEM_CLEAR_CACHE",
        category: "SYSTEM_SETTINGS",
        action: "DELETE",
        description: "Clear system cache and temporary data",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "perm_050",
        key: "SYSTEM_MANAGE_API_KEYS",
        category: "SYSTEM_SETTINGS",
        action: "MANAGE",
        description: "Generate and manage API keys for external access",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    }
];

/**
 * Helper function to get permissions by category
 */
export const getPermissionsByCategory = (category: string): Permission[] => {
    return mockPermissions.filter(p => p.category === category);
};

/**
 * Helper function to get all unique categories
 */
export const getAllCategories = (): string[] => {
    return Array.from(new Set(mockPermissions.map(p => p.category)));
};

/**
 * Helper function to get active permissions only
 */
export const getActivePermissions = (): Permission[] => {
    return mockPermissions.filter(p => p.isActive);
};

/**
 * Helper function to search permissions
 */
export const searchPermissions = (keyword: string): Permission[] => {
    const lowerKeyword = keyword.toLowerCase();
    return mockPermissions.filter(p => 
        p.key.toLowerCase().includes(lowerKeyword) ||
        p.category.toLowerCase().includes(lowerKeyword) ||
        p.description.toLowerCase().includes(lowerKeyword)
    );
};
