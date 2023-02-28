/* eslint-disable @next/next/no-head-element */

import Navbar from 'app/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="">
        <Navbar />

        <main className="">{children}</main>
      </div>
    </>
  );
}
