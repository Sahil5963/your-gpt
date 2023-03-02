'use client';

import { Divider, Typography } from '@mui/joy';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { tv } from 'tailwind-variants';

const linkT = tv({
  base: 'p-3 hover:bg-gray-200 no-underline text-gray-500 rounded-md ',
  variants: {
    type: {
      active: 'bg-gray-200 text-black',
      base: '',
    },
  },
});

export default function ConsoleSettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="">
      <div className="mb-4 flex items-center gap-1 opacity-60">
        <BsFillGearFill />
        <Typography level="h6">Settings</Typography>
      </div>
      <Divider sx={{ mb: 2 }} />

      <div className="flex gap-6">
        <div className="flex flex-col gap-1">
          {[
            {
              label: 'Account',
              link: '/console/settings/account',
            },
            {
              label: 'Password & Security',
              link: '/console/settings/password-security',
            },
          ].map((i) => {
            return (
              <Link
                className={linkT({
                  type: i.link === pathname ? 'active' : 'base',
                })}
                href={i.link}
              >
                {i.label}
              </Link>
            );
          })}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
