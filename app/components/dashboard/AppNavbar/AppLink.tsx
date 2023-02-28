'use client';

import { useApp } from 'context/AppContext';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

// This *client* component will be imported into a blog layout
export default function AppLink({
  href,
  children,
  className,
}: {
  href: string | null;
  children: React.ReactNode;
  className: string;
}) {
  // Navigating to `/blog/hello-world` will return 'hello-world'
  // for the selected layout segment
  const segment = useSelectedLayoutSegment();

  const isActive = href === segment;
  const { projectId } = useApp();

  return (
    <Link
      href={`/projects/${projectId}/${href || ''}`}
      className={`${className} rounded-md py-2 px-4 ${clsx(
        { 'bg-blue-700  text-white': isActive },
        { 'bg-transparent text-blue-300': !isActive },
      )}`}
    >
      {children}
    </Link>
  );
}
