'use client';

import React, { createContext, useContext, useState } from 'react';

type AuthContextTypeD = {
  token: string;
  user: any;
  onLoginSuccess: (d: { data: object; persist: boolean }) => any;
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
    data: Object;
  }) => {};

  return (
    <AuthContext.Provider
      value={{
        token,
        user: {},
        onLoginSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
