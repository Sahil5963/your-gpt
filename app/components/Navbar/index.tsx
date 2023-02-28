'use client';
import styled from '@emotion/styled';
import React from 'react';
import { OutlineButton, SolidButton } from '../Button';

const Navbar = () => {
  return (
    <Root>
      <div className="m-auto flex h-20 max-w-screen-2xl items-center justify-between bg-paperColor">
        <div>
          <img src="/images/navbar/logo.svg" alt="" />
        </div>
        <div>
          <ul className="nav-lists flex gap-14">
            <li className="text-primary font-semibold">Use cases</li>
            <li className="text-primary font-semibold">Blogs</li>
            <li className="text-primary font-semibold">FAQ</li>
            <li className="text-primary font-semibold">Contact us</li>
          </ul>
        </div>
        <div className='flex gap-5'>
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
};

export default Navbar;

const Root = styled.div`
  box-shadow: 0px 2px 12px 12px rgba(0, 0, 0, 0.02);
  .nav-lists {
    list-style: none;
  }
`;
