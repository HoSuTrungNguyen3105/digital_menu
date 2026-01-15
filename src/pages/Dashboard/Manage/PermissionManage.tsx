import React, { useState } from "react";
import {
    Plus,
    Search,
    Key,
    MoreVertical,
    Edit2,
    Trash2,
    Shield,
    Loader2,
    Filter,
    Activity,
    Tag,
    AlignLeft,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import Modal from "../../../components/Modal";
import { useGetPermissions, useCreatePermission, useUpdatePermission, useDeletePermission } from "../../../api/permission.hooks";
import { Permission, TableQueryParams } from "../../../types";
import FiltersLayout from "../Menu/components/FilterLayout";

export default function PermissionManage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPermissionId, setSelectedPermissionId] = useState<string | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        key: "",
        category: "USER_MANAGEMENT",
        action: "VIEW",
        description: "",
        isActive: true,
    });

    // Filter States
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list' | "floor">('grid');
    const [sortBy, setSortBy] = useState("newest");
    const [activeCategory, setActiveCategory] = useState("All");

    // Pagination Logic
    const [pagination, setPagination] = useState({
        currentPage: 1,
        perPage: 10,
    });

    // API Hooks
    const queryParams: any = {
        current_page: pagination.currentPage,
        per_page: pagination.perPage,
        keyword: searchTerm,
        sort_by: sortBy === "newest" ? "createdAt" : "key",
        sort_dir: "DESC",
    };

    const { data: permissionsResponse, isLoading, error } = useGetPermissions(queryParams);
    const createMutation = useCreatePermission();
    const updateMutation = useUpdatePermission();
    const deleteMutation = useDeletePermission();

    const displayPermissions = permissionsResponse?.data || [];
    const meta = permissionsResponse?.pagination;

    const totalItems = meta?.total || 0;
    const fromRecord = meta ? (meta.current_page - 1) * meta.per_page + 1 : 1;
    const toRecord = meta ? Math.min(meta.current_page * meta.per_page, meta.total) : pagination.perPage;

    const handleRangeChange = (from: number, to: number, reset: boolean) => {
        if (reset) {
            setPagination({ currentPage: 1, perPage: 10 });
        } else {
            const newPerPage = to - from + 1;
            const newPage = Math.floor((from - 1) / newPerPage) + 1;
            setPagination({ currentPage: newPage, perPage: newPerPage });
        }
    };

    const handlePrevPage = () => {
        setPagination(prev => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }));
    };

    const handleNextPage = () => {
        setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }));
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createMutation.mutateAsync(formData);
            setShowCreateModal(false);
            setFormData({
                key: "",
                category: "USER_MANAGEMENT",
                action: "VIEW",
                description: "",
                isActive: true,
            });
        } catch (err) {
            console.error("Failed to create permission:", err);
        }
    };

    const toggleStatus = async (permission: Permission) => {
        try {
            await updateMutation.mutateAsync({
                permissionId: permission.id,
                data: { isActive: !permission.isActive }
            });
        } catch (err) {
            console.error("Failed to toggle status:", err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 text-left flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                            <Shield className="w-6 h-6" />
                        </div>
                        Access Permissions
                    </h1>
                    <p className="text-gray-500 text-sm mt-1 ml-11">
                        System-wide granular access control keys
                    </p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Assign Key
                </button>
            </div>

            {/* Filters (Reusing the layout for consistency) */}
            <FiltersLayout
                searchQuery={searchTerm}
                setSearchQuery={setSearchTerm}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                viewMode={viewMode}
                setViewMode={setViewMode}
                sortBy={sortBy}
                setSortBy={setSortBy}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                activeBrand={"All"}
                setActiveBrand={() => { }}
                activePriceRange={"All"}
                setActivePriceRange={() => { }}
                categories={["All", "USER_MANAGEMENT", "ORDER_MANAGEMENT", "RESTAURANT_MANAGEMENT", "SYSTEM"]}
                brands={[]}
                priceRanges={[]}
                fromRecord={fromRecord}
                toRecord={toRecord}
                totalItems={totalItems}
                onRangeChange={handleRangeChange}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
            />

            {/* Content */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest animate-pulse">Syncing Permissions...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-100 p-10 rounded-[2rem] text-center">
                    <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-red-900">Connection Failed</h3>
                    <p className="text-red-500 text-sm mt-1">Unable to bridge connection to permission server.</p>
                </div>
            ) : (
                <>
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayPermissions.map((perm) => (
                                <div key={perm.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:border-orange-200 transition-all group flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-gray-50 rounded-2xl text-gray-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                                            <Key className="w-6 h-6" />
                                        </div>
                                        <button
                                            onClick={() => toggleStatus(perm)}
                                            className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full transition-all ${perm.isActive
                                                ? "bg-green-50 text-green-600 hover:bg-green-100"
                                                : "bg-red-50 text-red-600 hover:bg-red-100"
                                                }`}>
                                            {perm.isActive ? "Active Key" : "Revoked"}
                                        </button>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Tag className="w-3 h-3 text-orange-400" />
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{perm.category}</span>
                                        </div>
                                        <h3 className="text-lg font-black text-gray-900 mb-2 font-mono">{perm.key}</h3>
                                        <p className="text-gray-500 text-xs line-clamp-2 mb-4 leading-relaxed font-medium">
                                            {perm.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-2">
                                            <Activity className="w-3 h-3 text-blue-500" />
                                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{perm.action}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><Edit2 className="w-4 h-4" /></button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Global Key</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Category</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Action</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Registry</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {displayPermissions.map((perm) => (
                                        <tr key={perm.id} className="hover:bg-gray-50/50 transition-colors group px-6">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-gray-900 font-mono">{perm.key}</span>
                                                    <span className="text-[10px] text-gray-400 font-medium truncate max-w-[200px]">{perm.description}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{perm.category}</span>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs font-bold text-blue-600">{perm.action}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => toggleStatus(perm)}
                                                    className={`flex items-center gap-1.5 ${perm.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                                    {perm.isActive ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                                    <span className="text-[10px] font-black uppercase">{perm.isActive ? 'Active' : 'Locked'}</span>
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-2 text-gray-400 hover:text-gray-900 rounded-xl hover:bg-white shadow-sm transition-all"><Edit2 className="w-4 h-4" /></button>
                                                    <button className="p-2 text-gray-400 hover:text-red-600 rounded-xl hover:bg-white shadow-sm transition-all"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}

            {/* Create Permission Modal */}
            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Registry New Permission Key"
                type="center"
            >
                <form onSubmit={handleCreate} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest text-left ml-1">
                                Permission Key (Unique ID)
                            </label>
                            <div className="relative">
                                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., USER_VIEW, ORDER_CREATE"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-mono focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                                    value={formData.key}
                                    onChange={(e) => setFormData({ ...formData, key: e.target.value.toUpperCase() })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest text-left ml-1">
                                    Category Layer
                                </label>
                                <select
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold appearance-none outline-none focus:ring-2 focus:ring-orange-500/20"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="USER_MANAGEMENT">User Logic</option>
                                    <option value="ORDER_MANAGEMENT">Order Flow</option>
                                    <option value="RESTAURANT_MANAGEMENT">Admin Layer</option>
                                    <option value="SYSTEM">Kernel/Core</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest text-left ml-1">
                                    Action Type
                                </label>
                                <select
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold appearance-none outline-none focus:ring-2 focus:ring-orange-500/20"
                                    value={formData.action}
                                    onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                                >
                                    <option value="VIEW">VIEW (Read)</option>
                                    <option value="CREATE">CREATE (Write)</option>
                                    <option value="UPDATE">UPDATE (Modify)</option>
                                    <option value="DELETE">DELETE (Remove)</option>
                                    <option value="FULL">FULL ACCESS</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest text-left ml-1">
                                Contextual Description
                            </label>
                            <textarea
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm min-h-[100px] outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                                placeholder="Describe the scope of this permission key..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <input
                                type="checkbox"
                                id="isActive"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                className="w-4 h-4 accent-orange-600 rounded"
                            />
                            <label htmlFor="isActive" className="text-xs font-bold text-gray-700 tracking-tight">Activate globally upon creation</label>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-gray-50">
                        <button
                            type="button"
                            onClick={() => setShowCreateModal(false)}
                            className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all"
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            disabled={createMutation.isPending}
                            className="flex-2 py-4 px-8 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Authorize & Register"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
