import { useState } from "react";

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="bg-gray-50 rounded-2xl p-6 hover:bg-orange-50 transition-colors cursor-pointer border border-transparent hover:border-orange-100"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-gray-900">{question}</h3>
        <span
          className={`text-gray-400 transition-transform ${
            isOpen ? "rotate-180 text-orange-500" : ""
          }`}
        >
          ▼
        </span>
      </div>
      {isOpen && (
        <p className="mt-3 text-gray-600 leading-relaxed text-sm animate-fade-in">
          {answer}
        </p>
      )}
    </div>
  );
}

export default FAQItem;
