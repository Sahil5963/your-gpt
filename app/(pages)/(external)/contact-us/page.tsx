'use client';

import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Textarea,
} from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { FiAlignRight, FiArrowRight } from 'react-icons/fi';
import { tv } from 'tailwind-variants';

const row = tv({
  base: 'flex gap-4 sm:flex-row flex-col',
});

export default function ContactUs() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
    } catch (err) {
      console.log('Err', err);
    }
  };

  const inputVariant = 'soft';

  return (
    <div className="mx-auto max-w-screen-md">
      <div className="py-12">
        <div className="header">
          <h4 className="mt-0 mb-6 text-2xl  font-semibold sm:mb-14 sm:text-3xl sm:font-normal">
            Love to hear from you,
            <br /> Get in touch 👋
          </h4>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className={row()}>
            <FormControl sx={{ flex: 1 }} required>
              <FormLabel>Your Name</FormLabel>
              <Input placeholder="Enter your name" />
            </FormControl>
            <FormControl sx={{ flex: 1 }} required>
              <FormLabel>Your Email</FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
          </div>
          <div className={row()}>
            <FormControl sx={{ flex: 1 }} required>
              <FormLabel>What you are interested in ?</FormLabel>

              <Select placeholder="Select...">
                <Option value={1}>Bisiness</Option>
                <Option value={2}>Study</Option>
                <Option value={3}>Research</Option>
              </Select>
            </FormControl>
            <FormControl sx={{ flex: 1 }} required>
              <FormLabel>Project Budget</FormLabel>
              <Select placeholder="Select your project budget">
                <Option value={1}>Bisiness</Option>
                <Option value={2}>Study</Option>
                <Option value={3}>Research</Option>
              </Select>
            </FormControl>
          </div>

          <div className={row()}>
            <FormControl sx={{ flex: 1 }} required>
              <FormLabel>What you are interested in ?</FormLabel>

              <Textarea
                maxRows={4}
                minRows={4}
                placeholder="Let us know about your project..."
              />
            </FormControl>
          </div>

          <div className={row()}>
            <Button
              size="lg"
              type="submit"
              loading={loading}
              loadingIndicator={
                <CircularProgress
                  thickness={3}
                  sx={{
                    '--CircularProgress-progress-color': '#fff',
                  }}
                  variant="plain"
                  size="sm"
                />
              }
              sx={{ px: 6, background: 'var(--primary-gradient)' }}
            >
              Sent
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
