'use client';

import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function WahlSwiperTeaserTag() {
  const pathname = usePathname();

  if (pathname === '/swiper') return null;

  return (
    <Link
      href="/swiper"
      className="absolute inset-0 flex items-center justify-center gap-1 md:hidden text-xs rounded-full bg-indigo-600/20 hover:bg-indigo-600/30 transition-colors px-2 py-1.5 w-fit h-fit m-auto border border-indigo-600 dark:text-indigo-100 text-indigo-900"
    >
      <span className="relative flex size-2 mr-1">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-600 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-indigo-600" />
      </span>
      Wahl Swiper
      <ArrowRightIcon className="size-3" />
    </Link>
  );
}

export default WahlSwiperTeaserTag;
