import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  completedSeminars: number[];
  interests: string[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserProgress: (seminarId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock authentication
    if (email === 'user@example.com' && password === 'password') {
      setUser({
        id: 1,
        email: 'user@example.com',
        completedSeminars: [],
        interests: ['Fundamentals', 'Application Security'],
        skillLevel: 'Intermediate'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProgress = (seminarId: number) => {
    if (user) {
      setUser({
        ...user,
        completedSeminars: [...user.completedSeminars, seminarId]
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateUserProgress }}>
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