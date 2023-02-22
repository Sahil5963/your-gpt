'use client';

import { Typography } from '@mui/joy';
import { appContent } from 'app/components/variants/app';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillQuestionCircle, AiFillRobot } from 'react-icons/ai';
import { FaWeibo } from 'react-icons/fa';

const Item = ({
  link,
  icon,
  name,
}: {
  link: string;
  name: string;
  img?: any;
  icon?: any;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={`${pathname}/${link}`}
      className="flex gap-2 rounded-lg border-solid border-gray-200 bg-gray-100 px-3 py-3 text-gray-500 no-underline transition-all hover:gap-3 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-500"
    >
      <div>
        {/* <img src={img} /> */}

        {icon}
      </div>
      <div>
        <Typography level="h6" textColor={'inherit'}>
          {name}
        </Typography>
      </div>
    </Link>
  );
};

const PLUGINS = [
  {
    id: 1,
    link: 'faq',
    // img: '/images/svg/plug',
    icon: <AiFillQuestionCircle size={28} color="currentColor" />,
    name: 'FAQ',
  },
  {
    id: 1,
    link: 'faq',
    // img: '/images/svg/plug',
    icon: <AiFillRobot size={28} color="currentColor" />,
    name: 'Chatbot',
  },
  {
    id: 1,
    link: 'faq',
    // img: '/images/svg/plug',
    icon: <FaWeibo size={28} color="currentColor" />,
    name: 'External',
  },
];

export default function Plugins() {
  return (
    <div>
      <div className={appContent()}>
        <div className="mx-auto max-w-[600px]">
          <div className="mb-4 flex items-center gap-2">
            {/* <img src="/images/svg/plugin.svg" className="h-10" /> */}
            <Typography level="h6">Plugins</Typography>
          </div>

          <div className="grid grid-cols-3 gap-4 ">
            {PLUGINS.map((i) => {
              return <Item {...i} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
