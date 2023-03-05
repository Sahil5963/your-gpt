import { IconButton, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { IoArrowBack } from 'react-icons/io5';

export default function BackHeader({
  title,
  desc = '',
}: {
  title: string;
  desc?: string;
}) {
  const router = useRouter();

  return (
    <div className="mb-4 flex items-start gap-2">
      <IconButton
        color="neutral"
        variant="plain"
        onClick={() => {
          router.back();
        }}
      >
        <HiArrowLeft />
      </IconButton>

      <div>
        <Typography textColor={'neutral.800'} fontWeight={'lg'}>
          {title}
        </Typography>
        <Typography level="body2" textColor={'neutral.400'}>
          {desc}
        </Typography>
      </div>
    </div>
  );
}
