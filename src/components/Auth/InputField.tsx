import React, { ChangeEvent } from 'react';

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required
            className="block w-full px-4 py-2 bg-gray-100 border border-transparent rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
    </div>
);

export default InputField;
