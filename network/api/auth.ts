import { post } from 'network';
import { SocialLoginD } from 'types/auth';
import { osName, deviceType } from 'react-device-detect';

export const loginApi = async (raw: { email: string; password: string }) => {
  return post({
    route: '/api/v1/login',
    data: JSON.stringify(raw),
    config: {
      headers: {
        'Content-type': 'application/json',
      },
    },
  });
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
  source = osName,
  version = 1,
  device_info = deviceType,
  ...raw
}: {
  name: string;
  email: string;
  organization: 'myorg';
  password: 'Mypass';
  source?: string;
  version?: number;
  device_info?: string;
}) => {
  return post({
    route: '/api/v1/register',
    data: JSON.stringify({ source, version, device_info, ...raw }),
    config: {
      headers: {
        'Content-type': 'application/json',
      },
    },
  });
};
