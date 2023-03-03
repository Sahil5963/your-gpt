import { Table, Typography } from '@mui/joy';
import TablePagination from 'app/(pages)/console/components/TablePagination';
import React from 'react';
import { FineTuneEventD } from 'types/fineTune';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Timestamp',
    selector: (row: FineTuneEventD) => row.created_at,
  },
  {
    name: 'Message',
    selector: (row: FineTuneEventD) => row.message,
    wrap: true,
  },
];

export default function Events({ events }: { events?: FineTuneEventD[] }) {
  return (
    <div className="mb-8 bg-white p-4 shadow-sm">
      <div>
        <Typography level="h5">Events</Typography>
        <Typography level="body2">{events?.length} results</Typography>
      </div>

      <div>
        <DataTable
          columns={columns}
          data={events}
          pagination
          paginationRowsPerPageOptions={[5, 10, 100]}
          paginationPerPage={5}
        />
        {/* 
        <Table aria-label="basic table">
          <thead>
            <tr>
              {COLS.map((i) => {
                return (
                  <th style={{ width: !i.label ? 100 : 'auto' }}>{i.label}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {DATA.map((i) => {
              return (
                <tr>
                  <td>{i.timestamp}</td>
                  <td>{i.message}</td>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={COLS.length}>
                <TablePagination />
                </td>
            </tr>
          </tfoot>
        </Table> */}
      </div>
    </div>
  );
}
