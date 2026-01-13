import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginDto, RegisterDto } from '@/types';
import { getMyProfile, loginStaff, logoutStaff, registerStaff } from '@/api/auth.api';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    user: User | null;
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
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const { data } = await getMyProfile();
                if (data.success) {
                    setUser(data.data);
                    // Update local storage user just in case
                    localStorage.setItem('user', JSON.stringify(data.data));
                }
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (data: LoginDto) => {
        try {
            setLoading(true);
            const response = await loginStaff(data);
            if (response.data.success && response.data.data) {
                const { accessToken, user } = response.data.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                alert('Logged in successfully');
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
            setUser(null);
            navigate('/register');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user, checkAuth }}>
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
