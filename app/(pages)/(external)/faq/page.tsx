'use client';

import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Textarea,
} from '@mui/joy';
import { externalAppContent } from 'app/components/variants';
import React, { useEffect, useState } from 'react';
import { FiAlignRight, FiArrowRight, FiChevronDown } from 'react-icons/fi';
import { ImSearch } from 'react-icons/im';
import { tv } from 'tailwind-variants';

const row = tv({
  base: 'flex gap-4 sm:flex-row flex-col',
});

const Item = ({ title = '', desc = '' }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="item  rounded-md border-solid border-black/5  transition-all hover:bg-gray-100">
      <div
        onClick={() => setShow((s) => !s)}
        className="flex cursor-pointer gap-2  py-4 px-4 text-base font-semibold sm:text-lg"
      >
        {title}
        <div className={`ml-auto flex  ${show ? 'rotate-6' : 'rotate-2'}`}>
          <FiChevronDown
            style={{ transform: show ? 'rotate(180deg' : '' }}
            className="transition-all"
          />
        </div>
      </div>

      {show && (
        <>
          <p className="m-0 p-4 pt-0 text-base text-black/60">{desc}</p>
        </>
      )}
    </div>
  );
};

export default function ContactUs() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="">
      <div style={{ background: 'var(--primary-gradient)' }}>
        <div className={externalAppContent()}>
          <div className="banner flex flex-col items-center justify-center py-8 sm:py-12">
            <div className="mb-4 text-center ">
              <h3 className="mt-0 mb-2 text-xl font-semibold text-white sm:text-2xl">
                Top questions about YourGPT
              </h3>
              <p className="text-sm text-white text-opacity-50 sm:text-base ">
                Need something cleared up? Here are our most frequently asked
                question
              </p>
            </div>

            <div className="relative m-auto flex items-center self-stretch sm:self-center  ">
              <div className="absolute left-5 flex aspect-square items-center  justify-center text-white/60">
                <ImSearch color="currentColor" size={20} />
              </div>
              <input
                type="text"
                placeholder="Enter your search...."
                className="color-white rounded-xl border-solid border-white/40 bg-white bg-opacity-0 px-4 py-2 pl-14 text-base  text-white  placeholder-white/40 outline-none  transition-all hover:border-opacity-60 hover:bg-opacity-10  hover:pl-12 focus:bg-opacity-10 sm:py-3"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={externalAppContent({
          class: 'py-12',
        })}
      >
        <div className="section">
          <div className="mb-4 text-lg font-semibold text-gray-400">
            #General
          </div>

          <div className="items flex flex-col gap-2">
            <Item
              title="What is YourGPT and how does it work?"
              desc="YourGPT is a subscription-based app that uses advanced AI technology powered by OpenAI to build a custom chatbot for your business. It works by ingesting your data and information, including your content and knowledgebases, and using this information to train a generative AI model that can respond to customer inquiries and perform various tasks. The result is a personalized AI-powered chatbot that is unique to your business and understands all the details of your products, services, and customers. With YourGPT, you can improve your customer support, lead generation, marketing automation, and other business processes in a more efficient and effective way."
            />
            <Item
              title="How does YourGPT use my data to build a custom chatGPT-type chatbot?"
              desc="YourGPT uses your data to build a custom chatbot by ingesting the information you provide into our system. This information can include your company’s knowledge base, product information, customer data, and other relevant content. Our AI algorithms then use this information to train a unique generative AI model specifically tailored to your needs. The result is a custom chatGPT-style bot that can have a deep understanding of your business and customers, allowing it to provide personalized and accurate responses to a wide range of inquiries. "
            />
            <Item
              title="How does YourGPT use my data to build a custom chatGPT-type chatbot?"
              desc="YourGPT uses your data to build a custom chatbot by ingesting the information you provide into our system. This information can include your company’s knowledge base, product information, customer data, and other relevant content. Our AI algorithms then use this information to train a unique generative AI model specifically tailored to your needs. The result is a custom chatGPT-style bot that can have a deep understanding of your business and customers, allowing it to provide personalized and accurate responses to a wide range of inquiries. "
            />
            <Item
              title="How does YourGPT use my data to build a custom chatGPT-type chatbot?"
              desc="YourGPT uses your data to build a custom chatbot by ingesting the information you provide into our system. This information can include your company’s knowledge base, product information, customer data, and other relevant content. Our AI algorithms then use this information to train a unique generative AI model specifically tailored to your needs. The result is a custom chatGPT-style bot that can have a deep understanding of your business and customers, allowing it to provide personalized and accurate responses to a wide range of inquiries. "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
