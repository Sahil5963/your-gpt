'use client';

import styled from '@emotion/styled';
import React from 'react';
import { externalAppContent } from '../variants';

const HeroBanner = () => {
  return (
    <Root className={externalAppContent()}>
      <div className="mt-12 flex flex-col items-center justify-center gap-10">
        <h1 className="text-center text-3xl font-black md:text-5xl">
          Develop Your Own{' '}
          <span className="h1-span text-gradient bg-gradient-to-r from-primaryGradient to-secondaryGradient">
            Personalised <br className="hidden md:block" /> ChatGPT
          </span>{' '}
          like an Expert
        </h1>
        <p className="max-w-3xl text-center text-lg font-light text-secondary">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
        <div>
          <img
            className="max-w-full lg:max-w-2xl"
            src="/images/home/hero-banner.png"
            alt="hero image"
          />
        </div>
      </div>
    </Root>
  );
};

export default HeroBanner;

const Root = styled.div``;
