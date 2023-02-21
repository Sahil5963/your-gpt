'use client';

import {
  Badge,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Table,
  Tooltip,
  Typography,
} from '@mui/joy';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowRight, FaEdit, FaPlus, FaPlusCircle } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { BsThreeDots } from 'react-icons/bs';
import styled from '@emotion/styled';
import { getAppsApi } from 'network/api/app';
import TablePagination from 'app/components/TablePagination';
import { useAuth } from 'context/AuthContext';
import { log } from 'utils/helpers';

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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const fetchApps = useCallback(async () => {
    try {
      if (!token) {
        return;
      }

      setLoading(true);
      const res = await getAppsApi({ token: token, page, limit });
      setLoading(false);

      if (res.type === 'RXSUCCESS') {
        if (page === 1) {
          setList(res.data.rows);
        } else {
          setList((s) => [...s, res.data.rows]);
        }
      }
    } catch (err) {
      setLoading(false);
      console.log('Err', err);
    }
  }, [token, page, limit]);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

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

          {loading ? (
            <div className="flex  flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 py-16">
              <CircularProgress />
            </div>
          ) : (
            <>
              {list.length === 0 ? (
                <>
                  <div className="flex  flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 py-16">
                    <Typography textColor="neutral.500">
                      You do not have any apps
                    </Typography>

                    <Link href={'/apps/create'} className="no-underline">
                      <Button variant="outlined" startDecorator={<FaPlus />}>
                        Create new app
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="overflow-hidden rounded-lg bg-white ">
                    <Table>
                      <thead>
                        <tr>
                          {COLS.map((i) => {
                            return <th key={i.id}>{i.label}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((i) => {
                          return (
                            <tr>
                              <td>{i.id}</td>
                              <td>{i.name}</td>
                              <td>{i.app_count}</td>
                              <td>{i.member_count}</td>
                              <td>
                                <div className="actions cell flex gap-1">
                                  <IconButton variant="outlined">
                                    <FaEdit />
                                  </IconButton>
                                  <IconButton variant="plain">
                                    <HiDotsVertical />
                                  </IconButton>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={COLS.length}>
                            <TablePagination
                              {...{ limit, page, total }}
                              onPage={setPage}
                              onLimit={setLimit}
                            />
                          </td>
                        </tr>
                      </tfoot>
                    </Table>
                  </div>
                </>
              )}
            </>
          )}

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

// const Table = styled.div`
//   width: 100%;
//   border-radius: 8px;
//   overflow: hidden;

//   .row {
//     display: flex;
//     & > div:first-of-type {
//       flex: 1;
//     }
//   }
//   .body {
//     & > div:not(:last-child) {
//       border-bottom: 1px solid rgba(0, 0, 0, 0.12);
//     }
//   }

//   .cell {
//     min-width: 20%;
//     padding: 1rem;
//     display: flex;
//     align-items: center;
//   }
// `;
