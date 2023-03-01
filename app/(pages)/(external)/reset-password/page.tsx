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
import { resetPasswordApi } from 'network/api/app';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { log, logErr } from 'utils/helpers';
import { EXTERNAL_THEME } from 'utils/ui';

export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({ rePassword: '' });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setErrors({ rePassword: '' });

    const formElements = e.currentTarget.elements;
    const data = {
      password: formElements.password.value,
      rePassword: formElements.rePassword.value,
    };

    if (data.password !== data.rePassword) {
      setErrors({
        rePassword: 'Password not matched',
      });
      return;
    }

    try {
      setLoading(true);
      const res = await resetPasswordApi({
        password: data?.password,
        hash: '',
      });
      log('res', res);

      if (res?.type === 'RXSUCCESS') {
        router.push('/login');
      } else if (res?.type === 'RXERROR') {
        setError(res?.message);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Something went wrong!');
      logErr('err', err);
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
            Create new password
          </Typography>
          <Typography
            sx={{
              mb: 2,
              color: 'text.secondary',
            }}
          >
            Enter a new password below to reset the password
            {/* Your new password should be different from the previous one */}
          </Typography>
        </div>

        <form className="mt-4 flex flex-col gap-3" onSubmit={onSubmit}>
          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="•••••••"
              type={showPassword ? 'text' : 'password'}
              name="password"
              endDecorator={
                <div className="flex cursor-pointer items-center">
                  {showPassword ? (
                    <AiFillEye onClick={() => setShowPassword(false)} />
                  ) : (
                    <AiFillEyeInvisible onClick={() => setShowPassword(true)} />
                  )}
                </div>
              }
            />
          </FormControl>

          <FormControl required error={errors.rePassword ? true : false}>
            <FormLabel>Re-type Password</FormLabel>
            <Input placeholder="•••••••" type="password" name="rePassword" />
            {errors?.rePassword && (
              <FormHelperText>Password not matched</FormHelperText>
            )}
          </FormControl>

          {error ? (
            <div className="text-start text-red-400">{error}</div>
          ) : (
            <></>
          )}

          <Button type="submit" fullWidth loading={loading}>
            Reset Password
          </Button>
        </form>
      </div>
    </Sheet>
  );
}
