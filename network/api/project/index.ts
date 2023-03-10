import { post } from 'network';
import { ListingApiParams, SortD } from 'types';
import { ProjectTypeD } from 'types/project';

export const getProjectsApi = async ({
  token,
  ...raw
}: ListingApiParams & { projectId?: any }) => {
  return post({
    route: '/api/v1/getMyProjects',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
export const createProjectApi = async ({
  token,
  ...raw
}: {
  token: string;
  name: string;
  organization_id: string;
  type: ProjectTypeD;
}) => {
  return post({
    route: '/api/v1/createProject',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
export const updateProjectApi = async ({
  token,
  ...raw
}: {
  token: string;
  name: string;
  project_key: string;
}) => {
  return post({
    route: '/api/v1/updateProject',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
export const playgroundApi = async ({
  token,
  ...raw
}: {
  token: string;
  project_key: string;
  model: string;
  prompt: string;
  max_tokens: string;
  temprature: string;
}) => {
  return post({
    route: '/api/v1/basictuning/playground',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
