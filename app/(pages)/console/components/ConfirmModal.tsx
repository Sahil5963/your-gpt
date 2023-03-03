'use client';

import {
  Box,
  Button,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from '@mui/joy';
import React from 'react';
import { AiFillWarning } from 'react-icons/ai';

export default function ConfirmModal({
  open,
  onClose,
  title,
  desc,
  loading,
  onConfirm,
  danger = false,
  confirmTitle,
}: {
  open: boolean;
  loading;
  cancelTitle?: string;
  confirmTitle?: string;
  title?: string;
  desc?: string;
  danger?: boolean;
  onClose: () => any;
  onConfirm: () => any;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        aria-labelledby="alert-dialog-modal-title"
        aria-describedby="alert-dialog-modal-description"
      >
        <Typography
          id="alert-dialog-modal-title"
          component="h2"
          startDecorator={<AiFillWarning />}
        >
          {title}
        </Typography>
        <Divider />

        {desc && (
          <Typography
            id="alert-dialog-modal-description"
            textColor="text.tertiary"
          >
            {desc}
          </Typography>
        )}
        <Box
          sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}
        >
          <Button variant="plain" color="neutral" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="solid"
            loading={loading}
            color={danger ? 'danger' : 'primary'}
            onClick={onConfirm}
          >
            {confirmTitle || 'Confirm'}
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
