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
import { ImSearch } from 'react-icons/im';
import { tv } from 'tailwind-variants';

const row = tv({
  base: 'flex gap-4 sm:flex-row flex-col',
});

export default function ContactUs() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="">
      <div style={{ background: 'var(--primary-gradient)' }}>
        <div className="banner flex flex-col items-center justify-center py-12">
          <div className="mb-4 text-center ">
            <h3 className="text-2xl font-semibold text-white">
              Top questions about YourGPT
            </h3>
            <p className="text-white text-opacity-50">
              Need something cleared up? Here are our most frequently asked
              question
            </p>
          </div>

          <div className="relative flex items-center">
            <div className="absolute left-5  aspect-square text-white/60">
              <ImSearch color="currentColor" size={24} />
            </div>
            <input
              type="text"
              placeholder="Enter your search...."
              className="color-white rounded-lg border-solid border-white/40 bg-white bg-opacity-0 px-4 py-3 pl-14 text-base text-lg  text-white placeholder-white/40  outline-none transition-all  hover:border-opacity-60 hover:bg-opacity-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
