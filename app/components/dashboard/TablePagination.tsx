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

export default function TablePagination({
  limit,
  total,
  page,
  onPage,
  onLimit,
}: {
  page: number;
  total: number;
  limit: number;
  onPage?: any;
  onLimit?: any;
}) {
  const onNext = () => {
    if (total > page * limit) {
      onPage((p) => p + 1);
    }
  };
  const onPrev = () => {
    if (page > 1) {
      onPage((p) => p - 1);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        justifyContent: 'space-between',
      }}
    >
      <Typography>{total} result found</Typography>

      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          <FormLabel>Rows per page:</FormLabel>
          <Select
            defaultValue={limit}
            size="sm"
            onChange={(_, v) => {
              onLimit(v);
            }}
          >
            <Option value={5}>5</Option>
            <Option value={10}>10</Option>
            <Option value={25}>25</Option>
          </Select>
        </div>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="sm"
            color="neutral"
            variant="outlined"
            disabled={page === 1}
            // disabled={page === 0}
            onClick={onPrev}
            sx={{ bgcolor: 'background.surface' }}
          >
            <FiChevronLeft />
          </IconButton>
          <IconButton
            size="sm"
            color="neutral"
            variant="outlined"
            disabled={total <= page * limit}
            // disabled={
            //   rows.length !== -1
            //     ? page >= Math.ceil(rows.length / rowsPerPage) - 1
            //     : false
            // }
            onClick={onNext}
            sx={{ bgcolor: 'background.surface' }}
          >
            <FiChevronRight />
          </IconButton>
        </Box>
      </div>
    </Box>
  );
}
