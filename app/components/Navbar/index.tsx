'use client';
import styled from '@emotion/styled';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { EXTERNAL_THEME } from 'utils/ui';
import { OutlineButton, SolidButton } from '../Button';

const MENU_LIST = [
  { label: 'Use cases', link: '/' },
  {
    label: 'Blogs',
    link: '/',
  },
  {
    label: 'FAQ',
    link: 'faq',
  },
  {
    label: 'Contact us',
    link: 'contact',
  },
];

export default function Navbar() {
  const [atTop, setAtTop] = useState(false);
  const [active, setActive] = useState(false);
  const sidebarRef = useRef(null);
  const menuRef = useRef(null);

  const handleScroll = () => {
    if (window.scrollY <= 2) {
      setAtTop(true);
    } else {
      setAtTop(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (
        !sidebarRef.current?.contains(e.target) &&
        !menuRef.current?.contains(e.target)
      ) {
        setActive(false);
        // document.body.style.overflow = "auto";
      }
    });
  }, [sidebarRef, menuRef]);

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Root className={`${clsx({ atTop })} bg-white/50`}>
      <div
        className={`relative m-auto flex max-w-screen-2xl items-center justify-between px-3`}
      >
        <Link href="/">
          <div className="ml-10 lg:ml-0">
            <img src="/images/navbar/logo.svg" alt="" />
          </div>
        </Link>
        <div className="hidden lg:block">
          <div className="nav-lists flex gap-14">
            {MENU_LIST.map((i) => {
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
        <div className="flex gap-2 md:gap-5">
          <Link href="/login">
            <OutlineButton text="Login" />
          </Link>
          <Link href="signup">
            <SolidButton text="Signup" />
          </Link>
        </div>
        <div className={`sidebar-wrapper ${clsx({ active })}`} ref={sidebarRef}>
          <div className="flex flex-col">
            {MENU_LIST.map((i) => {
              return (
                <span className="mobile-menu my-2 inline-block px-2 py-1 text-center">
                  <Link
                    href={i.link}
                    onClick={() => {
                      setActive(false);
                    }}
                    className="p-3 text-lg font-medium text-white no-underline"
                  >
                    {i.label}
                  </Link>
                </span>
              );
            })}
          </div>
        </div>
        <div className="icon block overflow-hidden lg:hidden" ref={menuRef}>
          <div
            className={`menu-icon  text-3xl leading-[0]  ${clsx({
              active,
            })}`}
            onClick={() => {
              setActive(true);
            }}
          >
            <HiMenu />
          </div>
          <div
            className={`close-icon text-3xl leading-[0] ${clsx({
              active,
            })}`}
            onClick={() => {
              setActive(false);
            }}
          >
            <AiOutlineClose />
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
  box-shadow: 0px 2px 6px 6px rgba(0, 0, 0, 0.025);
  &.atTop {
    box-shadow: none;
  }
  .nav-lists {
    list-style: none;
  }

  & > div {
    height: ${EXTERNAL_THEME.navBarHeight}px;
  }

  .sidebar-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 500px;
    margin-top: ${EXTERNAL_THEME.navBarHeight}px;
    /* width: 250px; */
    height: 0;
    /* background-color: red; */
    background-color: #fff;
    background: linear-gradient(
      to bottom right,
      rgba(78, 86, 241, 0.98),
      rgba(157, 60, 255, 0.98)
    );
    border-radius: 2px;
    backdrop-filter: blur(10px);
    box-shadow: 0px 2px 16px 6px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    transition: all 0.4s;
    &.active {
      height: 208px;
      transition: all 0.4s;
    }
    .mobile-menu:first-child {
      background: linear-gradient(
        to bottom right,
        rgb(65, 73, 209),
        rgb(134, 48, 220)
      );
    }
  }
  .icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    height: 30px;
  }
  .menu-icon {
    /* left: 20; */
    transform: translateY(0);
    transition: all 0.4s;
    &.active {
      transform: translateY(-50px);
      /* left: -80px; */
      transition: all 0.4s;
    }
  }
  .close-icon {
    /* left: -80px; */
    transform: translateY(0);
    transition: all 0.4s;
    &.active {
      transform: translateY(-30px);
      /* left: 10px; */
      transition: all 0.4s;
    }
  }
`;
