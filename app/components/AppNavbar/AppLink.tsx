'use client';

import { useApp } from 'app/(pages)/(dashboard)/apps/[appId]/AppContext';
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
  const { appId } = useApp();

  return (
    <Link
      href={`/apps/${appId}/${href || ''}`}
      className={`${className} ${isActive ? 'text-white' : 'text-blue-400'}`}
    >
      {children}
    </Link>
  );
}
