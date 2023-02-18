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
import TablePagination from 'app/components/TablePagination';
import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const COLS = [
  {
    id: 1,
    label: 'Prompt',
  },
  {
    id: 2,
    label: 'Completion',
  },
];

const DATA = [
  {
    prompt:
      'Do I need to enter ‘#’ after keying in my Card number/ Card expiry date/ CVV number@@@',
    completion:
      'Please listen to the recorded message and follow the instructions while entering your card details.',
  },
  {
    prompt:
      'Do I need to enter ‘#’ after keying in my Card number/ Card expiry date/ CVV number@@@',
    completion:
      'Please listen to the recorded message and follow the instructions while entering your card details.',
  },
];

export default function Data() {
  return (
    <div className="mb-8 bg-white p-4 shadow-sm">
      <div>
        <Typography level="h6">Data</Typography>
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
                  <td>{i.prompt}</td>
                  <td>{i.completion}</td>
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
