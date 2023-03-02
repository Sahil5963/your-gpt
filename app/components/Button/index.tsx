import styled from '@emotion/styled';
import React from 'react';

interface ButtonD {
  text: string;
}

export const OutlineButton = (props: ButtonD) => {
  const { text } = props;
  return (
    <OutlineBtn>
      <Button className="btn">
        <span className="outline-span bg-gradient">{text}</span>
      </Button>
    </OutlineBtn>
  );
};

export const SolidButton = (props: ButtonD) => {
  const { text } = props;
  return (
    <SolidBtn>
      <Button className="btn bg-gradient">
        <span className="solid-span">{text}</span>
      </Button>
    </SolidBtn>
  );
};

const Button = styled.button`
  padding: 0.8rem 2.4rem;
  outline: none;
  border: none;
  font-size: 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  @media screen and (max-width: 450px) {
    padding: 0.7rem 1.5rem;
  }
`;

const OutlineBtn = styled.div`
  .btn {
    position: relative;
    background-color: transparent;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      padding: 2px;
      border-radius: 8px;
      background: linear-gradient(180deg, #4e55f1 0%, #9d3cff 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
    .outline-span {
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
`;

const SolidBtn = styled.div`
  .btn {
    /* background: linear-gradient(180deg, #4e55f1 0%, #9d3cff 100%); */
    color: #ffffff;
  }
`;
