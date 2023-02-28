'use client';
import styled from '@emotion/styled';
import React from 'react';
import { appContent } from '../dashboard/variants/app';
import ArtificialIntelligence from '../icons/ArtificialIntelligence';
import ChatbotIcon from '../icons/ChatbotIcon';

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
    <Root className="bg-gradient-to-b from-primaryGradient to-secondaryGradient py-20">
      <div className={appContent()}>
        <div className="flex justify-between  gap-10">
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex flex-col gap-4">
              <h2 className="text-6xl font-normal text-white">
                We're <br /> here to help
              </h2>
              <p className="text-white/60">
                YourGPT is very easy to setup and use
              </p>
              <div>
                <div className="help-btn inline-flex cursor-pointer gap-2 transition-all hover:gap-3 ">
                  <img src="/images/home/power.svg" alt="" />
                  <button className="btn">Powered with ChatGPT</button>
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
              <p className="p1 text-lg text-white/60">YourGPT</p>
              <h4 className="mb-8 text-3xl font-semibold text-white">
                Use cases
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {CARD_DATA.map(({ src, label, text }) => {
                return (
                  <div className="card flex flex-col gap-4 border-solid border-white/10 p-7 ">
                    <div className="icon">{src}</div>
                    <div className="label font-semibold">{label}</div>
                    <p className="p2">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
    border-radius: 35px;
    cursor: pointer;
    .icon {
      width: 50px;
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
`;
