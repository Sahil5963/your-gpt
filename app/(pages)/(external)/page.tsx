'use client';

import Image from 'next/image';
import Lottie from 'lottie-react';

import aiAnim from '../../../assets/animations/chatbot4.json';

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black bg-opacity-90">
      <div className="flex  flex-col-reverse items-center justify-center gap-4 md:flex-row">
        <div className="left flex flex-1 flex-col justify-start">
          <div className="relative mb-8  flex  h-16 justify-start sm:h-24">
            <Image alt="Your GPT" src={'/images/svg/logo.svg'} fill />
          </div>
          <h2 className="mb-8 text-3xl font-bold leading-[3.2rem]  text-gray-50 sm:text-4xl sm:leading-[3.2rem]">
            Develop your personalised
            <br />
            <span className="font-extrabold text-[#9FE0FC]">ChatGPT</span> like
            an <span className="font-extrabold text-[#E07171]">Expert</span>
          </h2>

          <p className="mb-4 text-base text-gray-500 sm:text-2xl">
            Coming soon!
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('ERRR', e.target);
            }}
            className="flex w-full gap-2"
          >
            <input
              type="email"
              required
              className="flex-1 rounded-lg border border-transparent bg-white bg-opacity-10 py-3 px-4  text-white outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-500 px-6 text-white hover:bg-blue-600 "
            >
              Notify me
            </button>
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
