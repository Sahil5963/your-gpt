'use client';

import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import React from 'react';

// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: 'light',
  theme: {},
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {},
});

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      defaultTheme="dark"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>{children}</NextUIProvider>
    </NextThemesProvider>
  );
}

// 3. Wrap NextUIProvider with NextThemesProvider
// _app.jsx // _app.tsx

// import { NextUIProvider } from '@nextui-org/react';
// import React from 'react';
// // import { CssVarsProvider } from '@mui/joy';

// export default function ClientProviders({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     // <CssVarsProvider defaultMode="dark" modeStorageKey="joyTheme">
//     <NextUIProvider   >{children}</NextUIProvider>
//     // </CssVarsProvider>
//   );
// }
