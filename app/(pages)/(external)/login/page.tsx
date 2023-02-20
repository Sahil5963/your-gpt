'use client';
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Sheet,
  Typography,
} from '@mui/joy';
import SocialLoginBtns from 'app/components/SocialLoginBtn';
import { loginApi } from 'network/api/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const data = {
      email: formElements.email.value,
      password: formElements.password.value,
      persistent: formElements.persistent.checked,
    };

    console.log('DATA', data);

    try {
      // const res = await loginApi({});
    } catch (err) {
      console.log('Err', err);
    }
  };

  return (
    <Sheet className="flex min-h-screen w-full items-center justify-center">
      <div>
        <Typography fontWeight="xl" level="h4">
          Welcome back
        </Typography>
        <Typography
          sx={{
            mb: 2,
            color: 'text.secondary',
          }}
        >
          Let's get started! Please enter your details.
        </Typography>

        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Enter your email" type="email" name="email" />
          </FormControl>
          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input placeholder="•••••••" type="password" name="password" />
          </FormControl>
          <Sheet
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Checkbox
              size="sm"
              label="Remember for 30 days"
              name="persistent"
              defaultChecked
            />

            <Link href="#replace-with-a-link" className="text-sm">
              Forgot password?
            </Link>
          </Sheet>
          <Button type="submit" fullWidth loading={loading}>
            Sign in
          </Button>
        </form>

        <div className="py-2 text-center">
          <Typography level="body2" fontWeight={'md'}>
            Or
          </Typography>
        </div>

        <div className="">
          <SocialLoginBtns />
        </div>

        <div className="flex justify-center py-4">
          <Typography fontWeight={'md'}>
            Don't have an account ?{' '}
            <Link href="/signup">Signup with email</Link>
          </Typography>
        </div>
      </div>
    </Sheet>
  );
}
