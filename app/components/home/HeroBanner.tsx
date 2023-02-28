'use client';

import styled from '@emotion/styled';
import React from 'react';

const HeroBanner = () => {
  return (
    <Root className="fixed-container">
      <div className="mt-12 flex flex-col items-center justify-center gap-10">
        <h1 className="h1 text-center font-black">
          Develop Your Own{' '}
          <span className="h1-span text-gradient bg-gradient-to-r from-primaryGradient to-secondaryGradient">
            Personalised <br /> ChatGPT
          </span>{' '}
          like an Expert
        </h1>
        <p className="p1 max-w-3xl text-center font-light text-secondary">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
        <div>
          <img
            className="max-w-2xl"
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
