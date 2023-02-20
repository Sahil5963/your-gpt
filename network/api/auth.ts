import { post } from 'network';
import { SocialLoginD } from 'types/auth';
import { osName, deviceType } from 'react-device-detect';

export const loginApi = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  // return post({ route: 'z' });
};
export const socialLoginApi = async ({
  source = osName,
  version = 1,
  device_info = deviceType,
  ...raw
}: {
  name?: string;
  email: string;
  firebase_uid: string;
  fcm_token?: string;
  type: SocialLoginD;
  source?: string;
  version?: number;
  device_info?: string;
}) => {
  return post({
    route: '/api/v1/socialLogin',
    data: JSON.stringify({ source, version, device_info, ...raw }),
    config: {
      headers: {
        'Content-type': 'application/json',
      },
    },
  });
};

export const signupApi = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  // return post({ route: 'z' });
};
