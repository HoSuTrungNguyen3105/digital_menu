import React, { useState, ChangeEvent } from 'react';
import { LoginDto, RegisterDto } from '@/types';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import { useAuth } from '@/context/AuthContext';

interface RestaurantAuthProps {
  close: () => void;
}

const AuthForm: React.FC<RestaurantAuthProps> = ({ close }) => {
  const [isRegister, setIsRegister] = useState(true);

  const [formData, setFormData] = useState<LoginDto | RegisterDto>({
    email: '',
    password: '',
  });

  const { login, register } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(formData as RegisterDto);
        setIsRegister(false);
      } else {
        await login(formData as LoginDto);
        close();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex m-3 sm:m-0 flex-col items-center justify-center min-vh-100 py-4 bg-gray-50">
      <form onSubmit={onSubmit} className="p-8 rounded-lg shadow-lg bg-white max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {isRegister ? 'Restaurant Sign Up' : 'Restaurant Login'}
        </h2>

        {isRegister ? (
          <SignUpForm formData={formData as RegisterDto} handleChange={handleChange} />
        ) : (
          <LoginForm formData={formData as LoginDto} handleChange={handleChange} />
        )}

        <button
          type="submit"
          className="block w-full px-4 py-2 mt-6 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-500"
        >
          {isRegister ? 'Create Account' : 'Login'}
        </button>

        <div className="mt-6 text-center text-sm space-y-2">
          <p
            onClick={() => setIsRegister(!isRegister)}
            className="text-green-600 cursor-pointer hover:underline font-medium"
          >
            {isRegister ? 'Already a restaurant? Login' : 'New Restaurant? Signup'}
          </p>

          <p
            onClick={close}
            className="text-gray-500 cursor-pointer hover:underline"
          >
            Back to User Registration
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
