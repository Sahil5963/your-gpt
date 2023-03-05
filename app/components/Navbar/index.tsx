'use client';
import styled from '@emotion/styled';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { IoMdArrowBack, IoMdArrowRoundBack } from 'react-icons/io';
import { IoArrowBack } from 'react-icons/io5';
import { EXTERNAL_THEME } from 'utils/ui';
import { OutlineButton, SolidButton } from '../Button';

const MENU_LIST = [
  { label: 'Use cases', link: '/' },
  {
    label: 'Blogs',
    link: '/blogs',
  },
  {
    label: 'FAQ',
    link: '/faq',
  },
  {
    label: 'Contact us',
    link: '/contact',
  },
];

export default function Navbar() {
  const [atTop, setAtTop] = useState(false);
  const [active, setActive] = useState(false);
  const sidebarRef = useRef(null);
  const menuRef = useRef(null);
  const pathname = usePathname();
  // console.log(pathname, 'pathnameMM');

  const handleScroll = () => {
    if (window.scrollY <= 2) {
      setAtTop(true);
    } else {
      setAtTop(false);
    }
  };

  const openSidebar = () => {
    setActive(true);
    document.getElementById('mainContent')?.classList.add('main-offset');
    document.body.style.overflow = 'hidden';
  };
  const closeSidebar = () => {
    setActive(false);
    document.getElementById('mainContent')?.classList.remove('main-offset');
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (
        !sidebarRef.current?.contains(e.target) &&
        !menuRef.current?.contains(e.target)
      ) {
        closeSidebar();
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
    <>
      <Root
        className={`${clsx(
          { atTop },
          {
            active,
          },
        )} bg-white/50`}
      >
        <div
          className={`relative m-auto flex max-w-screen-2xl items-center justify-between px-4`}
        >
          <div className="ml-14 lg:ml-0">
            <Link href="/">
              <img src="/images/navbar/logo.svg" alt="" />
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="nav-lists flex gap-14">
              {MENU_LIST.map((i) => {
                return (
                  <Link
                    href={i.link}
                    className={`font-medium no-underline hover:text-black ${
                      pathname === i.link ? 'text-black' : 'text-primary'
                    }`}
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

          <div
            className={`menu-icon bg-gradient absolute flex aspect-square w-10 items-center justify-center rounded-md text-3xl leading-[0] text-white lg:hidden`}
            onClick={openSidebar}
            ref={menuRef}
          >
            <HiMenu />
          </div>
          {/* <div
            className={`menu-icon absolute flex aspect-square w-11 items-center justify-center bg-black/30 text-3xl leading-[0] lg:hidden`}
            onClick={openSidebar}
            ref={menuRef}
          >
            <HiMenu />
          </div> */}
        </div>
      </Root>
      <SidebarDiv
        className={`sidebar-wrapper z-30 ${clsx({ active })}`}
        ref={sidebarRef}
      >
        <div className="mt-10 flex justify-between px-10 text-right">
          <div>
            <Link href="/" onClick={closeSidebar}>
              <div>
                <img src="/images/navbar/sidebar-logo.svg" alt="" />
              </div>
            </Link>
          </div>
          <div
            className="inline-flex aspect-square w-10 items-center justify-center rounded-[8px] bg-white"
            onClick={closeSidebar}
          >
            <IoMdArrowRoundBack className="text-xl" />
          </div>
        </div>
        <div className="m-auto mt-8 flex max-w-[400px] flex-col px-10">
          {MENU_LIST.map((i) => {
            return (
              <Link
                href={i.link}
                onClick={closeSidebar}
                className={`my-1 inline-block rounded-xl px-2 py-3 text-center text-lg font-medium capitalize no-underline transition-all ${
                  pathname === i.link ? 'text-black' : 'text-white'
                } ${pathname === i.link ? 'bg-white/95' : 'bg-white/5'}`}
              >
                {i.label}
              </Link>
            );
          })}
        </div>
      </SidebarDiv>
    </>
  );
}

const Root = styled.div`
  position: sticky;
  z-index: 20;
  top: 0px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 2px 6px 6px rgba(0, 0, 0, 0.025);
  transition: all 0.4s;
  &.active {
    transform: translateX(calc(100vw - ${EXTERNAL_THEME.navBarHeight}px));
    transition: all 0.4s;
  }
  &.atTop {
    box-shadow: none;
  }
  .nav-lists {
    list-style: none;
  }

  & > div {
    height: ${EXTERNAL_THEME.navBarHeight}px;
  }
  .menu-icon {
    top: 50%;
    transform: translateY(-50%);
    left: 16px;
  }
`;

const SidebarDiv = styled.div`
  position: fixed;
  top: 0;
  left: calc(-100vw - ${EXTERNAL_THEME.navBarHeight}px);
  width: calc(100vw - ${EXTERNAL_THEME.navBarHeight}px);
  height: 100%;
  background-color: #fff;
  background: linear-gradient(to bottom, #4e55f1, #9d3cff);
  border-radius: 2px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 2px 16px 6px rgba(0, 0, 0, 0.04);
  /* overflow: hidden; */
  transition: all 0.4s;
  &.active {
    transition: all 0.4s;
    left: 0;
    /* transform: translateX(0); */
  }
`;
