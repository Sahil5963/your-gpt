'use client';

import { useApp } from 'app/(pages)/(dashboard)/apps/[appId]/AppContext';
import { THEME } from 'constants/ui';
import Link from 'next/link';
import {
  usePathname,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegments,
} from 'next/navigation';
import React from 'react';
import AppLink from './AppLink';

const LINKS = [
  {
    id: 1,
    link: null,
    label: 'Dashboard',
  },
  {
    id: 2,
    link: 'playground',
    label: 'Playground',
  },
  {
    id: 3,
    link: 'files',
    label: 'Files',
  },
  {
    id: 4,
    link: 'fine-tunes',
    label: 'Fine tunes',
  },
  {
    id: 5,
    link: 'setting',
    label: 'Settings',
  },
];

export default function AppNavbar() {
  return (
    <div
      style={{ height: THEME.appNavbarHeight }}
      className="sticky top-0 z-20 flex bg-blue-800 px-8"
    >
      <div className="flex flex-1 items-center">
        <Link href={'/apps'} className="font-bold text-white no-underline ">
          <img src="/images/svg/logo-white.svg" className="h-6" />
        </Link>

        <div className=" flex flex-1 items-center justify-center">
          <div className=" flex items-center gap-1">
            {LINKS.map((i) => {
              return (
                <AppLink
                  href={i.link}
                  className=" no-underline transition-all hover:text-white"
                  key={i.id}
                >
                  {i.label}
                </AppLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
