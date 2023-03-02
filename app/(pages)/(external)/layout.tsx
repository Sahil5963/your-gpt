/* eslint-disable @next/next/no-head-element */

import Navbar from 'app/components/Navbar';
import { externalAppContent } from 'app/components/variants';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="">
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  );
}
