'use client';

import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
} from '@mui/joy';
import { appContent } from 'app/(pages)/console/components/variants/app';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';

export default function FineTuneAdd() {
  const router = useRouter();

  return (
    <div className="bg-gray-50">
      <div className={appContent()}>
        <div className="mb-4 flex items-center gap-2">
          <IconButton
            size="md"
            color="neutral"
            onClick={() => {
              router.back();
            }}
          >
            <FiChevronLeft />
          </IconButton>

          <Typography fontWeight={'md'} color={'neutral'}>
            Create Fine-tune
          </Typography>
        </div>

        <div className="mb-6">
          <Typography level="h5">Create new fine tune</Typography>
          <Typography color="neutral" level="body2">
            Create new fine tunes straight to your OpenAI account
          </Typography>
        </div>

        {/* PAPER  */}
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormControl required>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Name your fine-tune" />
            </FormControl>
            <FormControl required>
              <FormLabel>Choose file</FormLabel>
              <Select placeholder="Choose one…">
                <Option value={1}>sadas.jsonl</Option>
                <Option value={2}>324HJASasa.jsonl</Option>
              </Select>
            </FormControl>
            <FormControl required>
              <FormLabel>Base model</FormLabel>
              <Select placeholder="Choose one…">
                <Option value={1}>Curie</Option>
                <Option value={2}>Bagage</Option>
              </Select>
            </FormControl>

            <div className="grid grid-cols-4 gap-4">
              <FormControl required>
                <FormLabel>Nr. of epochs</FormLabel>
                <Select placeholder="Choose one…">
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                </Select>
              </FormControl>
              <FormControl required>
                <FormLabel>Batch size</FormLabel>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>Learning rate multiplier</FormLabel>
                <Input type={'number'} value={0.1} />
              </FormControl>
              <FormControl>
                <FormLabel>Prompt loss weight</FormLabel>
                <Input type={'number'} value={0.01} />
              </FormControl>
            </div>

            <div className="flex w-full">
              <Button type="submit">Create fine-tine</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
