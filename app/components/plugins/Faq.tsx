'use client';

import { Typography } from '@mui/joy';
import React, { useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { tv } from 'tailwind-variants';

const ITEMS = [
  {
    id: 1,
    text: '',
    sent: false,
  },
];

export default function FaqPlugin() {
  const [messages, setMessages] = useState<
    { id: number; text: string; sent: boolean }[]
  >([]);

  const [disable, setDisable] = useState(false);
  const inputRef = useRef<any>(null);

  const scrollRef = useRef();

  const messageItem = tv({
    base: 'py-2 px-4 rounded-2xl text-lg ',
    variants: {
      type: {
        sent: 'bg-gray-200 self-end',
        get: 'self-start bg-blue-600 text-white',
      },
    },
  });

  const onSend = (msg) => {
    setMessages((s) => [
      ...s,
      {
        id: Date.now(),
        sent: true,
        text: msg,
      },
    ]);
    setDisable(true);

    setTimeout(() => {
      setDisable(false);
      setMessages((s) => [
        ...s,
        {
          id: Date.now(),
          sent: false,
          text: 'Lorem ipsum is dummy text',
        },
      ]);
    }, 1000);
  };

  useEffect(() => {
    if (!disable) {
      inputRef.current?.focus();
    }
  }, [disable]);

  useEffect(() => {
    if (!scrollRef.current) return; // wait for the elementRef to be available
    const resizeObserver = new ResizeObserver(() => {
      console.log('RES', scrollRef.current);
      // Do what you want to do when the size of the element changes
    });
    resizeObserver.observe(scrollRef.current);
    // return () => resizeObserver.disconnect(); // clean up
  }, []);

  return (
    <div className="mx-auto flex h-screen max-w-[700px] flex-col overflow-hidden">
      <div className={`flex items-center gap-1 py-2 shadow-sm`}>
        <img src="/images/svg/demoLogo.svg" height={42} />
        <div className="font-bold">Com.pact</div>
      </div>
      <div className="flex-1 overflow-auto py-2" ref={scrollRef}>
        <div className="flex flex-col gap-2 py-4 ">
          {messages.map((i) => {
            return (
              <div className={messageItem({ type: i.sent ? 'sent' : 'get' })}>
                {i.text}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="relative flex">
          <textarea
            placeholder={
              disable ? 'Waiting for response ... ' : 'Enter your query'
            }
            ref={inputRef}
            disabled={disable}
            rows={2}
            name="message"
            style={{ fontFamily: 'inherit' }}
            className="h w-full   rounded-t-2xl border border-gray-300  bg-gray-100 p-4 pr-8 text-lg text-inherit transition-all hover:border-gray-500 focus:border-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend(e.target.value);
                e.target.value = '';
              }
            }}
          />
          <button className=" absolute right-2 top-2 flex aspect-square h-12 items-center justify-center rounded-full bg-blue-500 text-white">
            <FiSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
