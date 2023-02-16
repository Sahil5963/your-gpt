'use client';

import { Sheet } from '@mui/joy';
import Navbar from 'app/components/Navbar';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Sheet className="min-h-screen">
      <Navbar />
      <div>{children}</div>
    </Sheet>
  );
}
