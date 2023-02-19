'use client';

import { Button, Sheet } from '@mui/joy';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { IoLogOut } from 'react-icons/io5';

const LINKS = [
  {
    id: 1,
    link: '/apps',
    label: 'Apps',
  },
  {
    id: 2,
    link: '/apps/organisations',
    label: 'Organisations',
  },
];

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <Sheet className="min-h-screen bg-gray-100">
      <div className="flex h-[56px] items-center justify-between  bg-white px-4 shadow-sm ">
        <Link href={'/apps'}>
          <img src="/images/svg/logo.svg" className="h-6" />
        </Link>

        <div className="flex self-stretch">
          {LINKS.map((i) => {
            return (
              <Link
                key={i.id}
                href={i.link}
                className={` flex items-center bg-transparent px-4  text-gray-500 no-underline ${clsx(
                  {
                    'bg-gray-200 text-gray-900': i.link === path,
                  },
                )} `}
              >
                {i.label}
              </Link>
            );
          })}
        </div>

        <div>
          <Button color="neutral" variant="plain" startDecorator={<IoLogOut />}>
            Logout
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-3xl rounded-lg bg-white  px-4 py-4 shadow-md">
        {children}
      </div>
    </Sheet>
  );
}