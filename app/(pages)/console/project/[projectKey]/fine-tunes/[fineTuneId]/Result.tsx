import { Box, Typography } from '@mui/joy';
import React from 'react';

import { ResultFileD, TrainingFileD } from 'types/fineTune';

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

export default function Result({
  resultFiles,
}: {
  resultFiles?: ResultFileD[];
}) {
  return (
    <div className="mb-8 bg-white p-4 shadow-sm">
      <div>
        <Typography level="h6">Result files</Typography>
        <Typography level="body2">{resultFiles?.length} result</Typography>
      </div>

      <div>
        <DataTable
          columns={columns}
          data={resultFiles}
          pagination
          paginationRowsPerPageOptions={[5, 10, 100]}
          paginationPerPage={5}
        />
      </div>
    </div>
  );
}
