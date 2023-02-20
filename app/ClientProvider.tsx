'use client';
import { CssVarsProvider } from '@mui/joy';
import AuthProvider from 'context/AuthContext';
import React from 'react';

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <CssVarsProvider defaultMode="light" modeStorageKey="joyTheme">
        {children}
      </CssVarsProvider>
    </AuthProvider>
  );
}
