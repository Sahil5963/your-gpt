'use client';

import { useApp } from 'context/AppContext';
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
import { Button } from '@mui/joy';
import { RiArrowGoBackLine } from 'react-icons/ri';

const LINKS = [
  {
    id: 1,
    link: null,
    label: 'Dashboard',
  },
  {
    id: 2,
    link: '',
    label: 'Train',
  },
  {
    id: 3,
    link: '',
    label: 'Integration',
  },

  {
    id: 6,
    link: 'setting',
    label: 'Settings',
  },
];
const LINKS2 = [
  {
    id: 1,
    link: 'playground',
    label: 'Playground',
  },
  {
    id: 2,
    link: 'files',
    label: 'Files',
  },
  {
    id: 3,
    link: 'fine-tunes',
    label: 'Fine Tune',
  },
];

export default function AppNavbar() {
  return (
    <div className="sticky top-0 z-20">
      <div
        className=" flex bg-blue-800 px-8"
        style={{ height: THEME.appNavbarHeight }}
      >
        <div className="flex flex-1 items-center">
          <Link
            href={'/console/projects'}
            className="absolute flex items-center gap-2 rounded-lg bg-black/20 p-3 text-white/60 no-underline transition-all hover:bg-black/30 hover:text-white"
          >
            <RiArrowGoBackLine />
            <div>Go to console</div>
          </Link>

          <div className=" flex flex-1 items-center justify-center">
            <div className=" flex items-center gap-1">
              {LINKS.map((i) => {
                return (
                  <AppLink
                    href={i.link}
                    className=" text-blue-300 no-underline transition-all hover:text-white"
                    key={i.id}
                    activeClassName="bg-blue-700  text-white"
                  >
                    {i.label}
                  </AppLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ height: THEME.appNavbar2Height }}
        className="flex items-center shadow-sm"
      >
        <div className=" flex flex-1 items-center justify-center">
          <div className=" flex items-center gap-1">
            {LINKS2.map((i) => {
              return (
                <AppLink
                  href={i.link}
                  className="no-underline transition-all hover:text-black"
                  activeClassName="text-black"
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
