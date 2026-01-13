import React, { ChangeEvent } from 'react';
import InputField from './InputField';

interface LoginFormProps {
    formData: { email: string; password: string };
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ formData, handleChange }) => (
    <>
        <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
        <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
    </>
);

export default LoginForm;
