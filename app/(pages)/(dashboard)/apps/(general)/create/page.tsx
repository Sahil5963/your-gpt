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
import { appContent } from 'app/components/variants/app';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

export default function CreateApp() {
  const router = useRouter();

  return (
    <div>
      <div className="">
        <div className="mb-6 flex items-center gap-3">
          <IconButton
            color="neutral"
            onClick={() => {
              router.back();
            }}
          >
            <FaArrowLeft />
          </IconButton>
          <Typography level="h6">Create App</Typography>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FormControl required>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Name of your app" />
          </FormControl>
          <FormControl required>
            <FormLabel>Catgeory</FormLabel>
            <Input placeholder="Name your fine-tune" />
          </FormControl>
          <FormControl required>
            <FormLabel>Organisation</FormLabel>
            <Select placeholder="Choose one…">
              <Option value={1}>sadas.jsonl</Option>
              <Option value={2}>324HJASasa.jsonl</Option>
            </Select>
          </FormControl>

          <Button type="submit">CREATE APP</Button>
        </form>
      </div>
    </div>
  );
}
