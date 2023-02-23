import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  Sheet,
  Typography,
} from '@mui/joy';
import { useAuth } from 'context/AuthContext';
import { createOrganisationApi } from 'network/api/organisation';
import React, { useState } from 'react';
import { OrganisationItemD } from 'types/org';

export default function CreateNew({
  open,
  onCreate,
  onClose,
}: {
  open: boolean;
  onClose: () => any;
  onCreate: (d: OrganisationItemD) => any;
}) {
  const [creating, setCreating] = useState(false);
  const { token } = useAuth();

  const create = async (e) => {
    try {
      setCreating(true);
      const res = await createOrganisationApi({
        name: e.currentTarget?.elements.name?.value,
        token,
      });
      setCreating(false);
      if (res.type === 'RXSUCCESS') {
        onCreate({
          project_count: '0',
          id: res.data.id,
          member_count: '0',
          name: res.data.name,
          user_id: res.data.user_id,
        });
        onClose();
      }
    } catch (err) {
      setCreating(false);
      console.log('ERR', err);
    }
  };

  return (
    <Modal
      aria-labelledby="close-modal-title"
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          minWidth: 300,
          borderRadius: 'md',
          p: 3,
          maxWidth: '90%',
          width: 600,
        }}
      >
        <ModalClose variant="outlined" />

        <div>
          <div className="mb-4">
            <Typography level="h6">Add new organisation</Typography>
          </div>

          <div>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                create(e);
              }}
            >
              <FormControl required>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Name of your oraganisation" name="name" />
              </FormControl>

              <Button loading={creating} type="submit">
                Create Organisation
              </Button>
            </form>
          </div>
        </div>
      </Sheet>
    </Modal>
  );
}
