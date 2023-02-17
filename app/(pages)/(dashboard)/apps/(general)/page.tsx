'use client';

import { Badge, Button, Chip, IconButton, Table, Typography } from '@mui/joy';
import Link from 'next/link';
import React from 'react';
import { FaArrowRight, FaEdit, FaPlus } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

export default function Apps() {
  return (
    <div>
      <div className="mx-auto mt-12 max-w-[800px]">
        <div>
          <div className="mb-4 flex justify-between">
            <Typography level="h5" fontWeight={'lg'}>
              Organisation
            </Typography>

            <div className="">
              <Button startDecorator={<FaPlus />}> Add Organisation</Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white p-2 shadow-md">
            <Table aria-label="basic table">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Name</th>
                  <th>Plan</th>
                  <th>Users</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="font-bold"> Frozen yoghurt </div>
                  </td>
                  <td>
                    <Chip>Free</Chip>
                  </td>
                  <td>6</td>
                  <td>
                    <div className="flex gap-1">
                      <IconButton>
                        <BsThreeDots />
                      </IconButton>
                      <Link href={'/apps/121'}>
                        <IconButton variant="solid">
                          <FaArrowRight />
                        </IconButton>
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
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
