import { IconButton, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { IoArrowBack } from 'react-icons/io5';

export default function BackHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="mb-4 flex items-center gap-3">
      <IconButton
        color="neutral"
        variant="plain"
        onClick={() => {
          router.back();
        }}
      >
        <HiArrowLeft />
      </IconButton>

      <Typography textColor={'neutral.400'} fontWeight={'lg'}>
        {title}
      </Typography>
    </div>
  );
}
