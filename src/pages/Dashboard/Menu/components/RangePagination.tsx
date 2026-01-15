import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface RangePaginationProps {
    fromRecord: number;
    toRecord: number;
    totalItems: number;
    onRangeChange: (from: number, to: number, reset: boolean) => void;
    onPrevPage: () => void;
    onNextPage: () => void;
    className?: string;
}

const RangePagination: React.FC<RangePaginationProps> = ({
    fromRecord,
    toRecord,
    totalItems,
    onRangeChange,
    onPrevPage,
    onNextPage,
    className = '',
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempFrom, setTempFrom] = useState('');
    const [tempTo, setTempTo] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const justAppliedRef = useRef(false);

    const handleOpenEdit = () => {
        setTempFrom(fromRecord.toString());
        setTempTo(toRecord.toString());
        setIsEditing(true);
    };

    const handleApply = () => {
        if (justAppliedRef.current) return;
        justAppliedRef.current = true;

        // Prevent rapid double triggers
        setTimeout(() => {
            justAppliedRef.current = false;
        }, 300);

        // If both are empty, reset to default range
        if (!tempFrom && !tempTo) {
            onRangeChange(1, 10, true);
            setIsEditing(false);
            return;
        }

        const from = parseInt(tempFrom, 10) || 1;
        const to = parseInt(tempTo, 10) || 10;

        // Validate range
        const validFrom = Math.max(1, Math.min(from, totalItems || 1));
        const validTo = Math.min(totalItems || 10, Math.max(validFrom, to));

        if (typeof onRangeChange === 'function') {
            onRangeChange(validFrom, validTo, false);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleApply();
        if (e.key === 'Escape') setIsEditing(false);
    };

    // Auto-focus first input when entering edit mode
    useEffect(() => {
        if (isEditing) {
            const timer = setTimeout(() => {
                const firstInput = containerRef.current?.querySelector('input');
                firstInput?.focus();
                firstInput?.select();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isEditing]);

    // Handle clicks outside to apply or cancel
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                if (tempFrom || tempTo) {
                    handleApply();
                } else {
                    setIsEditing(false);
                }
            }
        };

        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isEditing, tempFrom, tempTo]);

    return (
        <div className={`flex items-center gap-2 h-9 ${className}`}>
            {!isEditing ? (
                <button
                    onClick={handleOpenEdit}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-100 transition-all text-sm font-bold text-gray-700 group hover:ring-2 hover:ring-orange-500/10"
                    title={`Click to jump to range (Total ${totalItems} records)`}
                >
                    <span className="text-gray-900">
                        {fromRecord}-{toRecord}
                    </span>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-400 group-hover:text-gray-600">
                        {totalItems}
                    </span>
                </button>
            ) : (
                <div
                    ref={containerRef}
                    className="flex items-center gap-1.5 bg-white border border-orange-500 shadow-[0_2px_10px_-3px_rgba(249,115,22,0.2)] rounded-xl px-2 py-1 transition-all"
                >
                    <input
                        type="text"
                        value={tempFrom}
                        onChange={(e) => setTempFrom(e.target.value.replace(/[^0-9]/g, ''))}
                        onKeyDown={handleKeyDown}
                        className="w-12 h-6 text-center text-sm font-black text-gray-900 bg-gray-50 rounded-lg outline-none focus:bg-white transition-colors"
                        placeholder="1"
                    />
                    <span className="text-gray-300 font-black">-</span>
                    <input
                        type="text"
                        value={tempTo}
                        onChange={(e) => setTempTo(e.target.value.replace(/[^0-9]/g, ''))}
                        onKeyDown={handleKeyDown}
                        className="w-12 h-6 text-center text-sm font-black text-gray-900 bg-gray-50 rounded-lg outline-none focus:bg-white transition-colors"
                        placeholder="10"
                    />
                    <div className="flex items-center gap-1 ml-1 pl-1 border-l border-gray-100">
                        <span className="text-[10px] text-gray-400 font-black">/ {totalItems}</span>
                        <button
                            onClick={handleApply}
                            className="p-1 hover:bg-orange-50 text-orange-600 rounded-md transition-colors"
                        >
                            <Check className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-1 ml-1">
                <button
                    onClick={onPrevPage}
                    disabled={fromRecord <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 text-gray-400 hover:text-orange-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-gray-100 transition-all active:scale-90"
                    aria-label="Previous range"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={onNextPage}
                    disabled={toRecord >= totalItems}
                    className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 text-gray-400 hover:text-orange-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-gray-100 transition-all active:scale-90"
                    aria-label="Next range"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default RangePagination;
