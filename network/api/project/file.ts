import { post } from 'network';

export const getFilesApi = async ({
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
    route: '/api/v1/basictuning/getAllFiles',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
export const getFileDetailApi = async ({
  token,
  ...raw
}: {
  token: string;
  project_key: string;
  file_id: string;
}) => {
  return post({
    route: '/api/v1/basictuning/getFileDetail',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
