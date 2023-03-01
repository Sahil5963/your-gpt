import { post } from 'network';

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

export const contactApi = async (raw: {
  name: string;
  email: string;
  message: string;
  intrested_in: string;
  project_budget: string;
}) => {
  return post({
    route: '/api/v1/contact',
    data: JSON.stringify(raw),
    config: {
      headers: {
        'Content-type': 'application/json',
      },
    },
  });
};
