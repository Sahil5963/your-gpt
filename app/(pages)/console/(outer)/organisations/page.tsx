'use client';

import {
  Badge,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalClose,
  Option,
  Select,
  Sheet,
  Table,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/joy';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowRight, FaEdit, FaPlus, FaPlusCircle } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { BsFillGearFill, BsThreeDots } from 'react-icons/bs';
import styled from '@emotion/styled';
import { getProjectsApi } from 'network/api/project';
import TablePagination from 'app/(pages)/console/components/TablePagination';
import { useAuth } from 'context/AuthContext';
import { log } from 'utils/helpers';
import { OrganisationItemD } from 'types/org';
import CreateNew from './CreateNew';
import { IoPersonAdd } from 'react-icons/io5';
import Edit from './Edit';
import { AiFillDelete } from 'react-icons/ai';
import { getOrganisationApi } from 'network/api/organisation';
import { SortD } from 'types';
import { useDebounce } from 'use-debounce';
import { useListingApi } from 'hooks/useListingApi';

const COLS = [
  {
    id: 1,
    label: 'ID',
  },
  {
    id: 2,
    label: 'Name',
  },
  {
    id: 3,
    label: 'Apps',
  },
  {
    id: 4,
    label: 'Memebers',
  },
  {
    id: 4,
    label: 'Actions',
  },
];

export default function Organisation() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortD>('desc');

  const {
    data: list,
    loading,
    apiError,
    total,
    setData: setList,
    setTotal,
  }: {
    data: OrganisationItemD[];
    loading: boolean;
    apiError: string;
    total: number;
    setTotal: any;
    setData: any;
  } = useListingApi({ type: 'org', limit, page, search, sort });

  //GENERAL
  const [activeOrg, setActiveOrg] = useState<OrganisationItemD>(
    {} as OrganisationItemD,
  );
  //Create
  const [createOpen, setCreateOpen] = useState(false);

  //Add Mmember
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  return (
    <div>
      <div className="">
        <div>
          <div className="mb-6 flex items-center justify-between">
            <Typography level="h6" fontWeight={'md'}>
              Your organisations
            </Typography>

            <div className="">
              {/* <Link
                href={'/projects/organisations/create'}
                className="no-underline"
              > */}
              <Button
                variant="outlined"
                startDecorator={<FaPlus />}
                onClick={() => setCreateOpen(true)}
              >
                Add organisation
              </Button>
              {/* </Link> */}
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
                          No organizations found
                        </Typography>
                      </div>
                    </>
                  ) : (
                    <div className="flex  flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 py-16">
                      <Typography textColor="neutral.500">
                        You do not have any orgasnisations
                      </Typography>

                      <Link
                        href={'/console/organisations/create'}
                        className="no-underline"
                      >
                        <Button variant="outlined" startDecorator={<FaPlus />}>
                          Create new organisation
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
                            <tr>
                              <td>{i.id}</td>
                              <td>{i.name}</td>
                              <td>{i.project_count}</td>
                              <td>{i.member_count}</td>
                              <td>
                                <div className="actions cell flex gap-1">
                                  <Tooltip title="Manage" variant="solid">
                                    <IconButton
                                      variant="outlined"
                                      onClick={() => {
                                        setActiveOrg(i);
                                        setAddMemberOpen(true);
                                      }}
                                    >
                                      {/* <IoPersonAdd /> */}
                                      <FaEdit />
                                    </IconButton>
                                  </Tooltip>
                                  <IconButton variant="outlined" color="danger">
                                    <AiFillDelete />
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
        </div>
      </div>

      {createOpen && (
        <CreateNew
          onCreate={(res) => {
            setTotal((s) => s + 1);
            setList((s) => [res, ...s]);
          }}
          open={createOpen}
          onClose={() => setCreateOpen(false)}
        />
      )}

      {addMemberOpen && (
        <Edit
          open={addMemberOpen}
          onClose={() => setAddMemberOpen(false)}
          onUpdate={(d) => {
            setList((s) => s.map((i) => (i.id === d.id ? { ...i, ...d } : i)));
            setAddMemberOpen(false);
          }}
          {...activeOrg}
        />
      )}
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
