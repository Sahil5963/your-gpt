import { post } from 'network';
import { SocialLoginD } from 'types/auth';
import { osName, deviceType } from 'react-device-detect';
import { SortD } from 'types';

export const subscribeApi = async ({ email }: { email: string }) => {
  return post({
    route: '/api/v1/subscribeMe',
    data: JSON.stringify({ email }),
    config: {
      headers: {
        'Content-type': 'application/json',
      },
    },
  });
};

export const getProjectsApi = async ({
  token,
  ...raw
}: {
  token: string;
  limit: number;
  page: number;
  orderBy?: SortD;
  search: string;
}) => {
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
