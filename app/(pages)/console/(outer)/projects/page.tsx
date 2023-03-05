'use client';

import {
  Badge,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Input,
  Option,
  Select,
  Table,
  Tooltip,
  Typography,
} from '@mui/joy';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaEdit,
  FaEye,
  FaPlus,
  FaPlusCircle,
} from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { BsThreeDots } from 'react-icons/bs';
import styled from '@emotion/styled';
import { getProjectsApi } from 'network/api/project';
import TablePagination from 'app/(pages)/console/components/TablePagination';
import { useAuth } from 'context/AuthContext';
import { log } from 'utils/helpers';
import { ProjectItemD } from 'types/project';
import { SortD } from 'types';
import { useDebounce } from 'use-debounce';
import { useListingApi } from 'hooks/useListingApi';

const COLS = [
  {
    id: 1,
    label: 'Name',
  },
  {
    id: 2,
    label: 'Key',
  },

  {
    id: 3,
    label: 'Organisation',
  },
  {
    id: 4,
    label: 'Actions',
  },
];

export default function Projects() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState<SortD>('');
  const [search, setSearch] = useState('');

  const {
    data: list,
    loading,
    apiError,
    total,
  }: {
    data: ProjectItemD[];
    loading: boolean;
    apiError: string;
    total: number;
  } = useListingApi({ type: 'project', limit, page, search, sort });

  return (
    <div>
      <div className="">
        <div>
          <div className="mb-6 flex items-center justify-between">
            <Typography level="h6" fontWeight={'md'}>
              Your projects
            </Typography>

            <div className="">
              <Link href={'/console/projects/create'} className="no-underline">
                <Button variant="outlined" startDecorator={<FaPlus />}>
                  Add Project
                </Button>
              </Link>
            </div>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <div>
              <Input
                type={'search'}
                size="sm"
                placeholder="Search project"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>

            <div>
              <Select
                size="sm"
                placeholder="Sort"
                value={sort}
                onChange={(_, val) => setSort(val)}
              >
                <Option value={'asc'}>ASC</Option>
                <Option value={'desc'}>DESC</Option>
              </Select>
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
                  {search ? (
                    <>
                      <div className="flex  flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 py-16">
                        <Typography textColor="neutral.500">
                          No Project found
                        </Typography>
                      </div>
                    </>
                  ) : (
                    <div className="flex  flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 py-16">
                      <Typography textColor="neutral.500">
                        You do not have any project
                      </Typography>

                      <Link
                        href={'/console/projects/create'}
                        className="no-underline"
                      >
                        <Button variant="outlined" startDecorator={<FaPlus />}>
                          Create new project
                        </Button>
                      </Link>
                    </div>
                  )}
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
                            <tr key={i.id}>
                              <td>
                                <Link
                                  href={`/console/project/${i.id}`}
                                  className="text-black no-underline "
                                >
                                  <Typography fontWeight={'lg'}>
                                    {i.name}
                                  </Typography>
                                </Link>
                              </td>
                              <td>{i.project_key}</td>
                              <td>{i.organization?.name}</td>
                              <td>
                                <div className="actions cell flex gap-1">
                                  <Link href={`/console/projects/${i.id}`}>
                                    <IconButton variant="outlined">
                                      <FaEdit />
                                    </IconButton>
                                  </Link>
                                  <Link
                                    href={`/console/project/${i.project_key}`}
                                  >
                                    <IconButton variant="outlined">
                                      <FaEye />
                                    </IconButton>
                                  </Link>
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
              href={'/projects/12121'}
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
