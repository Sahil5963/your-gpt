'use client';
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Option,
  Select,
  Typography,
} from '@mui/joy';
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function TablePagination() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        justifyContent: 'flex-end',
      }}
    >
      <FormControl orientation="horizontal" size="sm">
        <FormLabel>Rows per page:</FormLabel>
        <Select onChange={() => {}} value={5}>
          <Option value={5}>5</Option>
          <Option value={10}>10</Option>
          <Option value={25}>25</Option>
        </Select>
      </FormControl>
      <Typography textAlign="center" sx={{ minWidth: 80 }}>
        {/* {labelDisplayedRows({
        from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
        to: getLabelDisplayedRowsTo(),
        count: rows.length === -1 ? -1 : rows.length,
      })} */}
        12-1
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton
          size="sm"
          color="neutral"
          variant="outlined"
          // disabled={page === 0}
          onClick={() => {}}
          sx={{ bgcolor: 'background.surface' }}
        >
          <FiChevronLeft />
        </IconButton>
        <IconButton
          size="sm"
          color="neutral"
          variant="outlined"
          // disabled={
          //   rows.length !== -1
          //     ? page >= Math.ceil(rows.length / rowsPerPage) - 1
          //     : false
          // }
          onClick={() => {}}
          sx={{ bgcolor: 'background.surface' }}
        >
          <FiChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
}
