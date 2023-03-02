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
import { SortD } from 'types';
import { useApp } from 'context/AppContext';
import { useListingApi } from 'hooks/useListingApi';
import { ModelItemD } from 'types/model';
import { FineTuneItemD } from 'types/fineTune';
import { formatDateTime } from 'utils/helpers';

const COLS = [
  {
    id: 1,
    label: 'ID',
  },
  {
    id: 2,
    label: 'Modal',
  },
  {
    id: 3,
    label: 'Created at',
  },
  {
    id: 4,
    label: 'Status',
  },
  {
    id: 5,
    label: '',
  },
];

const DATA = [
  {
    id: 'file-QZxukTp0Zre5iHI19DlCm0C0',
    model: 'davinci:ft-personal:bank-faq-2023-02-13-12-38-28',
    createdAt: 'Feb 13, 2023 7:17 pm',
    trainingFile: 'bankFAQ.jsonl',
    status: 'succeeded',
  },
];

export default function AppFineTunes() {
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

  return (
    <div className={appContent()}>
      <div className="flex justify-between">
        <div className="right">
          <Typography level="h6">Your App's Fine-tunes</Typography>
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
                      <td>{i.id}</td>
                      <td>{i.model}</td>
                      <td>{formatDateTime(i.created_at)}</td>
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
                        onLimit: (e) => setLimit(e),
                        page,
                        onPage: (e) => setPage(e),
                        total,
                      }}
                    />
                  </td>
                </tr>
              </tfoot>
            </Table>
          )}
        </Sheet>
      </div>

      <Modal open={deleteId ? true : false} onClose={() => setDeleteId('')}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            startDecorator={<IoWarning />}
          >
            Confirmation
          </Typography>
          <Divider />
          <Typography
            id="alert-dialog-modal-description"
            textColor="text.tertiary"
          >
            Are you sure you want to delete this Fine-tune?
          </Typography>
          <Box
            sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}
          >
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setDeleteId('')}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={() => setDeleteId('')}
            >
              Delete this Fine-tune
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </div>
  );
}
