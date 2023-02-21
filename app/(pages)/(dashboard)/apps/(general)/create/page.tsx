'use client';
import {
  Autocomplete,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
} from '@mui/joy';
import { appContent } from 'app/components/variants/app';
import { useAuth } from 'context/AuthContext';
import { createAppApi } from 'network/api/app';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const ORG = [
  {
    id: 1,
    name: 'Default',
  },
  {
    id: 2,
    name: 'Primary',
  },
  {
    id: 3,
    name: 'Sulphur',
  },
  {
    id: 4,
    name: 'Zinc',
  },
];

export default function CreateApp() {
  const router = useRouter();
  const [loadingOrg, setLoadingOrg] = useState(false);
  const [organisations, setOrganisations] = useState<any[]>([]);
  const [org, setOrg] = useState(ORG[0]);
  const [creating, setCreating] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    setOrganisations(ORG);
  }, []);

  const onSubmit = async (e) => {
    const name = e.currentTarget.elements.name?.value;

    try {
      setCreating(true);
      const res = await createAppApi({
        token,
        organization_id: org.id.toString(),
        name,
      });
      console.log('RES', res);

      if (res.type === 'RXSUCCESS') {
        router.push('/apps');
      }
      setCreating(false);
    } catch (err) {
      setCreating(false);
      console.log('Err', err);
    }
  };

  const onOrgChange = (e) => {
    setLoadingOrg(true);
    setTimeout(() => {
      setOrganisations(ORG);
      setLoadingOrg(false);
    }, 3000);
  };

  return (
    <div>
      <div className="">
        <div className="mb-6 flex items-center gap-3">
          <IconButton
            color="neutral"
            onClick={() => {
              router.back();
            }}
          >
            <FaArrowLeft />
          </IconButton>
          <Typography level="h6">Create App</Typography>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
        >
          <FormControl required>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Name of your app" name="name" />
          </FormControl>

          <FormControl required>
            <FormLabel>Organisation</FormLabel>

            <Autocomplete
              name="organisation"
              options={organisations}
              placeholder="Select oragnisation"
              loading={loadingOrg}
              value={org}
              onChange={(e, val) => setOrg(val)}
              onInputChange={onOrgChange}
              getOptionLabel={(option) => option.name}
            />
          </FormControl>

          <Button loading={creating} type="submit">
            Create App
          </Button>
        </form>
      </div>
    </div>
  );
}
