'use client';

import 'styles/globals.css';
import styled from '@emotion/styled';
import ClientProvider from 'app/ClientProvider';
import Navbar from 'app/components/Navbar';
import { useEffect, useState } from 'react';
import { EXTERNAL_THEME } from 'utils/ui';

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
    <>
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
          <ClientProvider>
            <Navbar />
            <MainContent id="mainContent">{children}</MainContent>
            <div className="bgDrop fixed top-0 left-0 right-0 z-20 h-screen w-full bg-black/50"></div>
          </ClientProvider>
        </body>
      </html>
    </>
  );
}

const MainContent = styled.main`
  transition: all 0.4s;
  &.main-offset {
    transform: translateX(calc(100vw - ${EXTERNAL_THEME.navBarHeight}px));
    transition: all 0.4s;

    & + .bgDrop {
      display: block;
    }
  }

  & + .bgDrop {
    display: none;
    backdrop-filter: blur(3px);
  }
`;
