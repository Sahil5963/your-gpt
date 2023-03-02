import React from 'react';
import { tv } from 'tailwind-variants';

const messageItem = tv({
  base: 'px-3 py-4  flex gap-2  items-center whitespace-pre',
  variants: {
    type: {
      sent: 'bg-transparent',
      get: ' bg-gray-100 rounded-lg',
    },
  },
});

export default function MessageList({ list = [] }: any) {
  return (
    <div className="flex flex-col gap-2  p-4">
      {list.map((i) => {
        return (
          <div className={messageItem({ type: i.sent ? 'sent' : 'get' })}>
            {!i.sent && (
              <div className="flex aspect-square h-5 items-center justify-center rounded-full bg-blue-600 p-1 text-sm text-white">
                AI
              </div>
            )}

            {i.sent
              ? i.text
              : `To learn more about slots and how to use them, check out the Slots page.`}
          </div>
        );
      })}
    </div>
  );
}
