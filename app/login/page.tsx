'use client';

import { Button, Input, Text } from '@nextui-org/react';
import React from 'react';

export default function Login() {
  return (
    <div className=" flex h-screen w-full items-center justify-center">
      <div className="">
        <div className="mb-6">
          <Text h3 weight="bold">
            Welcome back
          </Text>
          <Text size="lg">Let's get started! Please enter your details.</Text>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            bordered
            label="Email"
            placeholder="Enter your email"
            size="lg"
            color="primary"
            required
          />
          <Input
            bordered
            type="password"
            label="Password"
            placeholder="Enter your email"
            color="primary"
            size="lg"
            required
          />

          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
