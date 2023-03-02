'use client';

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Modal,
  ModalDialog,
  Option,
  Select,
  selectClasses,
  Sheet,
  Table,
  Typography,
} from '@mui/joy';
import { appContent } from 'app/components/dashboard/variants/app';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiDelete,
  FiPlus,
} from 'react-icons/fi';
import { BsPlus } from 'react-icons/bs';
import { AiFillDelete, AiFillEye } from 'react-icons/ai';
import { usePathname, useRouter } from 'next/navigation';
import { IoWarning } from 'react-icons/io5';
import TablePagination from 'app/components/dashboard/TablePagination';
import { useListingApi } from 'hooks/useListingApi';
import { SortD } from 'types';
import { useApp } from 'context/AppContext';
import ConfirmModal from 'app/components/dashboard/ConfirmModal';
import { ProjectFileItemD } from 'types/project';
import { formatDateTime } from 'utils/helpers';

const COLS = [
  {
    id: 1,
    label: 'Filename',
  },
  {
    id: 2,
    label: 'ID',
  },
  {
    id: 3,
    label: 'Created date',
  },
  {
    id: 4,
    label: 'Purpose',
  },
  {
    id: 5,
    label: 'Status',
  },
  {
    id: 6,
    label: '',
  },
];

const DATA = [
  {
    name: 'compiled_results.csv',
    id: 'file-QZxukTp0Zre5iHI19DlCm0C0',
    createdAt: 'Feb 13, 2023 7:17 pm',
    purpose: 'fine-tune-results',
    status: 'processed',
  },
];

export default function AppFiles() {
  const router = useRouter();
  const pathname = usePathname();
  const [deleteId, setDeleteId] = useState('');

  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortD>('desc');

  const { projectKey } = useApp();

  const {
    data,
    total,
    apiError,
    loading,
    setData,
    setTotal,
  }: {
    data: ProjectFileItemD[];
    total: number;
    apiError: string;
    loading: boolean;
    setData: any;
    setTotal: any;
  } = useListingApi({
    limit,
    page,
    search,
    sort,
    type: 'projectFiles',
    project_key: projectKey,
  });

  return (
    <div className={appContent()}>
      <div className="flex justify-between">
        <div className="right">
          <Typography level="h6">Your app files</Typography>
          <Typography level="body2">12 results</Typography>
        </div>

        <div className="right flex items-center gap-2">
          <Select
            placeholder="Filter"
            indicator={<FiChevronDown />}
            size="sm"
            sx={{
              width: 100,
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
            }}
          >
            <Option value="dog">Dog</Option>
            <Option value="cat">Cat</Option>
            <Option value="fish">Fish</Option>
          </Select>

          <Button
            size="md"
            startDecorator={<FiPlus />}
            onClick={() => router.push(pathname + '/add')}
          >
            Add new
          </Button>
        </div>
      </div>
      {/* HEADER END  */}

      <div>
        <Sheet>
          {loading ? (
            <div className="flex h-20 items-center justify-center">
              <CircularProgress size="md" />
            </div>
          ) : (
            <Table aria-label="basic table">
              <thead>
                <tr>
                  {COLS.map((i) => {
                    return (
                      <th style={{ width: !i.label ? 100 : 'auto' }}>
                        {i.label}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data.map((i) => {
                  return (
                    <tr>
                      <td>{i.filename}</td>
                      <td>{i.id}</td>
                      <td>{formatDateTime(i.created_at)}</td>
                      <td>{i.purpose}</td>
                      <td>{i.status}</td>
                      <td>
                        <div className="flex gap-1">
                          <IconButton
                            variant="outlined"
                            color="danger"
                            onClick={() => setDeleteId('1')}
                          >
                            <AiFillDelete />
                          </IconButton>
                          <IconButton
                            variant="solid"
                            onClick={() => {
                              router.push(pathname + '/' + i.id);
                            }}
                          >
                            <AiFillEye />
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
                      {...{
                        limit,
                        onLimit: (e) => {
                          setLimit(e);
                        },
                        page,
                        total,
                        onPage: (e) => setPage(e),
                      }}
                    />
                  </td>
                </tr>
              </tfoot>
            </Table>
          )}
        </Sheet>
      </div>

      <ConfirmModal
        open={deleteId ? true : false}
        onClose={() => setDeleteId('')}
        danger
        confirmTitle="Delete file"
        loading={false}
        onConfirm={() => {}}
        desc="This action in not reversible"
        // title='Delete this file '
      />
    </div>
  );
}
