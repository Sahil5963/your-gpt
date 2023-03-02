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
import BackHeader from 'app/components/dashboard/BackHeader';
import { appContent } from 'app/components/dashboard/variants/app';
import { useAuth } from 'context/AuthContext';
import { createProjectApi } from 'network/api/project';
import { getOrganisationApi } from 'network/api/organisation';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { OrganisationItemD } from 'types/org';
import { useDebouncedCallback } from 'use-debounce';
import { tv } from 'tailwind-variants';
import { ProjectTypeD } from 'types/project';

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

// const typeV = tv({
//   base:'p-4 flex items-center'
// })

export default function CreateProject() {
  const router = useRouter();
  const [loadingOrg, setLoadingOrg] = useState(false);
  const [organisations, setOrganisations] = useState<OrganisationItemD[]>([]);
  const [org, setOrg] = useState<OrganisationItemD | null>(null);
  const [creating, setCreating] = useState(false);
  const { token } = useAuth();
  // const [orgInpuVal, setOrgInpuVal] = useState('');
  const [orgSearch, setOrgSearch] = useState('');

  const [type, setType] = useState<ProjectTypeD>('basic');

  const fetchOrg = useCallback(async () => {
    let active = true;

    if (!token) {
      return;
    }

    try {
      setLoadingOrg(true);
      const res = await getOrganisationApi({
        limit: 10,
        page: 1,
        token,
        search: orgSearch,
      });
      setLoadingOrg(false);

      if (active) {
        console.log('RES', res);

        if (res.type === 'RXSUCCESS') {
          setOrganisations(res.data);

          // setOrg(res.data[0]);
        }
      }
    } catch (err) {
      setLoadingOrg(false);
      console.log('Err', err);
    }
    return () => {
      active = false;
    };
  }, [orgSearch, token]);

  useEffect(() => {
    fetchOrg();
  }, [fetchOrg]);

  const delaySearch = useDebouncedCallback(async (value) => {
    setOrgSearch(value);
  }, 300);

  const onOrgChange = (e) => {
    // setOrgInpuVal(e);

    // setLoadingOrg(true);

    e.target?.value && delaySearch(e.target.value);
  };

  useEffect(() => {}, []);

  const onSubmit = async (e) => {
    const name = e.currentTarget.elements.name?.value;

    try {
      setCreating(true);
      const res = await createProjectApi({
        token,
        organization_id: org?.id.toString(),
        name,
        type,
      });
      console.log('RES', res);

      if (res.type === 'RXSUCCESS') {
        router.push('/console/projects');
      }
      setCreating(false);
    } catch (err) {
      setCreating(false);
      console.log('Err', err);
    }
  };

  return (
    <div>
      <div className="">
        <div className="mb-6 flex items-center gap-3">
          <BackHeader title="Create Project" />
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
            <Input placeholder="Name of your project" name="name" />
          </FormControl>
          <FormControl required>
            <FormLabel>App type</FormLabel>

            <Select value={type} onChange={(e, v) => setType(v)} name="type">
              <Option value={'basic'}>Basic</Option>
              <Option value={'advance'}>Advance</Option>
            </Select>
          </FormControl>

          <FormControl required>
            <FormLabel>Select Organisation</FormLabel>

            <Autocomplete
              multiple={false}
              name="organisation"
              options={organisations}
              placeholder="Select oragnisation"
              loading={loadingOrg}
              value={org}
              onChange={(e, val: any) => {
                setOrg(val);
              }}
              onInputChange={onOrgChange}
              getOptionLabel={(option) => {
                return option.name;
              }}
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
