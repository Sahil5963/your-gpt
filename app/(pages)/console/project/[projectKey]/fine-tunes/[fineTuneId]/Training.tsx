import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Option,
  Select,
  Table,
  Typography,
} from '@mui/joy';
import TablePagination from 'app/components/dashboard/TablePagination';
import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { HiDotsVertical } from 'react-icons/hi';
import { TrainingFileD } from 'types/fineTune';

import DataTable from 'react-data-table-component';
import { formatDateTime } from 'utils/helpers';

const columns: {
  name: string;
  selector: (d: TrainingFileD) => any;
}[] = [
  {
    name: 'Name',
    selector: (row) => row.filename,
  },
  {
    name: 'Purpose',
    selector: (row) => row.purpose,
  },
  {
    name: 'Created date',
    selector: (row) => formatDateTime(row.created_at),
  },
  {
    name: 'Status',
    selector: (row) => row.status,
  },
  {
    name: 'Action',
    selector: (row) => '',
  },
];

export default function Training({
  trainingFiles,
}: {
  trainingFiles?: TrainingFileD[];
}) {
  return (
    <div className="mb-8 bg-white p-4 shadow-sm">
      <div>
        <Typography level="h6">Training files</Typography>
        <Typography level="body2">{trainingFiles?.length} result</Typography>
      </div>

      <div>
        <DataTable
          columns={columns}
          data={trainingFiles}
          pagination
          paginationRowsPerPageOptions={[5, 10, 100]}
          paginationPerPage={5}
        />
      </div>
    </div>
  );
}
