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
import { externalAppContent } from 'app/components/variants';
import { contactApi } from 'network/api/app';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { FiAlignRight, FiArrowRight } from 'react-icons/fi';
import { tv } from 'tailwind-variants';

const row = tv({
  base: 'flex gap-4 sm:flex-row flex-col',
});

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<string | null>(null);
  const [budget, setBudget] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const raw = {
        name,
        email,
        message,
        intrested_in: interest,
        project_budget: budget,
      };
      console.log('raw', raw);
      await contactApi(raw);
      setName('');
      setEmail('');
      setMessage('');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log('Err', err);
    }
  };

  const inputVariant = 'soft';

  return (
    <div
      className={externalAppContent({
        class: 'mx-auto max-w-screen-md',
      })}
    >
      <div className="py-12">
        <div className="header">
          <h4 className="mt-0 mb-6 text-2xl  font-semibold sm:mb-14 sm:text-3xl sm:font-normal">
            Love to hear from you,
            <br /> Get in touch 👋
          </h4>
        </div>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className={row()}>
            <FormControl sx={{ flex: 1 }} required>
              <FormLabel>Your Name</FormLabel>
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ flex: 1 }} required>
              <FormLabel>Your Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </div>
          <div className={row()}>
            <FormControl sx={{ flex: 1 }} required>
              <FormLabel>What you are interested in ?</FormLabel>

              <Select
                placeholder="Select..."
                value={interest}
                onChange={(e) => {
                  console.log('raw', e);
                  // setInterest(e.target.value);
                }}
              >
                <Option value="Business">Bisiness</Option>
                <Option value="Study">Study</Option>
                <Option value="Research">Research</Option>
              </Select>
            </FormControl>
            <FormControl sx={{ flex: 1 }} required>
              <FormLabel>Project Budget</FormLabel>
              <Select
                placeholder="Select your project budget"
                value={budget}
                onChange={(e) => {
                  console.log('raw', e);
                  // setBudget(e.target.value)
                }}
              >
                <Option value={1}>Bisiness</Option>
                <Option value={2}>Study</Option>
                <Option value={3}>Research</Option>
              </Select>
            </FormControl>
          </div>

          <div className={row()}>
            <FormControl sx={{ flex: 1 }} required>
              <FormLabel>Send us a Message</FormLabel>

              <Textarea
                maxRows={4}
                minRows={4}
                placeholder="Let us know about your project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
