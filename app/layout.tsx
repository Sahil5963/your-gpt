'use client';
import 'styles/globals.css';
import React from 'react';

import { Public_Sans } from '@next/font/google';
import ClientProvider from './ClientProvider';

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
        <title>YourGPT - Personalized ChatGPT for your business</title>
      </head>
      <body className="">
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
