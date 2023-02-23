import { post } from 'network';
import { SocialLoginD } from 'types/auth';
import { osName, deviceType } from 'react-device-detect';

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

export const getAppsApi = async ({
  token,
  limit,
  page,
}: {
  token: string;
  limit: number;
  page: number;
}) => {
  return post({
    route: '/api/v1/getMyAllApps',
    data: JSON.stringify({ limit, page }),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
export const createAppApi = async ({
  token,
  ...raw
}: {
  token: string;
  name: string;
  organization_id: string;
}) => {
  return post({
    route: '/api/v1/createApp',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
