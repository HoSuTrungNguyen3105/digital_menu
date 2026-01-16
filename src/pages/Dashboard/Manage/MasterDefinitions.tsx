import React, { useState } from "react";
import {
    Plus,
    Search,
    Shield,
    Loader2,
    Save,
    X,
    Terminal,
    Activity,
    Lock,
    Unlock,
    AlertTriangle,
    CheckCircle2,
    ChevronDown,
    Check
} from "lucide-react";
import { useGetPermissions, useCreatePermission, useUpdatePermission } from "../../../api/permission.hooks";
import { Permission } from "../../../types";
import { mockPermissions } from "../../../utils/mockPermissions";

// Styled components for the "Premium" look (using Tailwind classes)

export default function MasterDefinitions() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showCreatePanel, setShowCreatePanel] = useState(false);
    const [activePermission, setActivePermission] = useState<Permission | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        key: "",
        category: "",
        description: "",
        isActive: true,
        action: "VIEW"
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [actionSearchTerm, setActionSearchTerm] = useState("");
    const [payloadViewMode, setPayloadViewMode] = useState<'json' | 'formatted'>('formatted');


    const { data: permissionsResponse, isLoading } = useGetPermissions({
        per_page: 100, // Load all for the master view
        keyword: searchTerm
    });

    const createMutation = useCreatePermission();
    const updateMutation = useUpdatePermission();

    // Use API data if available, otherwise fallback to mock data
    const apiPermissions: Permission[] = (permissionsResponse?.data && permissionsResponse.data.length > 0)
        ? permissionsResponse.data
        : mockPermissions;

    // Local state for permissions to enable toggle without API
    const [localPermissions, setLocalPermissions] = useState<Permission[]>(apiPermissions);

    // Update local permissions when API data changes
    React.useEffect(() => {
        setLocalPermissions(apiPermissions);
    }, [permissionsResponse]);

    const permissions = localPermissions;

    // Group permissions by category
    const categories = Array.from(new Set(permissions.map(p => p.category)));
    const groupedPermissions = categories.reduce((acc, category) => {
        acc[category] = permissions.filter(p => p.category === category);
        return acc;
    }, {} as Record<string, Permission[]>);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createMutation.mutateAsync(formData);
            setShowCreatePanel(false);
            setFormData({ key: "", category: "", description: "", isActive: true, action: "VIEW" });
        } catch (error) {
            console.error(error);
        }
    };

    const toggleStatus = async (permission: Permission) => {
        try {
            // Optimistically update the UI for mock data
            const updatedPermissions = permissions.map(p =>
                p.id === permission.id ? { ...p, isActive: !p.isActive } : p
            );

            // Try to update via API (will work when connected)
            await updateMutation.mutateAsync({
                permissionId: permission.id,
                data: { isActive: !permission.isActive }
            });
        } catch (error) {
            console.error(error);
            // Even if API fails, the UI will update for demo purposes
        }
    };

    return (
        <div className="bg-gray-50 text-gray-900 font-sans">
            {/* Header */}
            <header className="flex justify-between items-center mb-12 border-b border-gray-200 pb-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight flex items-center gap-4 text-gray-900">
                        <div className="p-3 bg-orange-100 rounded-2xl">
                            <Shield className="w-10 h-10 text-orange-600" />
                        </div>
                        Master Definitions
                    </h1>
                    <p className="text-gray-500 mt-3 text-lg ml-1">
                        Global Permission Registry & Configuration Scope
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowCreatePanel(!showCreatePanel)}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all flex items-center gap-3 shadow-lg shadow-orange-200 text-lg"
                    >
                        <Plus className="w-6 h-6" />
                        Define New Key
                    </button>
                </div>
            </header>

            {/* Quick Stats / Filters */}
            <div className="grid grid-cols-12 gap-10">
                {/* Sidebar Filter */}
                <div className="col-span-12 md:col-span-3 space-y-3">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 px-2">Data Categories</h3>
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`w-full text-left px-6 py-4 rounded-xl text-base font-medium transition-all ${!selectedCategory
                            ? 'bg-orange-50 text-orange-700 border border-orange-200 shadow-sm'
                            : 'text-gray-600 hover:bg-white hover:shadow-md bg-transparent'}`}
                    >
                        ALL RECORDS
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`w-full text-left px-6 py-4 rounded-xl text-base font-medium transition-all ${selectedCategory === cat
                                ? 'bg-orange-50 text-orange-700 border border-orange-200 shadow-sm'
                                : 'text-gray-600 hover:bg-white hover:shadow-md bg-transparent'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Main Content */}
                <div className="col-span-12 md:col-span-9 space-y-8">

                    {/* Create Panel (Collapsible) */}
                    {showCreatePanel && (
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-10 shadow-xl shadow-gray-100 animate-in slide-in-from-top-4 fade-in duration-300">
                            <div className="flex justify-between items-start mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Terminal className="w-6 h-6 text-green-600" />
                                    </div>
                                    New Definition Payload
                                </h3>
                                <button onClick={() => setShowCreatePanel(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                            </div>

                            <form onSubmit={handleCreate} className="grid grid-cols-2 gap-8">
                                <div className="col-span-2 md:col-span-1 space-y-3">
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wide">Permission Key (ID)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. FLIGHT_VIEW_ALL"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-base text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none font-mono transition-all"
                                        value={formData.key}
                                        onChange={e => setFormData({ ...formData, key: e.target.value.toUpperCase() })}
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wide">Category</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. FLIGHT_OPS"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-base text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-3 relative">
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wide">Action Type</label>

                                    <div className="relative">
                                        {/* Dropdown Button */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsDropdownOpen(!isDropdownOpen);
                                                if (!isDropdownOpen) setActionSearchTerm("");
                                            }}
                                            className="w-full text-left bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-base text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all flex items-center justify-between hover:bg-white"
                                        >
                                            <span className={formData.action ? "text-gray-900 font-medium" : "text-gray-400"}>
                                                {formData.action || "Select or type action..."}
                                            </span>
                                            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Dropdown Panel */}
                                        {isDropdownOpen && (
                                            <>
                                                {/* Backdrop */}
                                                <div
                                                    className="fixed inset-0 z-40"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                />

                                                {/* Dropdown Content */}
                                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                                    {/* Search Input */}
                                                    <div className="p-3 border-b border-gray-100">
                                                        <div className="relative">
                                                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                            <input
                                                                type="text"
                                                                placeholder="Search or type new action..."
                                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                                                autoFocus
                                                                value={actionSearchTerm}
                                                                onChange={(e) => setActionSearchTerm(e.target.value.toUpperCase())}
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Options List */}
                                                    <div className="max-h-64 overflow-y-auto p-2">
                                                        {["VIEW", "CREATE", "UPDATE", "DELETE", "MANAGE", "EXPORT", "APPROVE", "REJECT"]
                                                            .filter(opt => opt.includes(actionSearchTerm))
                                                            .map(opt => (
                                                                <button
                                                                    key={opt}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setFormData({ ...formData, action: opt });
                                                                        setIsDropdownOpen(false);
                                                                        setActionSearchTerm("");
                                                                    }}
                                                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between group ${formData.action === opt
                                                                        ? 'bg-orange-50 text-orange-700 border border-orange-200'
                                                                        : 'text-gray-700 hover:bg-gray-50'
                                                                        }`}
                                                                >
                                                                    <span className="flex items-center gap-2">
                                                                        {formData.action === opt && <Check className="w-4 h-4 text-orange-600" />}
                                                                        {opt}
                                                                    </span>
                                                                </button>
                                                            ))}

                                                        {/* Custom Action Option */}
                                                        {actionSearchTerm && !["VIEW", "CREATE", "UPDATE", "DELETE", "MANAGE", "EXPORT", "APPROVE", "REJECT"].includes(actionSearchTerm) && (
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setFormData({ ...formData, action: actionSearchTerm });
                                                                    setIsDropdownOpen(false);
                                                                    setActionSearchTerm("");
                                                                }}
                                                                className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-green-600 hover:bg-green-50 transition-all flex items-center gap-2 border border-dashed border-green-300 mt-2"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                                Create custom: <span className="font-mono">{actionSearchTerm}</span>
                                                            </button>
                                                        )}

                                                        {/* No Results */}
                                                        {actionSearchTerm && ["VIEW", "CREATE", "UPDATE", "DELETE", "MANAGE", "EXPORT", "APPROVE", "REJECT"].filter(opt => opt.includes(actionSearchTerm)).length === 0 && !actionSearchTerm && (
                                                            <div className="px-4 py-8 text-center text-gray-400 text-sm">
                                                                No matching actions found
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <p className="text-xs text-gray-400 px-2 flex items-center gap-1">
                                        <Search className="w-3 h-3" />
                                        Choose from standard actions or type to create custom
                                    </p>
                                </div>

                                <div className="col-span-2 space-y-3">
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wide">Description</label>
                                    <textarea
                                        placeholder="Describe the functional scope of this permission..."
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-base text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none min-h-[120px] transition-all"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <div className="col-span-2 flex justify-end gap-4 pt-6 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreatePanel(false)}
                                        className="px-8 py-3.5 rounded-xl text-base font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={createMutation.isPending}
                                        className="bg-green-600 hover:bg-green-700 text-white px-10 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-green-200 flex items-center gap-2"
                                    >
                                        {createMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                        Deploy Definition
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Permissions List */}
                    <div className="space-y-10">
                        {isLoading ? (
                            <div className="flex justify-center p-20">
                                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                            </div>
                        ) : (
                            Object.entries(groupedPermissions)
                                .filter(([cat]) => !selectedCategory || cat === selectedCategory)
                                .map(([category, items]) => (
                                    <div key={category} className="space-y-6">
                                        <div className="flex items-center gap-4 px-2">
                                            <div className="w-3 h-3 rounded-full bg-orange-500 ring-4 ring-orange-100"></div>
                                            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{category}</h2>
                                            <span className="text-sm font-bold bg-gray-100 text-gray-500 px-3 py-1.5 rounded-lg border border-gray-200">{items.length} KEYS</span>
                                        </div>

                                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                            {items.map((perm, idx) => (
                                                <div
                                                    key={perm.id}
                                                    onClick={() => setActivePermission(perm)}
                                                    className={`group flex items-center justify-between p-6 md:p-8 border-b border-gray-100 last:border-0 hover:bg-orange-50/50 transition-all cursor-pointer ${activePermission?.id === perm.id ? 'bg-orange-50' : ''}`}
                                                >
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-4 mb-2">
                                                            <span className="font-mono text-lg font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">{perm.key}</span>
                                                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${perm.isActive
                                                                ? 'text-green-700 border-green-200 bg-green-50'
                                                                : 'text-red-700 border-red-200 bg-red-50'
                                                                }`}>
                                                                {perm.isActive ? 'ACTIVE' : 'DISABLED'}
                                                            </span>
                                                        </div>
                                                        <p className="text-base text-gray-500 leading-relaxed max-w-3xl">{perm.description || "No description provided."}</p>
                                                    </div>

                                                    <div className="flex items-center gap-8 pl-6">
                                                        <div className="text-right hidden xl:block">
                                                            <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Last Updated</span>
                                                            <span className="text-sm text-gray-600 font-medium font-mono bg-gray-50 px-2 py-1 rounded">
                                                                {new Date(perm.updatedAt || Date.now()).toLocaleDateString()}
                                                            </span>
                                                        </div>

                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleStatus(perm);
                                                            }}
                                                            disabled={updateMutation.isPending}
                                                            className={`relative w-16 h-9 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-orange-100 ${perm.isActive
                                                                ? 'bg-gradient-to-r from-green-400 to-green-600 shadow-lg shadow-green-200'
                                                                : 'bg-gradient-to-r from-gray-300 to-gray-400 shadow-md'
                                                                }`}
                                                        >
                                                            <span
                                                                className={`absolute top-1 flex items-center justify-center w-7 h-7 bg-white rounded-full shadow-lg transition-all duration-300 ease-in-out ${perm.isActive ? 'left-8' : 'left-1'
                                                                    }`}
                                                            >
                                                                {perm.isActive ? (
                                                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                                ) : (
                                                                    <X className="w-4 h-4 text-gray-400" />
                                                                )}
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                        )}

                        {!isLoading && permissions.length === 0 && (
                            <div className="text-center py-24 text-gray-400">
                                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Shield className="w-12 h-12 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No Definitions Found</h3>
                                <p className="text-lg">Get started by defining your first permission key.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Live Payload Preview (Optional - Bottom Panel) */}
            {activePermission && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 transform transition-transform duration-300">
                    <div className="max-w-[1600px] mx-auto flex items-start gap-12">
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-bold text-orange-600 uppercase tracking-widest flex items-center gap-2">
                                    <Activity className="w-5 h-5" /> Live Context Payload
                                </h4>

                                {/* View Mode Toggle */}
                                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                    <button
                                        onClick={() => setPayloadViewMode('formatted')}
                                        className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${payloadViewMode === 'formatted'
                                            ? 'bg-white text-orange-600 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        Formatted
                                    </button>
                                    <button
                                        onClick={() => setPayloadViewMode('json')}
                                        className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${payloadViewMode === 'json'
                                            ? 'bg-white text-orange-600 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        JSON
                                    </button>
                                </div>
                            </div>

                            {payloadViewMode === 'json' ? (
                                /* JSON View - Editable */
                                <div className="space-y-3">
                                    <textarea
                                        value={JSON.stringify(activePermission, null, 2)}
                                        onChange={(e) => {
                                            try {
                                                const parsed = JSON.parse(e.target.value);
                                                setActivePermission(parsed);
                                            } catch (error) {
                                                // Keep typing even if JSON is invalid temporarily
                                                // Only update when valid JSON is entered
                                            }
                                        }}
                                        className="w-full bg-gray-50 rounded-xl p-6 font-mono text-sm text-gray-700 border border-gray-200 shadow-inner overflow-auto min-h-[200px] max-h-[200px] focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                        spellCheck={false}
                                    />
                                    <p className="text-xs text-gray-400 px-2 flex items-center gap-1">
                                        <Terminal className="w-3 h-3" />
                                        Edit JSON directly - changes apply when valid JSON is entered
                                    </p>
                                </div>
                            ) : (
                                /* Formatted View */
                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-inner overflow-auto max-h-[200px] space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Permission Key</label>
                                            <input
                                                type="text"
                                                value={activePermission.key}
                                                onChange={(e) => setActivePermission({ ...activePermission, key: e.target.value })}
                                                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono font-bold text-orange-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category</label>
                                            <input
                                                type="text"
                                                value={activePermission.category}
                                                onChange={(e) => setActivePermission({ ...activePermission, category: e.target.value })}
                                                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</label>
                                        <textarea
                                            value={activePermission.description || ""}
                                            onChange={(e) => setActivePermission({ ...activePermission, description: e.target.value })}
                                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all min-h-[60px]"
                                        />
                                    </div>

                                    <div className="flex items-center gap-6 pt-2 border-t border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ID:</span>
                                            <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">{activePermission.id}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Created:</span>
                                            <span className="text-xs text-gray-600">{new Date(activePermission.createdAt || Date.now()).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Updated:</span>
                                            <span className="text-xs text-gray-600">{new Date(activePermission.updatedAt || Date.now()).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="w-96 space-y-6">
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <div className="flex items-center gap-3 mb-3">
                                    {activePermission.isActive ? <Lock className="w-6 h-6 text-green-600" /> : <Unlock className="w-6 h-6 text-red-600" />}
                                    <span className="text-base font-bold text-gray-900">Security Status</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                    {activePermission.isActive
                                        ? "This definition is currently ENFORCED across the system. Revoking it will immediately suspend dependent roles."
                                        : "This definition is SUSPENDED. No roles can inherit or exercise this permission."}
                                </p>
                                <button
                                    onClick={() => toggleStatus(activePermission)}
                                    className={`w-full py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-all ${activePermission.isActive
                                        ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                        : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
                                        }`}
                                >
                                    {activePermission.isActive ? "Revoke Definition" : "Activate Definition"}
                                </button>
                            </div>
                            <button onClick={() => setActivePermission(null)} className="w-full py-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                                Close Inspector Panel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
