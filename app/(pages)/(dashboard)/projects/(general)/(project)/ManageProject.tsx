'use client';
import {
  Alert,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalClose,
  Sheet,
  Table,
  Typography,
} from '@mui/joy';
import { width } from '@mui/system';
import { useAuth } from 'context/AuthContext';
import {
  addOrgMemberByHashApi,
  inviteOrgMemberApi,
  updateOrgApi,
} from 'network/api/organisation';
import { updateProjectApi } from 'network/api/project';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FaCross } from 'react-icons/fa';
import { HiOfficeBuilding } from 'react-icons/hi';
import { OrganisationItemD } from 'types/org';
import { ProjectItemD } from 'types/project';

export default function ManageProjectModal({
  open,
  onClose,
  onUpdate,
  projectId,
}: {
  open: boolean;
  onClose: () => any;
  onUpdate: (d: ProjectItemD) => any;
  projectId: number;
}) {
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

        <ManageProject onUpdate={onUpdate} projectId={projectId} />
      </Sheet>
    </Modal>
  );
}

export function ManageProject({
  onUpdate,
  projectId,
}: {
  onUpdate?: (d: ProjectItemD) => any;
  projectId: number;
}) {
  const { token } = useAuth();
  const [updating, setUpdating] = useState(false);
  const p = {} as ProjectItemD;

  const [project, setProject] = useState<ProjectItemD>({} as ProjectItemD);

  useEffect(() => {
    const ff = async () => {
      try {
      } catch (err) {
        console.log('Err', err);
      }
    };
  }, [projectId]);

  const update = async (e: any) => {
    const n = e.currentTarget.elements?.name?.value;
    try {
      e.preventDefault();
      setUpdating(true);
      const res = await updateProjectApi({
        token,
        name: n,
        project_id: p.id.toString(),
      });
      setUpdating(false);
      if (res.type === 'RXSUCCESS') {
        onUpdate({
          ...p,
          name: n,
        });
      }

      console.log('RES', res);
    } catch (err) {
      setUpdating(false);
      console.log('Err', err);
    }
  };

  //INVITE
  const [inviteError, setInviteError] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState('');
  const [inviteLoading, setInviteLoading] = useState(false);

  const onInvite = async (e) => {
    try {
      setInviteError('');
      setInviteSuccess('');

      setInviteLoading(true);
      const res = await inviteOrgMemberApi({
        email: e.currentTarget?.elements?.email?.value,
        role: e.currentTarget?.elements?.role?.value,
        organization_id: p.id?.toString(),
        token,
      });

      setInviteLoading(false);

      if (res.type === 'RXERROR') {
        setInviteSuccess('');
        setInviteError(res.message);
      }

      if (res.type === 'RXSUCCESS') {
        setInviteError('');
        setInviteSuccess(res.message);
      }
    } catch (err) {
      setInviteLoading(false);
      console.log('Err', err);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Typography textColor={'neutral.500'} fontWeight={'lg'}>
          {p.name} (Organization)
        </Typography>
      </div>

      <div className="flex flex-col gap-8">
        <div className="top">
          <form className="flex flex-col gap-2" onSubmit={update}>
            <FormControl size="md" required sx={{ flex: 1 }}>
              <FormLabel>Name</FormLabel>
              <Input defaultValue={p.name} name="name" />
            </FormControl>
            <div className="self-start">
              <Button type="update" loading={updating}>
                Update
              </Button>
            </div>
          </form>
        </div>

        <div>
          <Typography fontWeight={'lg'}>Members</Typography>

          <Table size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th style={{ width: '10%' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sahil</td>
                <td>sk950121@gmail.com</td>
                <td>
                  <IconButton color="danger">
                    <AiFillDelete />
                  </IconButton>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            onInvite(e);
          }}
        >
          <Typography fontWeight={'lg'} textColor="neutral.500" fontSize="sm">
            Invite members
          </Typography>
          <div className="flex items-start gap-2">
            <FormControl
              size="sm"
              required
              sx={{ flex: 1 }}
              color={
                inviteError ? 'danger' : inviteSuccess ? 'success' : 'neutral'
              }
              onChange={() => {
                setInviteError('');
                setInviteSuccess('');
              }}
            >
              {/* <FormLabel>Email</FormLabel> */}
              <Input
                placeholder="Enter email of the user"
                name="email"
                type={'email'}
              />
              {(inviteError || inviteSuccess) && (
                <FormHelperText>{inviteError || inviteSuccess}</FormHelperText>
              )}
            </FormControl>

            <Button size="sm" loading={inviteLoading} type="submit">
              Invite user
            </Button>
          </div>
        </form>

        <div>
          <Button size="sm" color="danger" variant="soft">
            Delete this organization
          </Button>
        </div>
      </div>
    </div>
  );
}
