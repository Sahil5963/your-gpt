'use client';

import AppNavbar from 'app/components/AppNavbar';
import { AppContext } from 'context/AppContext';
import React, { createContext, useContext } from 'react';

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
