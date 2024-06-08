'use client'
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

interface AuthContextProps {
  authToken: string | null;
  username: string | null;
  refreshToken: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

interface DecodedToken {
  exp: number;
  username: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
      setUsername(decodedToken.username);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        refreshToken();
      }
    } else if (pathname !== '/login') {
      router.push('/login');
    }
  }, [router, pathname]);

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post(
        'https://dummyjson.com/auth/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const { token } = res.data;
      setAuthToken(token);
      const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
      setUsername(decodedToken.username);
      console.log('Login successful:', decodedToken.username);
      localStorage.setItem('authToken', token);
      router.push('/posts');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post(
        'https://dummyjson.com/auth/refresh',
        { refreshToken: 'your_refresh_token_here' },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const { token } = res.data;
      setAuthToken(token);
      const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
      setUsername(decodedToken.username);
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      setAuthToken(null);
      setUsername(null);
      localStorage.removeItem('authToken');
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, username, login, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
