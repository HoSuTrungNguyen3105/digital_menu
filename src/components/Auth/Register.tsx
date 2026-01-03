import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface RestaurantAuthProps {
    close: () => void;
}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const Register: React.FC<RestaurantAuthProps> = ({
    close
}) => {
  const [isSignup, setIsSignup] = useState(true); 
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  
  const backendUrl = ""; //import.meta.env.VITE_BACKEND_URL || 
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = isSignup ? "restaurant/signup" : "restaurant/login";

    try {
      // In a real app, you might use FormData if you have files, 
      // but here we are sending JSON for simplicity based on the fields.
      const payload = isSignup ? {        
        password: formData.password,
        email: formData.email,
        name: formData.name,
        phone: formData.phone
      } : {
        email: formData.email,
        password: formData.password
      };

      const response = await axios.post(`${backendUrl}/${endpoint}`, payload);
      
      if (response.data) {
          alert(isSignup ? "Registered successfully" : "Logged in successfully");
          if (!isSignup) close(); // Close on successful login
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Error occurred, please try again.");
    }
  };

  return (
    <div className="flex m-3 sm:m-0 flex-col items-center justify-center min-vh-100 py-4 bg-gray-50">
      <form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-lg bg-white max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {isSignup ? "Restaurant Sign Up" : "Restaurant Login"}
        </h2>

        {isSignup && (
          <>
            <InputField label="Restaurant Name" type="text" name="name" value={formData.name} onChange={handleChange} />
            <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
            <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
            <InputField label="Phone Number" type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </>
        )}

        {!isSignup && (
          <>
            <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
            <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
          </>
        )}

        <button type="submit" className="block w-full px-4 py-2 mt-6 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none transition duration-300 ease-in-out shadow-md">
          {isSignup ? "Create Account" : "Login"}
        </button>

        <div className="mt-6 text-center text-sm space-y-2">
          <p onClick={() => setIsSignup(!isSignup)} className="text-green-600 cursor-pointer hover:underline font-medium">
            {isSignup ? "Already a restaurant? Login" : "New Restaurant? Signup"}
          </p>
          <p onClick={() => close()} className="text-gray-500 cursor-pointer hover:underline">
            Back to User Registration
          </p>
        </div>
      </form>
    </div>
  );
};


const InputField = ({ label, type, name, value, onChange }: { label: string; type: string; name: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
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

export default Register;
