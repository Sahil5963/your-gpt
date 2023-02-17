'use client';

import AppNavbar from 'app/components/AppNavbar';
import React, { createContext, useContext } from 'react';
import { AppContext } from './AppContext';

export default function AppLayout(p: { children: React.ReactNode } & any) {
  return (
    <AppContext.Provider
      value={{
        appId: p?.params?.appId,
      }}
    >
      <AppNavbar />
      <div>{p.children}</div>
    </AppContext.Provider>
  );
}
