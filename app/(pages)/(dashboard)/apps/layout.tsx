'use client';

import { useAuth } from 'context/AuthContext';
import React from 'react';

export default function Apps({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  return <div>{children}</div>;
}
