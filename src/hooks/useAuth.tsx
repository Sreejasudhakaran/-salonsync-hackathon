import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('salonsync_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('salonsync_user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock user data
    const mockUser: User = {
      id: 'user-1',
      name: email === 'staff@salon.com' ? 'Sarah Johnson' : 'Alex Chen',
      email,
      phone: '+1 (555) 123-4567',
      avatar: `https://images.pexels.com/photos/${email === 'staff@salon.com' ? '774909' : '1239291'}/pexels-photo-${email === 'staff@salon.com' ? '774909' : '1239291'}.jpeg?auto=compress&cs=tinysrgb&w=150`,
      role: email === 'staff@salon.com' ? 'staff' : 'customer',
      preferences: {
        notifications: true,
        favoriteServices: ['Haircut', 'Styling'],
        preferredSalon: 'Downtown Salon'
      },
      stats: {
        totalVisits: 12,
        totalSpent: 420,
        averageWaitTime: 15,
        favoriteService: 'Haircut'
      },
      joinedAt: new Date('2023-06-15')
    };

    localStorage.setItem('salonsync_user', JSON.stringify(mockUser));
    
    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'customer',
      preferences: {
        notifications: true,
        favoriteServices: [],
      },
      stats: {
        totalVisits: 0,
        totalSpent: 0,
        averageWaitTime: 0,
        favoriteService: ''
      },
      joinedAt: new Date()
    };

    localStorage.setItem('salonsync_user', JSON.stringify(newUser));
    
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false
    });
  };

  const logout = () => {
    localStorage.removeItem('salonsync_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!authState.user) return;
    
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { ...authState.user, ...updates };
    localStorage.setItem('salonsync_user', JSON.stringify(updatedUser));
    
    setAuthState({
      user: updatedUser,
      isAuthenticated: true,
      isLoading: false
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      signup,
      logout,
      updateProfile
    }}>
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