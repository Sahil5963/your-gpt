'use client';

import { Badge, Button, Chip, IconButton, Typography } from '@mui/joy';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaEdit, FaPlus, FaPlusCircle } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { BsThreeDots } from 'react-icons/bs';
import styled from '@emotion/styled';
import { getAppsApi } from 'network/api/app';

const COLS = [
  {
    id: 1,
    label: 'Name',
  },
  {
    id: 2,
    label: 'Plan',
  },
  {
    id: 3,
    label: 'Users',
  },
  {
    id: 4,
    label: '',
  },
];

const DATA = [
  {
    id: 1,
    name: 'Amazecall ',
    users: '12.5K',
  },
  {
    id: 2,
    name: 'LetsQA ',
    users: '1.5K',
  },
];

export default function Apps() {
  const [list, setList] = useState<any[]>([]);

  const fetchApps = async () => {
    try {
      const res = await getAppsApi({ token: '' });
    } catch (err) {
      console.log('Err', err);
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="">
        <div>
          <div className="mb-6 flex items-center justify-between">
            <Typography level="h6" fontWeight={'md'}>
              Your apps
            </Typography>

            <div className="">
              <Link href={'/apps/create'} className="no-underline">
                <Button variant="outlined" startDecorator={<FaPlus />}>
                  Add App
                </Button>
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white ">
            <div className="flex  flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 py-16">
              <Typography textColor="neutral.500">
                You do not have any apps
              </Typography>

              <Button variant="outlined" startDecorator={<FaPlus />}>
                Create new app
              </Button>
            </div>
            <br />

            <Table>
              <div className="header row bg-gray-200">
                {COLS.map((i) => {
                  return <div className="cell font-medium">{i.label}</div>;
                })}
              </div>

              <div className="body">
                {DATA.map((i) => {
                  return (
                    <div className="row">
                      <div className="name cell font-semibold">
                        <Link href={'/apps/1'} className="text-gray-900">
                          {i.name}
                        </Link>
                      </div>
                      <div className="name cell">FREE</div>
                      <div className="name cell">{i.users}</div>
                      <div className="actions cell flex justify-end gap-1">
                        <IconButton variant="outlined">
                          <FaEdit />
                        </IconButton>
                        <IconButton variant="plain">
                          <HiDotsVertical />
                        </IconButton>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Table>
          </div>
          {/* 
          <div>
            <Link
              href={'/apps/12121'}
              className="item hover:bg-gray-150 flex items-center justify-between rounded-md bg-gray-100 px-2 py-2 no-underline"
            >
              <Typography fontWeight={'lg'} sx={{}}>
                Default
              </Typography>

              <div>
                <IconButton>
                  <FaEdit />
                </IconButton>
              </div>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}

const Table = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;

  .row {
    display: flex;
    & > div:first-child {
      flex: 1;
    }
  }
  .body {
    & > div:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
  }

  .cell {
    min-width: 20%;
    padding: 1rem;
    display: flex;
    align-items: center;
  }
`;
