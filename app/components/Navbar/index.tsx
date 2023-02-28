'use client';
import styled from '@emotion/styled';
import clsx from 'clsx';
import Link from 'next/link';
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
        className={`m-auto flex max-w-screen-2xl items-center justify-between bg-white/50`}
      >
        <div>
          <img src="/images/navbar/logo.svg" alt="" />
        </div>
        <div className="hidden sm:block">
          <div className="nav-lists flex gap-14">
            {[
              { label: 'Use cases', link: '/' },
              {
                label: 'Blogs',
                link: '/',
              },
              {
                label: 'FAQ',
                link: '/faq',
              },
              {
                label: 'Contact us',
                link: '/contact',
              },
            ].map((i) => {
              return (
                <Link
                  href={i.link}
                  className="font-medium text-primary no-underline hover:text-black "
                >
                  {i.label}
                </Link>
              );
            })}
          </div>
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
  z-index: 20;
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
