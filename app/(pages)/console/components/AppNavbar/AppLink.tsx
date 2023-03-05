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
  activeClassName,
}: {
  href: string | null;
  children: React.ReactNode;
  className: string;
  activeClassName: string;
}) {
  // Navigating to `/blog/hello-world` will return 'hello-world'
  // for the selected layout segment
  const segment = useSelectedLayoutSegment();

  const isActive = href === segment;
  const { projectKey } = useApp();

  return (
    <Link
      href={`/console/project/${projectKey}/${href || ''}`}
      className={`${className} rounded-md py-2 px-4 ${clsx({
        [activeClassName]: isActive,
      })}`}
    >
      {children}
    </Link>
  );
}
