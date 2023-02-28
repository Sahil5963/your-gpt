'use client';
import styled from '@emotion/styled';
import React from 'react';
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
      <div className="fixed-container">
        <div className="flex justify-between  gap-10">
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h2>
                We're <br /> here to help
              </h2>
              <p className="p2">YourGPT is very easy to setup and use</p>
              <div>
                <img src="/images/home/power.svg" alt="" />
                <button>Powered with ChatGPT</button>
              </div>
            </div>
            <div>
              <p className="p2">
                Looking for customised solution for your business ?
              </p>
              <a>Reach out to us</a>
            </div>
          </div>
          <div className="flex-[1.6]">
            <div>
              <p className="p1">YourGPT</p>
              <h3 className="">Use cases</h3>
            </div>
            <div className="grid grid-cols-2 gap-10">
              {CARD_DATA.map(({ src, label, text }) => {
                return (
                  <div className="card flex flex-col gap-4 p-7">
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
