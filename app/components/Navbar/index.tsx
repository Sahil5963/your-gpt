'use client';
import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { EXTERNAL_THEME } from 'utils/ui';
import { OutlineButton, SolidButton } from '../Button';

export default function Navbar() {
  const [atTop, setAtTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY <= 2) {
      setAtTop(true);
    } else {
      setAtTop(false);
    }
  };

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Root className={clsx({ atTop })}>
      <div
        className={`m-auto flex max-w-screen-2xl items-center justify-between bg-white bg-opacity-95`}
      >
        <div>
          <img src="/images/navbar/logo.svg" alt="" />
        </div>
        <div className="hidden sm:block">
          <ul className="nav-lists flex gap-14">
            <li className="font-medium text-primary">Use cases</li>
            <li className="font-medium text-primary">Blogs</li>
            <li className="font-medium text-primary">FAQ</li>
            <li className="font-medium text-primary">Contact us</li>
          </ul>
        </div>
        <div className="flex gap-5">
          <div>
            <OutlineButton text="Login" />
          </div>
          <div>
            <SolidButton text="Signup" />
          </div>
        </div>
      </div>
    </Root>
  );
}

const Root = styled.div`
  position: sticky;
  top: 0px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 2px 6px 6px rgba(0, 0, 0, 0.02);
  &.atTop {
    box-shadow: none;
  }
  .nav-lists {
    list-style: none;
  }

  & > div {
    height: ${EXTERNAL_THEME.navBarHeight}px;
  }
`;
