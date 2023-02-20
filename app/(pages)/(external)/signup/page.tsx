'use client';
import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Sheet,
  Typography,
} from '@mui/joy';
import { signupApi } from 'network/api/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const [errors, setErrors] = useState<any>({
    rePassword: '',
  });

  const onSubmit = async (event: any) => {
    setError('');
    setErrors({});
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const data = {
      name: formElements.name.value,
      email: formElements.email.value,
      password: formElements.password.value,
      rePassword: formElements.rePassword.value,
      organisation: formElements.organisation.value,
    };

    if (data.password !== data.rePassword) {
      setErrors({
        rePassword: 'Password not matched',
      });
      return;
    }

    try {
      // const res = await signupApi({});
    } catch (err) {
      console.log('Err');
    }
  };

  return (
    <Sheet className="flex min-h-screen w-full items-center justify-center">
      <div>
        <Typography fontWeight="xl" level="h4">
          Singup
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
            <FormLabel>Name</FormLabel>
            <Input placeholder="Enter your name" type="text" name="name" />
          </FormControl>
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Enter your email" type="email" name="email" />
          </FormControl>
          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input placeholder="•••••••" type="password" name="password" />
          </FormControl>
          <FormControl required error={errors.rePassword ? true : false}>
            <FormLabel>Re-type Password</FormLabel>
            <Input placeholder="•••••••" type="password" name="rePassword" />
            {errors?.rePassword && (
              <FormHelperText>Password not matched</FormHelperText>
            )}
          </FormControl>

          <FormControl required>
            <FormLabel>Organisation</FormLabel>
            <Input
              placeholder="Organisation"
              type="text"
              name="organisation"
              defaultValue={'Default'}
            />
          </FormControl>

          <Button type="submit" fullWidth loading={loading}>
            Create account
          </Button>
        </form>

        <div className="flex justify-center py-4">
          <Typography fontWeight={'md'}>
            Already have an account ? <Link href="/login">Login</Link>
          </Typography>
        </div>
      </div>
    </Sheet>
  );
}
