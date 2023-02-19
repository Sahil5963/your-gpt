import { Table, Typography } from '@mui/joy';
import TablePagination from 'app/components/TablePagination';
import React from 'react';

const COLS = [
  {
    id: 1,
    label: 'Timestamp',
  },
  {
    id: 2,
    label: 'Message',
  },
];

const DATA = [
  {
    timestamp: 'Feb 13, 2023 7:17 pm',
    message: 'Fine-tune succeeded',
  },
  {
    timestamp: 'Feb 13, 2023 7:17 pm',
    message: 'Fine-tune is in the queue. Queue number: 0',
  },
  {
    timestamp: 'Feb 13, 2023 7:17 pm',
    message: 'Fine-tune is in the queue. Queue number: 0',
  },
];

export default function Events() {
  return (
    <div className="mb-8 bg-white p-4 shadow-sm">
      <div>
        <Typography level="h5">Events</Typography>
        <Typography level="body2">123 results</Typography>
      </div>

      <div>
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
        </Table>
      </div>
    </div>
  );
}
