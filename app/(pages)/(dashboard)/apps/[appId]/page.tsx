'use client';

import { Typography } from '@mui/joy';
import { appContent } from 'app/components/variants/app';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const statS =
  'flex-1  rounded-lg bg-gray-100 p-6 cursor-pointer transition-all no-underline hover:shadow-sm';
export default function AppDashboard() {
  const pathname = usePathname();

  return (
    <div>
      <div className={appContent()}>
        <div className="flex gap-4">
          <Link href={pathname + '/' + 'fine-tunes'} className={statS}>
            <Typography
              textColor={'neutral.600'}
              sx={{ textTransform: 'uppercase', mb: 2 }}
              fontWeight="lg"
            >
              Total Fine-tunes
            </Typography>

            <Typography level="h3">12</Typography>
          </Link>
          <Link href={pathname + '/' + 'files'} className={statS}>
            <Typography
              textColor={'neutral.600'}
              sx={{ textTransform: 'uppercase', mb: 2 }}
              fontWeight="lg"
            >
              Total Files
            </Typography>

            <Typography level="h3">4</Typography>
          </Link>
        </div>
      </div>
    </div>
  );
}
