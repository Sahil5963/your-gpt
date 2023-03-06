'use client';

import styled from '@emotion/styled';
import { TextareaAutosize } from '@mui/base';
import {
  Alert,
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  ChipDelete,
  CircularProgress,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  LinearProgress,
  ListDivider,
  ListItemDecorator,
  Option,
  Select,
  Slider,
  Typography,
} from '@mui/joy';
import ModelSelect from 'app/(pages)/console/components/ModelSelect';
import { THEME } from 'constants/ui';
import { useApp } from 'context/AppContext';
import { useAuth } from 'context/AuthContext';
import { playgroundApi } from 'network/api/project';
import React, { useEffect, useRef, useState } from 'react';
import { IoClose, IoSend } from 'react-icons/io5';
import { ModelItemD } from 'types/model';
import MessageList from './MessageList';
import { PlaygroundMessageItemD } from 'types/playground';
import toast from 'react-hot-toast';
import { tv } from 'tailwind-variants';
import {
  BsFileEarmarkCheckFill,
  BsFillChatSquareTextFill,
} from 'react-icons/bs';
import { RiMenuAddLine } from 'react-icons/ri';
import { AiTwotoneEdit } from 'react-icons/ai';

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
  const [maxTokens, setMaxTokens] = useState(20);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [loadingModel, setLoadingModel] = useState(true);

  const { projectKey } = useApp();

  const [messages, setMessages] = useState<MessageItemD[]>([]);

  const [endSquences, setEndSquences] = useState<string[]>([]);

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
            height: `calc(100vh - ${
              THEME.appNavbarHeight + THEME.appNavbar2Height
            }px)`,
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
                  className="w-full  resize-none rounded-lg border-solid border-gray-200 border-r-gray-200 bg-gray-100 py-3 px-3 text-base shadow-md outline-none transition-all  active:border-gray-200"
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

        <div
          style={{
            height: `calc(100vh - ${
              THEME.appNavbarHeight + THEME.appNavbar2Height
            }px)`,
          }}
          className="right box-border w-[280px] overflow-y-auto border-l border-r-0 border-b-0 border-t-0 border-solid border-gray-300 px-3 py-4 pb-16"
        >
          <div className="mb-4">
            <Typography fontWeight={'lg'}>Settings</Typography>
          </div>

          <div className={itemsV()}>
            <div className={itemV()}>
              <div className={labelV()}>Mode</div>
              <Select
                size="sm"
                defaultValue="1"
                slotProps={{
                  listbox: {
                    sx: {
                      '--List-decorator-size': '24px',
                    },
                  },
                }}
                sx={{
                  '--List-decorator-size': '24px',
                }}
              >
                <Option value="1">
                  <ListItemDecorator>
                    <BsFileEarmarkCheckFill />
                  </ListItemDecorator>
                  Complete
                </Option>
                <Option value="2">
                  <ListItemDecorator>
                    <BsFillChatSquareTextFill />
                  </ListItemDecorator>
                  Chat
                </Option>
                <Option value="3">
                  <ListItemDecorator>
                    <RiMenuAddLine />
                  </ListItemDecorator>
                  Insert
                </Option>
                <Option value="4">
                  <ListItemDecorator>
                    <AiTwotoneEdit />
                  </ListItemDecorator>
                  Edit
                </Option>
              </Select>
            </div>

            <div className={itemV()}>
              <div className="flex justify-between">
                <div className={labelV()}>Choose Model</div>

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

            <div className={itemV({ class: 'group' })}>
              <div className="flex items-center justify-between">
                <div className={labelV()}>Temprature</div>
                <input
                  className={labelInputV()}
                  value={temprature}
                  onChange={(e) => {
                    setTemprature(Number(e.target.value));
                  }}
                  type={'number'}
                />
              </div>
              <div className="px-1">
                <Slider min={0.1} max={3} step={0.1} />
              </div>
            </div>
            <div className={itemV({ class: 'group' })}>
              <div className="flex items-center justify-between">
                <div className={labelV()}>Maximum length</div>
                <input className={labelInputV()} type={'number'} />
              </div>
              <div className="px-1">
                <Slider min={1} max={1000} step={1} />
              </div>
            </div>

            <div className={itemV()}>
              <div className={labelV()}>Max tokens</div>
              <Input
                size="sm"
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(Number(e.target.value))}
              />
            </div>

            {/* STOP SEQUENCES  */}
            <div className={itemV({ class: 'group' })}>
              <div className={labelV({ class: 'm-0' })}>Stop sequences</div>
              <p className={labelSmallV()}>Enter sequence and press Tab</p>
              <div className="flex items-start gap-[4px]">
                <div className=" flex max-h-[160px] flex-1 flex-wrap gap-1 overflow-auto rounded-lg border-solid border-gray-200 p-2 transition-all group-hover:border-gray-400 ">
                  <div className="flex flex-wrap gap-1">
                    {endSquences.map((i) => {
                      return (
                        <Chip
                          color="primary"
                          variant="soft"
                          endDecorator={
                            <ChipDelete
                              onDelete={() =>
                                setEndSquences((s) =>
                                  s.filter((i2) => i2 !== i),
                                )
                              }
                            />
                          }
                        >
                          {i}
                        </Chip>
                      );
                    })}
                  </div>

                  <input
                    className="border-none text-sm outline-none "
                    placeholder="Add end sequence"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setEndSquences((s) => [...s, e.target.value]);
                        e.target.value = '';
                      }

                      if (e.key === 'Backspace' && !e.target.value) {
                        setEndSquences((s) => {
                          const d = [...s];
                          d.pop();
                          return d;
                        });
                      }
                    }}
                  />
                </div>

                <IconButton
                  size="sm"
                  onClick={() => setEndSquences([])}
                  color="danger"
                  sx={{ borderRadius: 120 }}
                >
                  <IoClose />
                </IconButton>
              </div>
            </div>

            {/* TOP P  */}
            <div className={itemV({ class: 'group' })}>
              <div className="flex items-center justify-between">
                <div className={labelV()}>Top P</div>
                <input value={20} className={labelInputV()} type={'number'} />
              </div>
              <div className="px-1">
                <Slider min={1} max={1000} step={1} />
              </div>
            </div>

            {/* Frequency Penalty */}
            <div className={itemV({ class: 'group' })}>
              <div className="flex items-center justify-between">
                <div className={labelV()}>Frequency penalty</div>
                <input value={20} className={labelInputV()} type={'number'} />
              </div>
              <div className="px-1">
                <Slider min={1} max={1000} step={1} />
              </div>
            </div>

            {/* Presence Penalty */}
            <div className={itemV({ class: 'group' })}>
              <div className="flex items-center justify-between">
                <div className={labelV()}>Frequency penalty</div>
                <input value={20} className={labelInputV()} type={'number'} />
              </div>
              <div className="px-1">
                <Slider min={1} max={1000} step={1} />
              </div>
            </div>

            {/* Best of */}
            <div className={itemV({ class: 'group' })}>
              <div className="flex items-center justify-between">
                <div className={labelV()}>Best of</div>
                <input value={20} className={labelInputV()} type={'number'} />
              </div>
              <div className="px-1">
                <Slider min={1} max={1000} step={1} />
              </div>
            </div>

            {/* Inject start text */}
            <div className={itemV()}>
              <div className={labelV()}>Inject start text</div>
              <Input startDecorator={<Checkbox />} size="sm" type="text" />
            </div>

            {/* Inject restart text */}
            <div className={itemV()}>
              <div className={labelV()}>Inject restart text</div>
              <Input startDecorator={<Checkbox />} size="sm" type="text" />
            </div>

            {/* Show probabilities */}
            <div className={itemV()}>
              <div className={labelV()}>Show probabilities</div>
              <Select size="sm" placeholder="Choose one…" defaultValue={'Off'}>
                {['Off', 'Most likely', 'Least likely', 'Full specturm'].map(
                  (i) => {
                    return <Option value={i}>{i}</Option>;
                  },
                )}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const labelInputV = tv({
  base: 'border-transparent border active:border-blue-500 border-solid rounded-md outline-none text-sm p-1 w-6 group-hover:border-gray-400',
});
const labelV = tv({
  base: 'text-sm mb-1 font-semibold text-gray-600',
});
const labelSmallV = tv({
  base: 'text-xs mb-1  text-gray-400',
});
const itemsV = tv({
  base: 'items flex flex-col gap-4',
});
const itemV = tv({
  base: '',
});
