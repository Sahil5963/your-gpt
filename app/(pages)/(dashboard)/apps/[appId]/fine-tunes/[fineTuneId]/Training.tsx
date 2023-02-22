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
import { HiDotsVertical } from 'react-icons/hi';

const COLS = [
  {
    id: 1,
    label: 'Name',
  },
  {
    id: 2,
    label: 'ID',
  },
  {
    id: 3,
    label: 'Purpose',
  },
  {
    id: 4,
    label: 'Created date',
  },
  {
    id: 5,
    label: 'Status',
  },
  {
    id: 6,
    label: 'Action',
  },
];

const DATA = [
  {
    name: 'bankFAQ.jsonl',
    id: 'file-re92uqxZTOeGqPlVsfPFnIM6',
    purpose: 'fine-tune',
    createdAt: 'Created date',
    status: 'processed',
  },
  {
    name: 'bankFAQ.jsonl',
    id: 'file-re92uqxZTOeGqPlVsfPFnIM6',
    purpose: 'fine-tune',
    createdAt: 'Created date',
    status: 'processed',
  },
  {
    name: 'bankFAQ.jsonl',
    id: 'file-re92uqxZTOeGqPlVsfPFnIM6',
    purpose: 'fine-tune',
    createdAt: 'Created date',
    status: 'processed',
  },
];

export default function Training() {
  return (
    <div className="mb-8 bg-white p-4 shadow-sm">
      <div>
        <Typography level="h6">Training files</Typography>
        <Typography level="body2">1 result</Typography>
      </div>

      <div>
        <Table aria-label="basic table">
          <thead>
            <tr>
              {COLS.map((i, ind) => {
                return (
                  <th style={{ width: ind == 1 ? '30%' : 'unset' }}>
                    {i.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {DATA.map((i) => {
              return (
                <tr>
                  <td>{i.name}</td>
                  <td>{i.id}</td>
                  <td>{i.purpose}</td>
                  <td>{i.createdAt}</td>
                  <td>{i.status}</td>
                  <td>
                    <IconButton>
                      <HiDotsVertical />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={COLS.length}>{/* <TablePagination /> */}</td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </div>
  );
}
