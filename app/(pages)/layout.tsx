'use client';
import 'styles/globals.css';
import React, { useEffect, useState } from 'react';

import { Public_Sans } from '@next/font/google';
import ClientProvider from '../ClientProvider';

// If loading a variable font, you don't need to specify the font weight

// const publicSans = Public_Sans({
//   display: 'swap',
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700', '800'],
//   variable: `--font-product-sans`,
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <html lang="en">
      <head>
        <title>YourGPT - Personalized ChatGPT for your business</title>
        {domLoaded && (
          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@100;200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        )}
      </head>
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
