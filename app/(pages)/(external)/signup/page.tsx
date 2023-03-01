'use client';
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Sheet,
  Typography,
} from '@mui/joy';
import { useAuth } from 'context/AuthContext';
import { signupApi } from 'network/api/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { onLoginSuccess } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
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

    setLoading(true);
    try {
      const res = await signupApi({
        email: data.email,
        name: data.name,
        organization: data.organisation,
        password: data.password,
      });
      setLoading(false);

      if (res.type === 'RXERROR') {
        setError(res.message);
      }

      if (res.type === 'RXSUCCESS') {
        onLoginSuccess({ data: res.data, persist: true });
        router.push('/console/projects');
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong try again');
      console.log('Err', err);
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

          {/* <FormControl required error={errors.rePassword ? true : false}>
            <FormLabel>Re-type Password</FormLabel>
            <Input placeholder="•••••••" type="password" name="rePassword" />
            {errors?.rePassword && (
              <FormHelperText>Password not matched</FormHelperText>
            )}
          </FormControl> */}

          <FormControl required>
            <FormLabel>Organisation</FormLabel>
            <Input
              placeholder="Organisation"
              type="text"
              name="organisation"
              defaultValue={'Default'}
            />
          </FormControl>

          {error && (
            <Alert color="danger" variant="soft">
              {error}
            </Alert>
          )}

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
