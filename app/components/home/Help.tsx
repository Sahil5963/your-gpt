'use client';
import styled from '@emotion/styled';
import React from 'react';

const Help = () => {
  return (
    <Root className="bg-gradient-to-b from-primaryGradient to-secondaryGradient">
      <div className="fixed-container">
        <div className="flex justify-between gap-10">
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
          <div className="flex-[2]">
            <div>
              <p className="p1">YourGPT</p>
              <h3>Use cases</h3>
            </div>
            <div className="flex gap-5">
              <div className="card">
                <div className="icon">
                  <img className="img" src="/images/home/chatbot.svg" alt="" />
                </div>
                <div>Automated Chatbots</div>
                <p className="p2">
                  You can create chatbots using your personalised datasets and
                  utilize full potential of ChatGPT to scale automated learning
                </p>
              </div>

              <div className="transparent-card">
                <img src="/images/home/chatbot.svg" alt="" />
                <div>Automated Chatbots</div>
                <p className="p2">
                  You can create chatbots using your personalised datasets and
                  utilize full potential of ChatGPT to scale automated learning
                </p>
              </div>
            </div>
            <div className="transparent-card">
              <img src="/images/home/chatbot.svg" alt="" />
              <div>Automated Chatbots</div>
              <p className="p2">
                You can create chatbots using your personalised datasets and
                utilize full potential of ChatGPT to scale automated learning
              </p>
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
    background-color: #fff;
    padding: 2rem;
    .icon {
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      aspect-ratio: 1;
      background-color: rgba(100, 79, 245, 0.11);
      border-radius: 50%;
    }
  }
`;
