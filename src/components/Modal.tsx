import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  type = "bottom",
}) {
  if (!isOpen) return null;

  const isBottom = type === "bottom";

  const variants = isBottom
    ? {
        initial: { y: "100%", opacity: 1 },
        animate: { y: "0%", opacity: 1 },
        exit: { y: "100%", opacity: 1 },
      }
    : {
        initial: { scale: 0.9, opacity: 0, y: "0%", x: "0%" },
        animate: { scale: 1, opacity: 1, y: "0%", x: "0%" },
        exit: { scale: 0.9, opacity: 0, y: "0%", x: "0%" },
      };

  const modalClasses = isBottom
    ? "fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90vh]"
    : "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-lg bg-white rounded-3xl max-h-[85vh]";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60]"
          />

          {/* Modal Content */}
          <motion.div
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={
              isBottom
                ? { type: "spring", damping: 25, stiffness: 300 }
                : { duration: 0.2 }
            }
            className={`${modalClasses} z-[70] flex flex-col shadow-2xl overflow-hidden`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
