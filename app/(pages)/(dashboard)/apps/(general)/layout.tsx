'use client';

import { Button, Sheet } from '@mui/joy';
import Link from 'next/link';
import React from 'react';
import { IoLogOut } from 'react-icons/io5';

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sheet className="min-h-screen">
      <div className="flex h-[56px] items-center justify-between  bg-gray-100 px-4">
        <Link href={'/apps'}>
          <img src="/images/svg/logo.svg" style={{ height: 32 }} />
        </Link>

        <div>
          <Button color="neutral" variant="plain" startDecorator={<IoLogOut />}>
            Logout
          </Button>
        </div>
      </div>

      <div>{children}</div>
    </Sheet>
  );
}
