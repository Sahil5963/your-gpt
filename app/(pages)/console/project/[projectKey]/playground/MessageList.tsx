import React from 'react';
import { tv } from 'tailwind-variants';
import { PlaygroundMessageItemD } from 'types/playground';
import { MessageItemD } from './page';
import AutoLinkText from 'react-autolink-text2';
import { HiUserCircle } from 'react-icons/hi';

const messageItem = tv({
  base: 'px-3 py-4  flex gap-2  items-start whitespace-pre-wrap break-words text-sm ',
  variants: {
    type: {
      sent: 'bg-transparent',
      get: ' bg-gray-100 rounded-lg',
    },
  },
});

export default function MessageList({ list = [] }: { list: MessageItemD[] }) {
  return (
    <div className="flex flex-col gap-2  p-4">
      {list.map((i, ind) => {
        return (
          <div
            className={messageItem({ type: i.sent ? 'sent' : 'get' })}
            style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
            key={ind}
          >
            {!i.sent ? (
              <div className="flex aspect-square h-5 items-center justify-center rounded-full bg-blue-600 p-1 text-sm text-white">
                AI
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-full  ">
                <HiUserCircle size={32} className="text-gray-600" />
              </div>
            )}

            <div className="py-1">
              <AutoLinkText
                text={i.sent ? i.text.trim() : i.choices[0]?.text.trim()}
                linkProps={{ target: '_blank' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
