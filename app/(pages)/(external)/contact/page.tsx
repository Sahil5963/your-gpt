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
import { toast } from 'react-hot-toast';
import { FiAlignRight, FiArrowRight } from 'react-icons/fi';
import { tv } from 'tailwind-variants';

const row = tv({
  base: 'flex gap-4 sm:flex-row flex-col',
});

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [interest, setInterest] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const formElements = e.currentTarget.elements;
    const data = {
      name: formElements.name.value,
      email: formElements.email.value,
      message: formElements.message.value,
    };

    if (!interest || !budget) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const raw = {
        name: data.name,
        email: data.email,
        message: data.message,
        intrested_in: interest,
        project_budget: budget,
      };
      await contactApi(raw);

      setLoading(false);
      toast.success('Sent! We will contact you shortly.');
    } catch (err) {
      setLoading(false);
      toast.error('Something went wrong!');
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
              <Input placeholder="Enter your name" name="name" />
            </FormControl>
            <FormControl sx={{ flex: 1 }} required>
              <FormLabel>Your Email</FormLabel>
              <Input type="email" placeholder="Enter your email" name="email" />
            </FormControl>
          </div>
          <div className={row()}>
            <FormControl sx={{ flex: 1 }} required>
              <FormLabel>What you are interested in ?</FormLabel>

              <Select
                placeholder="Select..."
                value={interest}
                onChange={(e, val) => {
                  setInterest(val);
                }}
                name="interest"
              >
                <Option value="business">Business</Option>
                <Option value="study">Study</Option>
                <Option value="research">Research</Option>
              </Select>
            </FormControl>

            <FormControl sx={{ flex: 1 }} required>
              <FormLabel>Project Budget</FormLabel>
              <Select
                placeholder="Select your project budget"
                value={budget}
                onChange={(e, val) => {
                  setBudget(val);
                }}
                name="budget"
              >
                <Option value="1">Low</Option>
                <Option value="12">Medium</Option>
                <Option value="123">High</Option>
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
                name="message"
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
