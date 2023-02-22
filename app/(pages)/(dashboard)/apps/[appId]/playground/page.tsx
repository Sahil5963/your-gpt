'use client';

import { TextareaAutosize } from '@mui/base';
import {
  Autocomplete,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Typography,
} from '@mui/joy';
import { maxHeight } from '@mui/system';
import { appContent } from 'app/components/variants/app';
import { THEME } from 'constants/ui';
import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import MessageList from './MessageList';

export default function AppPlayground() {
  const [text, setText] = useState('');

  const [messages, setMessages] = useState<
    {
      id: number;
      text: string;
      sent: boolean;
    }[]
  >([]);

  const onSend = () => {
    setMessages((s) => [
      ...s,
      {
        id: Date.now(),
        text: text,
        sent: true,
      },
    ]);

    setText('');

    setTimeout(() => {
      setMessages((s) => [
        ...s,
        {
          id: Date.now(),
          text: '',
          sent: false,
        },
      ]);
    }, 600);
  };

  return (
    <div className="flex-1">
      <div
        className={`${appContent({
          padding: 'noY',
          class: 'py-2',
        })}  box-border grid gap-2`}
        style={{
          height: `calc(100vh - ${THEME.appNavbarHeight}px)`,
          gridTemplateColumns: '1fr min-content',
          gridTemplateRows: '1fr min-content',
        }}
      >
        <div className="left col-start-1 col-end-2 flex flex-1 flex-col gap-2 overflow-auto ">
          <div className="flex-1 rounded-lg bg-gray-100 ">
            <MessageList list={messages} />
          </div>
        </div>
        <div className="flex gap-1">
          <TextareaAutosize
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            maxRows={3}
            className="flex-1 resize-none rounded-md border-solid border-gray-200 border-r-gray-200 py-2 px-2 text-base shadow-md transition-all focus:border-blue-500"
            style={{ fontFamily: 'inherit' }}
          />

          <IconButton>
            <IoSend />
          </IconButton>
        </div>
        <div className="right col-start-2 row-span-2 row-start-1 w-[280px] rounded-lg bg-gray-200 px-3 py-4">
          <div>
            <Typography fontWeight={'lg'}>Settings</Typography>
          </div>

          <FormControl size="sm">
            <FormLabel>Choose Index</FormLabel>
            <Autocomplete options={['Option 1', 'Option 2']} />
          </FormControl>
        </div>
      </div>
    </div>
  );
}
