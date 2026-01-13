import React, { ChangeEvent } from 'react';
import InputField from './InputField';

interface RegisterFormProps {
    formData: { name: string; email: string; password: string; phone: string };
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ formData, handleChange }) => (
    <>
        <InputField label="Restaurant Name" type="text" name="name" value={formData.name} onChange={handleChange} />
        <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
        <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
        <InputField label="Phone Number" type="text" name="phone" value={formData.phone} onChange={handleChange} />
    </>
);

export default RegisterForm;
