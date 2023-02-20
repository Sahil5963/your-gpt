'use client';

import { Typography } from '@mui/joy';
import React from 'react';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import { firebaseApp } from 'network/firebase';
import { log, logErr } from 'utils/helpers';
import { loginApi, socialLoginApi } from 'network/api/auth';
import { SocialLoginD } from 'types/auth';

let auth: any;

if (typeof window !== 'undefined') {
  auth = getAuth(firebaseApp);
}

export default function SocialLoginBtns() {
  const onLogin = async (type: SocialLoginD) => {
    try {
      let provider;

      switch (type) {
        case 'google':
          provider = new GoogleAuthProvider();
          break;
        case 'twitter':
          provider = new TwitterAuthProvider();
        case 'github':
          provider = new GithubAuthProvider();

        default:
          provider = new GoogleAuthProvider();
      }

      const result = await signInWithPopup(auth, provider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)

      console.log('REES', credential, token, user);

      const res = await socialLoginApi({
        email: user.email || '',
        firebase_uid: user.uid,
        name: user.displayName || '',
        type: type,
      });

      log('RES', res);
    } catch (err: any) {
      console.log('Err', err);
      // Handle Errors here.
      const errorCode = err?.code;
      const errorMessage = err?.message;
      // The email of the user's account used.
      const email = err?.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
  };

  const onGoogle = async () => {};
  const onGithub = async () => {};
  const onFacebook = async () => {};

  return (
    <div className="flex flex-col gap-2">
      <div className={itemS} onClick={() => onLogin('google')}>
        <img src="/images/svg/google.svg" className="h-7" />
        <Typography fontWeight={'md'}>Continue with Google</Typography>
      </div>
      <div className={itemS} onClick={() => onLogin('twitter')}>
        <img src="/images/svg/twitter.svg" className="h-7" />
        <Typography fontWeight={'md'}>Continue with Twitter</Typography>
      </div>
      <div className={itemS} onClick={() => onLogin('github')}>
        <img src="/images/svg/github.svg" className="h-7" />
        <Typography fontWeight={'md'}>Continue with Github</Typography>
      </div>
    </div>
  );
}

const itemS =
  'flex cursor-pointer items-center gap-3 rounded-md border border-solid border-gray-300 px-2 py-2 transition-all hover:gap-2 hover:bg-gray-200 justify-center';
