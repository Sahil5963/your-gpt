'use client';

import { TextareaAutosize } from '@mui/base';
import {
  Autocomplete,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Typography,
} from '@mui/joy';
import { maxHeight } from '@mui/system';
import { appContent } from 'app/components/dashboard/variants/app';
import { THEME } from 'constants/ui';
import { useApp } from 'context/AppContext';
import { useAuth } from 'context/AuthContext';
import { playgroundApi } from 'network/api/project';
import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { log } from 'utils/helpers';
import MessageList from './MessageList';

export default function AppPlayground() {
  const [text, setText] = useState('');
  const { token } = useAuth();

  const { projectKey } = useApp();

  const [messages, setMessages] = useState<
    {
      id: number;
      text: string;
      sent: boolean;
    }[]
  >([
    {
      id: 1,
      sent: true,
      text: 'Hello',
    },
    {
      id: 2,
      sent: false,
      text: 'To learn more about slots and how to use them, check out the Slots page.',
    },
    {
      id: 3,
      sent: true,
      text: 'How are you feeling',
    },
  ]);

  const onSend = async () => {
    try {
      const res = await playgroundApi({
        token,
        prompt: text,
        max_tokens: '',
        model: '',
        name: '',
        project_key: projectKey,
        temprature: '0',
      });

      log(res);
    } catch (err) {
      console.log('Err', err);
    }

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
        })}  box-border flex overflow-hidden `}
      >
        <div
          className="left relative flex flex-1 flex-col overflow-hidden"
          style={{
            height: `calc(100vh - ${THEME.appNavbarHeight}px)`,
          }}
        >
          <div className=" flex-1 flex-col  overflow-auto">
            <div className="flex-1">
              <MessageList list={messages} />
            </div>

            <div className="flex h-44 w-full "></div>
          </div>

          {/* ACTIONBAR  */}
          <div
            className="absolute bottom-0 flex w-full flex-col gap-1"
            style={{
              background: `linear-gradient(360deg, rgba(255,255,255,1) 71%, rgba(255,255,255,0.7441570378151261) 90%, rgba(255,255,255,0) 100%)`,
            }}
          >
            <div className="self-center">
              <Button variant="soft" color="neutral" size="sm">
                Regenerate response
              </Button>
            </div>

            <div className="py-4 px-4">
              <div className="relative flex  items-center self-stretch">
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
                  autoFocus
                  className="w-full resize-none rounded-lg border-solid border-gray-200 border-r-gray-200 py-3 px-3 text-base shadow-md outline-none transition-all  active:border-gray-200"
                  style={{ fontFamily: 'inherit' }}
                />
                <div className="absolute right-3 text-gray-500">
                  <IoSend />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right  w-[280px] bg-gray-200 px-3 py-4">
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
