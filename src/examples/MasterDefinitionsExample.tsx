/**
 * Example: How to use Mock Permissions in MasterDefinitions Component
 * 
 * This file demonstrates various ways to integrate mock permission data
 */

import React, { useState } from "react";
import { mockPermissions, getAllCategories, searchPermissions } from "../utils/mockPermissions";
import { Permission } from "../types";

// ============================================
// Example 1: Direct Usage (No API)
// ============================================
export function MasterDefinitionsWithDirectMock() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Use mock data directly
    const permissions = searchTerm 
        ? searchPermissions(searchTerm)
        : mockPermissions;

    const categories = getAllCategories();

    // Filter by selected category
    const filteredPermissions = selectedCategory
        ? permissions.filter(p => p.category === selectedCategory)
        : permissions;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Master Definitions (Direct Mock)</h1>
            
            {/* Search */}
            <input
                type="text"
                placeholder="Search permissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 px-4 py-2 border rounded"
            />

            {/* Category Filter */}
            <div className="flex gap-2 mb-4">
                <button onClick={() => setSelectedCategory(null)}>All</button>
                {categories.map(cat => (
                    <button 
                        key={cat} 
                        onClick={() => setSelectedCategory(cat)}
                        className={selectedCategory === cat ? 'font-bold' : ''}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Permissions List */}
            <div className="space-y-2">
                {filteredPermissions.map(perm => (
                    <div key={perm.id} className="border p-4 rounded">
                        <div className="font-mono font-bold">{perm.key}</div>
                        <div className="text-sm text-gray-600">{perm.description}</div>
                        <div className="text-xs mt-2">
                            <span className={perm.isActive ? 'text-green-600' : 'text-red-600'}>
                                {perm.isActive ? 'ACTIVE' : 'INACTIVE'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================
// Example 2: With Local State Management
// ============================================
export function MasterDefinitionsWithState() {
    const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
    const [searchTerm, setSearchTerm] = useState("");

    const handleToggleStatus = (permissionId: string) => {
        setPermissions(prev => 
            prev.map(p => 
                p.id === permissionId 
                    ? { ...p, isActive: !p.isActive, updatedAt: new Date().toISOString() }
                    : p
            )
        );
    };

    const handleCreatePermission = (newPerm: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>) => {
        const permission: Permission = {
            ...newPerm,
            id: `perm_${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setPermissions(prev => [...prev, permission]);
    };

    const filteredPermissions = searchTerm
        ? permissions.filter(p => 
            p.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : permissions;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Master Definitions (With State)</h1>
            
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 px-4 py-2 border rounded w-full"
            />

            <div className="mb-4 text-sm text-gray-600">
                Total: {permissions.length} | 
                Active: {permissions.filter(p => p.isActive).length} | 
                Inactive: {permissions.filter(p => !p.isActive).length}
            </div>

            <div className="space-y-2">
                {filteredPermissions.map(perm => (
                    <div key={perm.id} className="border p-4 rounded flex justify-between items-center">
                        <div>
                            <div className="font-mono font-bold">{perm.key}</div>
                            <div className="text-sm text-gray-600">{perm.description}</div>
                        </div>
                        <button
                            onClick={() => handleToggleStatus(perm.id)}
                            className={`px-4 py-2 rounded ${
                                perm.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                        >
                            {perm.isActive ? 'Active' : 'Inactive'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================
// Example 3: Grouped by Category
// ============================================
export function MasterDefinitionsGrouped() {
    const categories = getAllCategories();
    
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Master Definitions (Grouped)</h1>
            
            {categories.map(category => {
                const categoryPermissions = mockPermissions.filter(p => p.category === category);
                
                return (
                    <div key={category} className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="text-xl font-bold">{category}</h2>
                            <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                {categoryPermissions.length} permissions
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {categoryPermissions.map(perm => (
                                <div 
                                    key={perm.id} 
                                    className="border rounded p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="font-mono text-sm font-bold text-blue-600">
                                            {perm.key}
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded ${
                                            perm.isActive 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-red-100 text-red-700'
                                        }`}>
                                            {perm.isActive ? 'ACTIVE' : 'INACTIVE'}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600 mb-2">
                                        {perm.description}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span className="bg-gray-100 px-2 py-1 rounded">
                                            {perm.action}
                                        </span>
                                        <span>
                                            Updated: {new Date(perm.updatedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ============================================
// Example 4: Statistics Dashboard
// ============================================
export function PermissionStatistics() {
    const totalPermissions = mockPermissions.length;
    const activePermissions = mockPermissions.filter(p => p.isActive).length;
    const inactivePermissions = mockPermissions.filter(p => !p.isActive).length;
    
    const categoryCounts = mockPermissions.reduce((acc, perm) => {
        acc[perm.category] = (acc[perm.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    
    const actionCounts = mockPermissions.reduce((acc, perm) => {
        acc[perm.action] = (acc[perm.action] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Permission Statistics</h1>
            
            {/* Overview Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">{totalPermissions}</div>
                    <div className="text-sm text-gray-600">Total Permissions</div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{activePermissions}</div>
                    <div className="text-sm text-gray-600">Active Permissions</div>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-red-600">{inactivePermissions}</div>
                    <div className="text-sm text-gray-600">Inactive Permissions</div>
                </div>
            </div>

            {/* Category Breakdown */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">By Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(categoryCounts).map(([category, count]) => (
                        <div key={category} className="border rounded p-4">
                            <div className="text-2xl font-bold">{count}</div>
                            <div className="text-sm text-gray-600">{category}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Type Breakdown */}
            <div>
                <h2 className="text-xl font-bold mb-4">By Action Type</h2>
                <div className="grid grid-cols-5 gap-4">
                    {Object.entries(actionCounts).map(([action, count]) => (
                        <div key={action} className="border rounded p-4 text-center">
                            <div className="text-2xl font-bold">{count}</div>
                            <div className="text-sm text-gray-600">{action}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============================================
// Export all examples
// ============================================
export default {
    DirectMock: MasterDefinitionsWithDirectMock,
    WithState: MasterDefinitionsWithState,
    Grouped: MasterDefinitionsGrouped,
    Statistics: PermissionStatistics
};
