'use client';

import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black bg-opacity-95">
      <div>
        <div className=" relative mb-8 h-28 ">
          <Image alt="Your GPT" src={'/images/svg/logo.svg'} fill />
        </div>

        <h2 className="mb-8 text-4xl font-medium  text-gray-50">
          Develop your personalised{' '}
          <span className="font-bold text-blue-600">ChatGPT</span> like an{' '}
          <span className="font-bold text-orange-400">Expert</span>
        </h2>

        <p className="mb-4 text-center text-2xl text-gray-500">Coming soon!</p>

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
            className="flex-1 rounded-lg  border border-transparent bg-white bg-opacity-10 py-4 px-4 text-xl text-white outline-none focus:border-blue-500"
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
    </div>
  );
}
