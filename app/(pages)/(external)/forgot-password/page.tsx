'use client';

import {
  Button,
  FormControl,
  FormLabel,
  Sheet,
  Typography,
  Input,
  FormHelperText,
} from '@mui/joy';
import { sendResetEmailApi } from 'network/api/app';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { EXTERNAL_THEME } from 'utils/ui';

export default function page() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      const res = await sendResetEmailApi({ email });
      console.log('res', res);

      if (res?.type === 'RXSUCCESS') {
        setSuccess('Sent! Please check your email.');
      } else if (res?.type === 'RXERROR') {
        setError(res?.message);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Something went wrong!');
      console.log('err', err);
    }
  };

  return (
    <Sheet
      className="flex w-full items-center justify-center"
      style={{ minHeight: `calc(100vh - ${EXTERNAL_THEME.navBarHeight}px)` }}
    >
      <div className="px-5 text-center">
        <div className="mb-2 flex flex-col gap-2">
          <Typography fontWeight="xl" level="h3">
            Forgot Password?
          </Typography>
          <Typography
            sx={{
              mb: 2,
              color: 'text.secondary',
            }}
          >
            Fear not, we'll email you instructions to reset your password
          </Typography>
        </div>

        <form className="mt-4 flex flex-col gap-3" onSubmit={onSubmit}>
          <FormControl
            required
            color={success ? 'success' : 'neutral'}
            error={error ? true : false}
          >
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText>{error}</FormHelperText>
            <FormHelperText>{success}</FormHelperText>
          </FormControl>

          <Button type="submit" fullWidth loading={loading}>
            Send Email
          </Button>
        </form>

        <div className="mt-10">
          <Typography fontWeight={'md'}>
            <Link href="/login">Back to login</Link>
          </Typography>
        </div>
      </div>
    </Sheet>
  );
}
