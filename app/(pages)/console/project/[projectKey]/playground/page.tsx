'use client';

import styled from '@emotion/styled';
import { TextareaAutosize } from '@mui/base';
import {
  Alert,
  Autocomplete,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  LinearProgress,
  Slider,
  Typography,
} from '@mui/joy';
import ModelSelect from 'app/(pages)/console/components/ModelSelect';
import { THEME } from 'constants/ui';
import { useApp } from 'context/AppContext';
import { useAuth } from 'context/AuthContext';
import { playgroundApi } from 'network/api/project';
import React, { useEffect, useRef, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { ModelItemD } from 'types/model';
import MessageList from './MessageList';
import { PlaygroundMessageItemD } from 'types/playground';
import toast from 'react-hot-toast';

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<any>();
  useEffect(() =>
    elementRef.current.scrollIntoView({
      behavior: 'smooth',
    }),
  );
  return <div ref={elementRef} />;
};

export type MessageItemD = PlaygroundMessageItemD & {
  sent?: boolean;
  text?: string;
};

export default function AppPlayground() {
  const [text, setText] = useState('');
  const { token } = useAuth();

  const [temprature, setTemprature] = useState(0.5);
  const [model, setModel] = useState<ModelItemD | null>(null);
  const [maxTokens, setMaxTokens] = useState(300);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [loadingModel, setLoadingModel] = useState(true);

  const { projectKey } = useApp();

  const [messages, setMessages] = useState<MessageItemD[]>([]);

  const onSend = async () => {
    try {
      if (loadingModel) {
        toast('Wait for models to load!', {
          icon: '🙏',
        });
        return;
      }

      setMessages((s): any => [
        ...s,
        {
          id: Date.now(),
          text: text,
          sent: true,
        },
      ]);
      setText('');

      setError('');
      setLoading(true);
      const res = await playgroundApi({
        token,
        prompt: text,
        max_tokens: maxTokens.toString(),
        model: model?.id,
        project_key: projectKey,
        temprature: temprature.toString(),
      });

      setLoading(false);

      if (res.type === 'RXSUCCESS') {
        setMessages((s) => [...s, res.data]);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong');
      console.log('Err', err);
    }

    // setTimeout(() => {
    //   setMessages((s) => [
    //     ...s,
    //     {
    //       id: Date.now(),
    //       text: '',
    //       sent: false,
    //     },
    //   ]);
    // }, 600);
  };

  return (
    <div className="flex-1">
      <div className="box-border flex overflow-hidden">
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

            <AlwaysScrollToBottom />
          </div>

          {/* ACTIONBAR  */}
          <div
            className="absolute bottom-0 flex w-full flex-col gap-1"
            style={{
              background: `linear-gradient(360deg, rgba(255,255,255,1) 71%, rgba(255,255,255,0.7441570378151261) 90%, rgba(255,255,255,0) 100%)`,
            }}
          >
            <div className=" py-2 px-2 pt-6">
              {error && (
                <Alert variant="soft" size="sm" sx={{ mb: 1 }} color="danger">
                  {error}
                </Alert>
              )}
              {loading && <LinearProgress sx={{ borderRadius: 0 }} />}

              <div className="relative flex  items-start self-stretch">
                <TextareaAutosize
                  disabled={loading}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      onSend();
                    }
                  }}
                  maxRows={4}
                  minRows={4}
                  autoFocus
                  placeholder="Type here..."
                  className="w-full  resize-none rounded-lg border-solid border-gray-200 border-r-gray-200 py-3 px-3 text-base shadow-md outline-none transition-all  active:border-gray-200"
                  style={{ fontFamily: 'inherit' }}
                />
                <div
                  className="group absolute right-3 mt-2 flex aspect-square h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-blue-500 text-white/90 text-gray-500 transition-all hover:bg-blue-600 hover:text-white"
                  onClick={onSend}
                >
                  <div className="group-hover:animate-slideRight">
                    <IoSend />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SettingRoot className="right  w-[280px] border-l border-r-0 border-b-0 border-t-0 border-solid border-gray-300 px-3 py-4">
          <div className="mb-4">
            <Typography fontWeight={'lg'}>Settings</Typography>
          </div>

          <div className="items flex flex-col gap-2">
            <div>
              <div className="flex justify-between">
                <div className="label text-sm">Choose Model</div>

                {loadingModel && <CircularProgress size="sm" sx={{ p: 1 }} />}
              </div>

              <ModelSelect
                value={model}
                onLoadStart={() => {
                  setLoadingModel(true);
                }}
                onChange={(val: any) => {
                  setLoadingModel(false);
                  setModel(val);
                }}
              />
            </div>

            <div className="item">
              <div className="flex items-center justify-between">
                <div className="label text-sm">Temprature</div>
                <div>
                  <Input
                    value={temprature}
                    onChange={(e) => {
                      setTemprature(Number(e.target.value));
                    }}
                    type={'number'}
                    sx={{ width: 60 }}
                    variant="outlined"
                    size="sm"
                  />
                </div>
              </div>
              <div className="px-2">
                <Slider min={0.1} max={3} step={0.1} valueLabelDisplay="auto" />
              </div>
            </div>

            <div className="item">
              <div className="label text-sm">Max tokens</div>
              <Input
                size="sm"
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(Number(e.target.value))}
              />
            </div>
          </div>
        </SettingRoot>
      </div>
    </div>
  );
}

const SettingRoot = styled.div``;
