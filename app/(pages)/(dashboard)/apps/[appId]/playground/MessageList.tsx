import React from 'react';
import { tv } from 'tailwind-variants';

const messageItem = tv({
  base: 'px-3 py-3 bg-gray-200 rounded-xl max-w-[60%]',
  variants: {
    type: {
      sent: 'self-start',
      get: 'bg-blue-600 text-white self-end',
    },
  },
});

export default function MessageList({ list = [] }: any) {
  return (
    <div className="flex flex-col gap-1 p-4 ">
      {list.map((i) => {
        return (
          <div className={messageItem({ type: i.sent ? 'sent' : 'get' })}>
            {i.sent
              ? i.text
              : `To learn more about slots and how to use them, check out the Slots page.`}
          </div>
        );
      })}
    </div>
  );
}
