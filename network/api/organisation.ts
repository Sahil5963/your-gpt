import { post } from 'network';
import { SocialLoginD } from 'types/auth';
import { osName, deviceType } from 'react-device-detect';

export const getOrganisationApi = async ({
  token,
  limit,
  page,
}: {
  token: string;
  limit: number;
  page: number;
}) => {
  return post({
    route: '/api/v1/getMyOrganizations',
    data: JSON.stringify({ limit, page }),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
export const createOrganisationApi = async ({
  token,
  ...raw
}: {
  token: string;
  name: string;
}) => {
  return post({
    route: '/api/v1/createOrganization',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
export const addOrgMemberByHashApi = async ({
  token,
  ...raw
}: {
  token: string;
  hash: string;
}) => {
  return post({
    route: '/api/v1/addOrganizationMemeberViaHash',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
export const inviteOrgMemberApi = async ({
  token,
  ...raw
}: {
  token: string;
  email: string;
  role: string;
  organization_id: string;
}) => {
  return post({
    route: '/api/v1/inviteOrganizationMember',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
export const updateOrgApi = async ({
  token,
  ...raw
}: {
  token: string;
  name: string;
  organization_id: string;
}) => {
  return post({
    route: '/api/v1/updateOrganization',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};