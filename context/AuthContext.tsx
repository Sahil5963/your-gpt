'use client';

import { STORAGE_KEYS } from 'constants/app';
import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { LoginApiResD } from 'types/apiResponse';

type AuthContextTypeD = {
  token: string;
  user: any;
  onLoginSuccess: (d: { data: LoginApiResD; persist: boolean }) => any;
  logout: () => any;
};

const AuthContext = createContext<AuthContextTypeD>({} as AuthContextTypeD);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState('');

  const onLoginSuccess = ({
    data,
    persist = true,
  }: {
    persist: boolean;
    data: LoginApiResD;
  }) => {
    setToken(data.token);
    localStorage.setItem(STORAGE_KEYS.token, data.token);
  };

  const logout = async () => {
    setToken('');
    localStorage.removeItem(STORAGE_KEYS.token);
  };

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem(STORAGE_KEYS.token)) {
        setToken(localStorage.getItem(STORAGE_KEYS.token) || '');
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user: {},
        onLoginSuccess,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
