'use client';
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Link,
  Sheet,
  Typography,
} from '@mui/joy';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Login() {
  const router = useRouter();

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

        <form
          className="flex flex-col gap-4"
          onSubmit={(event: any) => {
            event.preventDefault();
            const formElements = event.currentTarget.elements;
            const data = {
              email: formElements.email.value,
              password: formElements.password.value,
              persistent: formElements.persistent.checked,
            };

            router.push('/dashboard/home');

            // alert(JSON.stringify(data, null, 2));
          }}
        >
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
            />
            <Link fontSize="sm" href="#replace-with-a-link" fontWeight="lg">
              Forgot password
            </Link>
          </Sheet>
          <Button type="submit" fullWidth>
            Sign in
          </Button>
        </form>
      </div>
    </Sheet>
  );
}
