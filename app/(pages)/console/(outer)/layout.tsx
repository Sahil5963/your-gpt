'use client';

import { Button, Menu, MenuItem, Sheet, Typography } from '@mui/joy';
import clsx from 'clsx';
import { useAuth } from 'context/AuthContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { HiUserCircle } from 'react-icons/hi';
import { IoLogOut } from 'react-icons/io5';
import { RiUser6Fill } from 'react-icons/ri';

const LINKS = [
  {
    id: 1,
    link: '/console/projects',
    label: 'Projects',
  },
  {
    id: 2,
    link: '/console/organisations',
    label: 'Organisations',
  },
];

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const router = useRouter();

  const { logout } = useAuth();

  return (
    <Sheet className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-10 flex  h-[56px] items-center justify-between bg-white px-4 shadow-sm ">
        <Link href={'/console/projects'}>
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

        <div
          className="flex cursor-pointer items-center gap-2 rounded-lg  py-2 px-2 hover:bg-gray-200 focus:bg-gray-200"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <HiUserCircle size={24} />

          <Typography>Profile</Typography>

          <FiChevronDown />
        </div>

        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          aria-labelledby="profile-menu"
          placement="bottom-end"
          sx={{ minWidth: 200 }}
        >
          <MenuItem
            component={Link}
            href={'/console/settings/account'}
            onClick={() => {}}
          >
            Settings
          </MenuItem>
          <MenuItem
            color="danger"
            onClick={() => {
              logout();
              router.push('/');
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>

      <div className="pb-8">
        <div className="mx-auto mt-8 max-w-3xl rounded-lg bg-white  px-4 py-4 shadow-md">
          {children}
        </div>
      </div>
    </Sheet>
  );
}
