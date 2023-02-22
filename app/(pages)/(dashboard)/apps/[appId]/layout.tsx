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
      <div className=" flex min-h-screen flex-col">
        <AppNavbar />
        <div className="flex-1">{p.children}</div>
      </div>
    </AppContext.Provider>
  );
}
