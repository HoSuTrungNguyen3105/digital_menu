# Mock Permissions Data - Usage Guide

This file contains comprehensive mock data for the Master Definitions (Permissions) system.

## 📋 Contents

The mock data includes **50 permissions** across **8 categories**:

1. **MENU_MANAGEMENT** (6 permissions) - Menu items, categories, availability
2. **ORDER_MANAGEMENT** (6 permissions) - Order creation, status updates, kitchen management
3. **TABLE_MANAGEMENT** (6 permissions) - Table operations, QR codes, waiter assignments
4. **USER_MANAGEMENT** (7 permissions) - User accounts, roles, permissions
5. **RESTAURANT_MANAGEMENT** (5 permissions) - Restaurant info, branding, locations
6. **PAYMENT_MANAGEMENT** (6 permissions) - Transactions, refunds, payment methods
7. **ANALYTICS** (6 permissions) - Reports, dashboards, data export
8. **SYSTEM_SETTINGS** (8 permissions) - System configuration, backups, integrations

## 🎯 How to Use

### Option 1: Direct Import in Components

```tsx
import { mockPermissions } from '../utils/mockPermissions';

function MyComponent() {
    // Use directly in your component
    const permissions = mockPermissions;
    
    return (
        <div>
            {permissions.map(perm => (
                <div key={perm.id}>{perm.key}</div>
            ))}
        </div>
    );
}
```

### Option 2: Mock API Response

Update your permission API to use mock data during development:

```tsx
// In src/api/permission.api.ts
import { mockPermissions, searchPermissions } from "../utils/mockPermissions";

export const getPermissions = (params?: any): Promise<AxiosResponse<ApiResponse<Permission[]>>> => {
    // DEVELOPMENT MODE - Use mock data
    if (import.meta.env.DEV) {
        const filteredData = params?.keyword 
            ? searchPermissions(params.keyword)
            : mockPermissions;
            
        return Promise.resolve({
            data: {
                code: 200,
                data: filteredData,
                message: "Success"
            }
        } as AxiosResponse<ApiResponse<Permission[]>>);
    }
    
    // PRODUCTION MODE - Use real API
    return instance.get("/permissions", { params });
};
```

### Option 3: MSW (Mock Service Worker)

For more sophisticated mocking:

```tsx
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { mockPermissions } from '../utils/mockPermissions';

export const handlers = [
    http.get('/api/permissions', ({ request }) => {
        const url = new URL(request.url);
        const keyword = url.searchParams.get('keyword');
        
        let data = mockPermissions;
        if (keyword) {
            data = searchPermissions(keyword);
        }
        
        return HttpResponse.json({
            code: 200,
            data: data,
            message: 'Success'
        });
    }),
];
```

### Option 4: React Query Initial Data

```tsx
import { useQuery } from '@tanstack/react-query';
import { mockPermissions } from '../utils/mockPermissions';

export const useGetPermissions = (params?: any) => {
    return useQuery({
        queryKey: ['permissions', params],
        queryFn: () => getPermissions(params),
        initialData: {
            code: 200,
            data: mockPermissions,
            message: 'Success'
        }
    });
};
```

## 🛠️ Helper Functions

### Get Permissions by Category
```tsx
import { getPermissionsByCategory } from '../utils/mockPermissions';

const menuPermissions = getPermissionsByCategory('MENU_MANAGEMENT');
```

### Get All Categories
```tsx
import { getAllCategories } from '../utils/mockPermissions';

const categories = getAllCategories();
// Returns: ['MENU_MANAGEMENT', 'ORDER_MANAGEMENT', ...]
```

### Get Active Permissions Only
```tsx
import { getActivePermissions } from '../utils/mockPermissions';

const activePerms = getActivePermissions();
```

### Search Permissions
```tsx
import { searchPermissions } from '../utils/mockPermissions';

const results = searchPermissions('menu');
// Returns all permissions with 'menu' in key, category, or description
```

## 📊 Data Statistics

- **Total Permissions**: 50
- **Active Permissions**: 42 (84%)
- **Inactive Permissions**: 8 (16%)
- **Categories**: 8
- **Action Types**: VIEW, CREATE, UPDATE, DELETE, MANAGE

## 🎨 Permission Status Distribution

Active permissions are marked with `isActive: true` and represent permissions currently enforced in the system. Inactive permissions are temporarily suspended and won't be available to roles.

## 🔄 Customization

To add more permissions, simply extend the `mockPermissions` array:

```tsx
export const mockPermissions: Permission[] = [
    // ... existing permissions
    {
        id: "perm_051",
        key: "YOUR_NEW_PERMISSION",
        category: "YOUR_CATEGORY",
        action: "VIEW",
        description: "Description here",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];
```

## 💡 Best Practices

1. **Use consistent naming**: Follow the pattern `CATEGORY_ACTION_SCOPE`
2. **Provide clear descriptions**: Help users understand what each permission does
3. **Group logically**: Keep related permissions in the same category
4. **Set appropriate defaults**: Most permissions should be active by default
5. **Update timestamps**: Keep `updatedAt` current when modifying permissions

## 🔗 Integration with Master Definitions Component

The `MasterDefinitions.tsx` component is already set up to work with this data structure. It will:

- Group permissions by category
- Display active/inactive status
- Allow filtering by category
- Show permission details
- Enable status toggling

Simply ensure your API layer returns data in the expected format!
