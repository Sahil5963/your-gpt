import { post } from 'network';

export const getFineTunesApi = async ({
  token,
  ...raw
}: {
  token: string;
  limit: number;
  page: number;
  search: string;
  project_key: string;
}) => {
  return post({
    route: '/api/v1/basictuning/getFineTunes',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
export const getFineTuneDetailApi = async ({
  token,
  ...raw
}: {
  token: string;
  project_key: string;
  id: string;
}) => {
  return post({
    route: '/api/v1/basictuning/getFineTuneDetail',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};

export const getAllModelsApi = async ({
  token,
  ...raw
}: {
  token: string;
  limit: number;
  page: number;
  search: string;
  project_key: string;
}) => {
  return post({
    route: '/api/v1/basictuning/getAllModels',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
