import { SocialLoginD } from './auth';

export type loginApiResD = {
  id: number;
  name: string;
  email: string;
  username: string;
  firebase_uid: string;
  type: SocialLoginD;
  country: string;
  created_at: string;
  user_id: number;
  token: string;
};
