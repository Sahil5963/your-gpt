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
  Table,
  Typography,
} from '@mui/joy';
import { appContent, listItem, listItems } from 'app/components/variants/app';
import { useApp } from 'context/AppContext';
import Link from 'next/link';
import {
  useRouter,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from 'next/navigation';
import React from 'react';
import { FiArrowDown, FiChevronLeft } from 'react-icons/fi';
import Events from './Events';
import Result from './Result';
import Training from './Training';

export default function FileTuneDetail() {
  const { appId } = useApp();
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
              Fine-tune Details
            </Typography>
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <div>
            <Typography level="h5" fontWeight={'md'}>
              davinci:ft-personal:bank-faq-2023-02-13-13-47-07
            </Typography>
            <Typography>ft-yQqPelvUh15XdmnAoC1m0OWo</Typography>
          </div>
          <div>
            <Chip size="sm" color="success" onClick={function () {}}>
              succeeded
            </Chip>
          </div>
        </div>

        <div className="mb-8 flex gap-4 ">
          <div className="flex-1 rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-2">
              <Typography level="h6" fontWeight={'lg'}>
                Details
              </Typography>
              <Typography color="neutral" level="body2">
                See your fine-tune details below
              </Typography>
            </div>
            {/* LIST START  */}
            <Table
              aria-label="basic table"
              sx={{
                'tr > td:first-child': {
                  fontWeight: 'bold',
                },
              }}
            >
              <tbody>
                <tr>
                  <td>Base Model</td>
                  <td>davinci</td>
                </tr>
                <tr>
                  <td>Fine-tuned model</td>
                  <td>159</td>
                </tr>
                <tr>
                  <td>Created at</td>
                  <td>Feb 13, 2023 4:51 pm</td>
                </tr>
                <tr>
                  <td>Updated at</td>
                  <td>Feb 13, 2023 4:51 pm</td>
                </tr>
                <tr>
                  <td>Nr. of epochs</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>Batch size</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>Prompt loss weight</td>
                  <td>0.01</td>
                </tr>
                <tr>
                  <td>Learning rate multiplier</td>
                  <td>0.1</td>
                </tr>
              </tbody>
            </Table>

            {/* LIST END  */}
          </div>

          <div className="flex-1">
            <Events />
          </div>
        </div>

        {/* DATASTART  */}

        <Training />
        <Result />
      </div>
    </div>
  );
}
