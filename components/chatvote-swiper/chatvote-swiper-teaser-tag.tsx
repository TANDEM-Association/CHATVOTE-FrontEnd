"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArrowRightIcon } from "lucide-react";

const ChatvoteSwiperTeaserTag = () => {
  const pathname = usePathname();

  if (pathname === "/swiper") return null;

  return (
    <Link
      href="/swiper"
      className="absolute inset-0 m-auto flex h-fit w-fit items-center justify-center gap-1 rounded-full border border-indigo-600 bg-indigo-600/20 px-2 py-1.5 text-xs text-indigo-900 transition-colors hover:bg-indigo-600/30 md:hidden dark:text-indigo-100"
    >
      <span className="relative mr-1 flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-600 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-indigo-600" />
      </span>
      Chatvote Swiper
      <ArrowRightIcon className="size-3" />
    </Link>
  );
};

export default ChatvoteSwiperTeaserTag;
