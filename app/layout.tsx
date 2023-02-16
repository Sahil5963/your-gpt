'use client';
import 'styles/globals.css';
import React from 'react';

import { Public_Sans } from '@next/font/google';
import { CssVarsProvider } from '@mui/joy';
import { getInitColorSchemeScript } from '@mui/joy/styles';

// If loading a variable font, you don't need to specify the font weight
const publicSans = Public_Sans({
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '500', '800', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={publicSans.className}>
      <head>
        <title>Next.js Turbopack App Directory Playground</title>
      </head>
      <body className="">
        <CssVarsProvider defaultMode="dark" modeStorageKey="joyTheme">
          {children}
        </CssVarsProvider>
      </body>
    </html>
  );
}
