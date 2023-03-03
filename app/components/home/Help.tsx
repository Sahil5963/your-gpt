'use client';
import styled from '@emotion/styled';
import React from 'react';
import ArtificialIntelligence from '../icons/ArtificialIntelligence';
import ChatbotIcon from '../icons/ChatbotIcon';
import { externalAppContent } from '../variants';

const CARD_DATA = [
  {
    id: 1,
    src: <ChatbotIcon />,
    label: 'Automated Chatbots',
    text: 'You can create chatbots using your personalised datasets and utilize full potential of ChatGPT to scale automated learning',
  },
  {
    id: 2,
    src: <ArtificialIntelligence />,
    label: 'Automated Chatbots',
    text: 'You can create chatbots using your personalised datasets and utilize full potential of ChatGPT to scale automated learning',
  },
  {
    id: 3,
    src: <ArtificialIntelligence />,
    label: 'Automated Chatbots',
    text: 'You can create chatbots using your personalised datasets and utilize full potential of ChatGPT to scale automated learning',
  },
];

const Help = () => {
  return (
    <Root className="relative bg-gradient-to-b from-primaryGradient to-secondaryGradient py-10 md:py-20">
      <div className={externalAppContent()}>
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="relative z-[1] flex flex-1 flex-col justify-between">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl font-normal text-white md:text-6xl">
                We're <br /> here to help
              </h2>
              <p className="text-white/60">
                YourGPT is very easy to setup and use
              </p>
              <div>
                <div className="help-btn group mb-4 inline-flex cursor-pointer gap-2 transition-all hover:gap-3 md:mb-0">
                  <img
                    src="/images/home/power.svg"
                    alt=""
                    className="group-hover:animate-slideRight"
                  />
                  <button className="btn cursor-pointer">
                    Powered with ChatGPT
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p className="text-white/70">
                Looking for customised solution for your business ?
              </p>
              <a className="inline-block pt-4 text-white underline">
                Reach out to us
              </a>
            </div>
          </div>
          <div className="flex-[1.6]">
            <div>
              <p className="text-lg text-white/60">YourGPT</p>
              <h4 className="mb-8 text-3xl font-semibold text-white">
                Use cases
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:gap-6">
              {CARD_DATA.map(({ src, label, text }) => {
                return (
                  <div className="card flex flex-col gap-2 rounded-2xl border border-solid border-white/10 p-4 md:rounded-[35px] md:p-5 lg:gap-4 xl:p-7">
                    <div className="icon w-[44px] md:w-[50px]">{src}</div>
                    <div className="label text-lg font-semibold md:text-xl">
                      {label}
                    </div>
                    <p className="p2 text-base md:text-lg">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="brain-img pointer-events-none absolute z-0">
        <img
          className="max-w-[80%] xl:max-w-full"
          src="/images/home/brain.png"
          alt="brain image"
        />
      </div>
    </Root>
  );
};

export default Help;

const Root = styled.div`
  .help-btn {
    background-color: #faff0a;

    padding: 0.5rem 1rem;
    border-radius: 10px;
    .btn {
      outline: none;
      border: none;
      background-color: inherit;
      color: #000;
      font-weight: 600;
    }
  }
  .card {
    cursor: pointer;
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.11);
      color: #fff;
      aspect-ratio: 1;
      border-radius: 50%;
    }
    .label {
      color: #fff;
    }
    .p2 {
      color: rgba(255, 255, 255, 0.6);
    }
    &:hover {
      background-color: #fff;
      transition: all 0.4s;
      .icon {
        background-color: rgba(100, 79, 245, 0.11);
        color: #4e55f1;
        transition: all 0.2s;
      }
      .label {
        color: #000;
        transition: all 0.2s;
      }
      .p2 {
        color: rgba(0, 0, 0, 0.4);
        transition: all 0.2s;
      }
    }
  }
  .brain-img {
    left: -610px;
    top: -29%;
    height: 100%;
    width: 90%;
    opacity: 12%;
    @media screen and (max-width: 1279px) {
      left: -48%;
      left: -38%;
      top: -4%;
    }
  }
`;
