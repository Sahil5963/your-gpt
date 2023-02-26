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
