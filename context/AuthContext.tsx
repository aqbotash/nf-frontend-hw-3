'use client'
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios';

interface AuthContextProps {
  authToken: string | null;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    } else if (pathname !== '/login') {
      router.push('/login');
    }
  }, [router]);

  const login = async (username: string, password: string) => {
    try {
      axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        
      .then(res => {
        const { token } = res.data;
        setAuthToken(token);
        localStorage.setItem('authToken', token);
        router.push('/');
        console.log(res.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, login }}>
      {children}
    </AuthContext.Provider>
  );
};
