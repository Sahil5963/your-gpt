import {
  Autocomplete,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Typography,
} from '@mui/joy';
import { useAuth } from 'context/AuthContext';
import { getOrganisationApi } from 'network/api/organisation';
import { createProjectApi, getProjectsApi } from 'network/api/project';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { OrganisationItemD } from 'types/org';
import { ProjectItemD, ProjectTypeD } from 'types/project';
import { useDebouncedCallback } from 'use-debounce';
import { log } from 'utils/helpers';
import BackHeader from '../../components/BackHeader';
import ProjectMemebers from './ProjectMemebers';

export default function ProjectDetail({ projectId }: { projectId: any }) {
  const router = useRouter();
  const [loadingOrg, setLoadingOrg] = useState(false);
  const [organisations, setOrganisations] = useState<OrganisationItemD[]>([]);
  const [org, setOrg] = useState<OrganisationItemD | null>(null);
  const [orgId, setOrgId] = useState<number | null>(null);
  const [orgSearch, setOrgSearch] = useState('');
  const [creating, setCreating] = useState(false);
  const { token } = useAuth();
  const [updating, setUpdating] = useState(false);

  const [name, setName] = useState('');

  // const [orgInpuVal, setOrgInpuVal] = useState('');
  const [type, setType] = useState<ProjectTypeD>('basic');

  /**
   * UPDATE
   */

  useEffect(() => {
    if (orgId && organisations.length > 0) {
      // log(organisations.filter((i) => i.id === orgId)[0])
      setOrg(organisations.filter((i) => i.id === orgId)[0]);
    }
  }, [orgId, organisations]);

  const fillDetails = (res: ProjectItemD) => {
    setName(res.name);
    setType(res.type);
    setOrgId(res.organization_id);
  };

  const fetchDetail = useCallback(async () => {
    if (!projectId || !token) {
      return;
    }

    try {
      const res = await getProjectsApi({
        limit: 1,
        page: 1,
        projectId: 1,
        search: '',
        token,
      });
      log(res);

      if (res.type === 'RXSUCCESS') {
        fillDetails(res.data[5]);
      }
    } catch (err) {
      console.log('Err', err);
    }
  }, [projectId, token]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

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
    e?.target?.value && delaySearch(e.target.value);
  };

  const onSubmit = async (e) => {
    try {
      setCreating(true);
      const res = await createProjectApi({
        token,
        organization_id: org?.id.toString(),
        name,
        type,
      });

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
        <div className="item-start mb-6 flex">
          <div className="flex flex-1 items-center gap-3">
            <BackHeader title={projectId ? 'Edit Project' : 'Create Project'} />
          </div>

          <div className="self-start">
            <Button loading={updating}>Update</Button>
          </div>
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
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of your project"
              name="name"
            />
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

          <div className="my-4">
            <ProjectMemebers projectId={projectId} />
          </div>

          {!projectId && (
            <Button loading={creating} type="submit">
              Create App
            </Button>
          )}
        </form>

        <Button color="danger">Delete this project</Button>
      </div>
    </div>
  );
}
