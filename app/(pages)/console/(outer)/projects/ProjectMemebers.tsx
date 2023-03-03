import { IconButton, Table, Typography } from '@mui/joy';
import { useAuth } from 'context/AuthContext';
import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useDebounce } from 'use-debounce';
import ConfirmModal from '../../components/ConfirmModal';

export default function ProjectMemebers({ projectId }: { projectId: string }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [search, setsearch] = useState('');
  const [delaySearch] = useDebounce(search, 300);
  const [page, setPage] = useState(1);
  const { token } = useAuth();
  const [deleteId, setDeleteId] = useState('');
  const [deleting, setDeleting] = useState(false);

  const fetchList = async () => {
    if (!token || !projectId) {
      return;
    }

    try {
    } catch (err) {
      console.log('ERR', err);
    }
  };

  const onDelete = async () => {
    try {
    } catch (err) {
      console.log('Err', err);
    }
  };

  return (
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
              <IconButton color="danger" onClick={() => setDeleteId('1')}>
                <AiFillDelete />
              </IconButton>
            </td>
          </tr>
        </tbody>
      </Table>
      <ConfirmModal
        title="Remove this member"
        confirmTitle="Remove"
        danger
        open={deleteId ? true : false}
        onClose={() => setDeleteId('')}
        onConfirm={() => {}}
        loading={deleting}
      />
    </div>
  );
}
