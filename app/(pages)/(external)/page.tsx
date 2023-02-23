'use client';

import Image from 'next/image';
import Lottie from 'lottie-react';

import aiAnim from '../../../assets/animations/chatbot4.json';
import { useState } from 'react';
import { subscribeApi } from 'network/api/app';
import { Button, Input } from '@mui/joy';
import { FaCheck } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await subscribeApi({
        email,
      });
      setLoading(false);

      console.log('Set', res);
      // if (res.type === 'RXSUCCESS') {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setEmail('');
      }, 4000);

      // }
    } catch (err) {
      console.log('Err', err);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black bg-opacity-90">
      <div className="flex  flex-col-reverse items-center justify-center gap-4 md:flex-row">
        <div className="left flex flex-1 flex-col justify-start">
          <div className="relative mb-8  flex  h-16 justify-start sm:h-24">
            <Image alt="Your GPT" src={'/images/svg/logo-white.svg'} fill />
          </div>
          <h2 className="mb-8 text-3xl font-bold leading-[3.2rem]  text-gray-50 sm:text-4xl sm:leading-[3.2rem]">
            Develop your personalised
            <br />
            <span className="font-extrabold text-[#9FE0FC]">ChatGPT</span> like
            an <span className="font-extrabold text-[#E07171]">Expert</span>
          </h2>

          <p className="mb-4 text-base text-gray-500 sm:text-2xl">
            Subscribe for early access!
          </p>

          <form onSubmit={onSubmit} className="flex w-full gap-2">
            <Input
              type="email"
              required
              placeholder="Enter your email"
              sx={{ flex: 1 }}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
            <Button
              type="submit"
              startDecorator={success ? <FaCheck /> : null}
              color={success ? 'success' : 'primary'}
            >
              {success ? 'Subscribed' : 'Subscribe'}
            </Button>
          </form>
        </div>

        <div className="right flex  w-[200px] items-center justify-center sm:w-[400px]">
          <Lottie
            animationData={aiAnim}
            loop={true}
            className="flex h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
