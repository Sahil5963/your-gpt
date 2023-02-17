'use client';
import { CssVarsProvider } from '@mui/joy';
import React from 'react';

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CssVarsProvider defaultMode="light" modeStorageKey="joyTheme">
      {children}
    </CssVarsProvider>
  );
}
