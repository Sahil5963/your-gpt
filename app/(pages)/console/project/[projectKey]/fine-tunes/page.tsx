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
import React, { useMemo, useState } from 'react';
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
import TablePagination from 'app/(pages)/console/components/TablePagination';
import { SortD } from 'types';
import { useApp } from 'context/AppContext';
import { useListingApi } from 'hooks/useListingApi';
import { ModelItemD } from 'types/model';
import { FineTuneItemD } from 'types/fineTune';
import { formatDateTime } from 'utils/helpers';
import DataTable from 'react-data-table-component';
import ConfirmModal from 'app/(pages)/console/components/ConfirmModal';
import { appContent } from 'app/(pages)/console/components/variants/app';

export default function AppFineTunes() {
  const router = useRouter();
  const pathname = usePathname();
  const [deleteId, setDeleteId] = useState('');
  const [deleting, setDeleting] = useState(false);

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
    data: FineTuneItemD[];
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
    type: 'models',
    project_key: projectKey,
  });

  const COLS: {
    name: string;
    wrap: boolean;
    selector: (d: FineTuneItemD) => any;
  }[] = useMemo(
    () => [
      {
        name: 'ID',
        selector: (row) => row.id,
        wrap: true,
      },
      {
        name: 'Modal',
        selector: (row) => row.model,
        wrap: true,
      },
      {
        name: 'Name',
        selector: (row) => row.fine_tuned_model,
        wrap: true,
      },
      {
        name: 'Created at',
        selector: (row) => formatDateTime(row.created_at),
        wrap: true,
      },
      {
        name: 'Status',
        selector: (row) => row.status,
        wrap: true,
      },
      {
        name: 'Actions',
        selector: (row) => (
          <>
            <div className="flex gap-1">
              <IconButton
                variant="outlined"
                color="danger"
                onClick={() => setDeleteId(row.id)}
              >
                <AiFillDelete />
              </IconButton>
              <IconButton
                variant="solid"
                onClick={() => {
                  router.push(pathname + '/' + row.id);
                }}
              >
                <AiFillEye />
              </IconButton>
            </div>
          </>
        ),
        wrap: true,
      },
    ],
    [],
  );

  const onDelete = async () => {
    try {
    } catch (err) {
      console.log('Err', err);
    }
  };

  return (
    <div className={appContent()}>
      <div className="flex justify-between">
        <div className="right">
          <Typography level="h6">Your App's Fine-tunes</Typography>
          <Typography level="body2">{data?.length} results</Typography>
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
            <>
              <DataTable
                columns={COLS}
                data={data}
                pagination
                paginationRowsPerPageOptions={[10, 50, 100]}
                paginationPerPage={10}
              />
            </>
          )}
        </Sheet>
      </div>

      <ConfirmModal
        loading={true}
        onClose={() => setDeleteId('')}
        onConfirm={() => {}}
        open={deleteId ? true : false}
        title="Confirmation"
        desc="Are you sure you want to delete this Fine-tune?"
        danger
        confirmTitle="     Delete this Fine-tune"
      />
    </div>
  );
}
