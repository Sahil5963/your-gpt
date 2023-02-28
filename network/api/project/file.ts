import { post } from 'network';

export const getProjectFilesApi = async ({
  token,
  ...raw
}: {
  token: string;
  limit: number;
  page: number;
  search: string;
  project_id: string;
}) => {
  return post({
    route: '/api/v1/getProjectFiles',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
