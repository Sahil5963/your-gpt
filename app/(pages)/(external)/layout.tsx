/* eslint-disable @next/next/no-head-element */
'use client';
import styled from '@emotion/styled';
import Navbar from 'app/components/Navbar';
import { externalAppContent } from 'app/components/variants';
import { EXTERNAL_THEME } from 'utils/ui';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <MainContent id="mainContent">{children}</MainContent>
      <div className="bgDrop fixed top-0 left-0 right-0 z-20 h-screen w-full bg-black/50"></div>
    </>
  );
}

const MainContent = styled.main`
  transition: all 0.4s;
  /* transform: translateX(0); */
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
