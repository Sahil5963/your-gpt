'use client';

import {
  Breadcrumbs,
  Button,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  List,
  ListDivider,
  ListItem,
  ListItemContent,
  Typography,
} from '@mui/joy';
import { appContent } from 'app/components/variants/app';
import { useApp } from 'context/AppContext';
import Link from 'next/link';
import {
  useRouter,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from 'next/navigation';
import React from 'react';
import { FiArrowDown, FiChevronLeft } from 'react-icons/fi';
import Data from './Data';

export default function FileDetail() {
  const { projectId } = useApp();
  const router = useRouter();

  const params = useSelectedLayoutSegment();
  const params1 = useSelectedLayoutSegments();

  return (
    <div className="bg-gray-50">
      <div className={appContent()}>
        <div>
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
              File Details
            </Typography>
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <div>
            <Typography level="h5" fontWeight={'md'}>
              bankFAQ.jsonl
            </Typography>
            <Typography>file-SP1o6zpGIr6rl8NgaZPbjYmp</Typography>
          </div>
          <div>
            <Chip size="sm" color="success" onClick={function () {}}>
              Processed
            </Chip>
          </div>
        </div>

        <div className="mb-8 flex gap-4 ">
          <div className="flex-1 rounded-lg bg-white p-6 shadow-sm">
            {/* LIST START  */}
            <div className=" flex flex-col gap-2">
              <div className="flex justify-between gap-2">
                <Typography fontWeight={'md'}>Purpose : </Typography>
                <Typography fontWeight={'sm'}>fine-tune</Typography>
              </div>
              <Divider />
              <div className="flex justify-between gap-2">
                <Typography fontWeight={'md'}>Bytes : </Typography>
                <Typography fontWeight={'sm'}>812238</Typography>
              </div>
              <Divider />
              <div className="flex justify-between gap-2">
                <Typography fontWeight={'md'}>Object : </Typography>
                <Typography fontWeight={'sm'}>file</Typography>
              </div>
              <Divider />
              <div className="flex justify-between gap-2">
                <Typography fontWeight={'md'}>Created at</Typography>
                <Typography fontWeight={'sm'}>file</Typography>
              </div>
            </div>

            {/* LIST END  */}
          </div>

          <div className="flex flex-1 flex-col rounded-lg bg-white p-6 shadow-sm">
            <Typography level="body1" fontWeight={'lg'}>
              Download File
            </Typography>

            <div className="mt-4 mb-3 flex gap-8">
              <Checkbox label="CSV" size="md" defaultChecked />

              <Checkbox label="JSON" size="md" defaultChecked />
            </div>

            <Button size="md" sx={{ marginTop: 'auto' }}>
              Download
            </Button>
          </div>
        </div>

        {/* DATASTART  */}

        <Data />

        <div className="bg-white p-4 shadow-sm">
          <div className="mb-4">
            <Typography level="h6">Raw JSON</Typography>
          </div>

          <div className="text-sm text-gray-500">
            {`{"prompt":"Do I need to enter ‘#’ after keying in my Card number/ Card expiry date/ CVV number@@@","completion":"Please listen to the recorded message and follow the instructions while entering your card... 
`}
          </div>
        </div>
      </div>
    </div>
  );
}
