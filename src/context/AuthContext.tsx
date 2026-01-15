import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginDto, RegisterDto } from '@/types';
import { getMyProfile, loginStaff, logoutStaff, registerStaff } from '@/api/auth.api';
import instance from '@/utils/axios';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    user: User | null;
    token: string | null;  // Added token
    loading: boolean;
    login: (data: LoginDto) => Promise<void>;
    register: (data: RegisterDto) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('accessToken')); // Added token state
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                setToken(token);
                // Optional: set default header as fallback
                instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await getMyProfile();
                const resData = response.data;
                const isSuccess = resData.success || resData.status || resData.code === 200;

                if (isSuccess && resData.data) {
                    setUser(resData.data);
                    // Update local storage user just in case
                    localStorage.setItem('user', JSON.stringify(resData.data));
                } else {
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                }
            } else {
                setUser(null);
                setToken(null);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            setUser(null);
            setToken(null);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     checkAuth();
    // }, []);

    const login = async (data: LoginDto) => {
        try {
            setLoading(true);
            const response = await loginStaff(data);
            const resData = response.data;

            // Handle both structure: { success, data } and { status, data }
            const isSuccess = resData.code === 200 || resData.status === true;

            if (isSuccess && resData.data) {
                const { accessToken, user } = resData.data;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('user', JSON.stringify(user));

                setUser(user);
                setToken(accessToken);

                alert(resData.msg || resData.message || 'Logged in successfully');
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: RegisterDto) => {
        try {
            setLoading(true);
            const response = await registerStaff(data);
            if (response.data.success) {
                alert('Registered successfully. Please login.');
                // Optionally auto-login or redirect to login
            }
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await logoutStaff();
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            delete instance.defaults.headers.common['Authorization'];
            setUser(null);
            setToken(null); // Clear token state
            navigate('/register');
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated: !!user, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
