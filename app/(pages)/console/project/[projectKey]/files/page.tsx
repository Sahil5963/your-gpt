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
import { appContent } from 'app/(pages)/console/components/variants/app';
import React, { useMemo, useState } from 'react';
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
import { useListingApi } from 'hooks/useListingApi';
import { SortD } from 'types';
import { useApp } from 'context/AppContext';
import ConfirmModal from 'app/(pages)/console/components/ConfirmModal';
import { ProjectFileItemD } from 'types/project';
import { formatDateTime } from 'utils/helpers';
import DataTable from 'react-data-table-component';
import { deleteFileApi } from 'network/api/project/file';
import { useAuth } from 'context/AuthContext';

export default function AppFiles() {
  const router = useRouter();
  const pathname = usePathname();
  const [deleteId, setDeleteId] = useState('');

  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortD>('desc');
  const { token } = useAuth();

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
    setData: React.Dispatch<React.SetStateAction<ProjectFileItemD[]>>;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
  } = useListingApi({
    limit,
    page,
    search,
    sort,
    type: 'projectFiles',
    project_key: projectKey,
  });

  const [deleting, setDeleting] = useState(false);

  const COLS: {
    name: string;
    wrap: boolean;
    selector: (d: ProjectFileItemD) => any;
  }[] = useMemo(
    () => [
      {
        name: 'Filename',
        wrap: true,
        selector: (i) => i.filename,
      },
      {
        name: 'ID',
        wrap: true,
        selector: (i) => i.id,
      },
      {
        name: 'Created date',
        wrap: true,
        selector: (i) => formatDateTime(i.created_at),
      },
      {
        name: 'Purpose',
        wrap: true,
        selector: (i) => i.purpose,
      },
      {
        name: 'Status',
        wrap: true,
        selector: (i) => i.status,
      },
      {
        name: 'Actions',
        wrap: true,
        selector: (i) => (
          <>
            <div className="flex gap-1">
              <IconButton
                variant="outlined"
                color="danger"
                onClick={() => setDeleteId(i.id)}
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
          </>
        ),
      },
    ],
    [],
  );

  const onDelete = async () => {
    try {
      setDeleting(true);

      const res = await deleteFileApi({
        file_id: deleteId,
        project_key: projectKey,
        token,
      });
      setDeleting(false);

      if (res.type === 'RXSUCCESS') {
        setDeleteId('');
        setData((s) => s.filter((s) => s.id !== deleteId));
        setTotal((s) => s - 1);
      }
    } catch (err) {
      setDeleting(false);
      console.log('Err', err);
    }
  };

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
            <DataTable
              columns={COLS}
              data={data}
              pagination
              paginationRowsPerPageOptions={[10, 50, 100]}
              paginationPerPage={10}
            />
          )}
        </Sheet>
      </div>

      <ConfirmModal
        open={deleteId ? true : false}
        onClose={() => setDeleteId('')}
        danger
        confirmTitle="Delete file"
        loading={deleting}
        onConfirm={() => onDelete()}
        desc="This action in not reversible"
        // title='Delete this file '
      />
    </div>
  );
}
