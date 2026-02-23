import React from "react";

import Image from "next/image";
import Link from "next/link";

import { SidebarTrigger } from "@components/ui/sidebar";

const ChatDesktopSidebar = () => {
  return (
    <div className="hidden h-screen w-16 flex-none flex-col items-center overflow-hidden border-r border-purple-500 bg-purple-900 px-2 py-4 md:flex">
      <div className={"flex flex-col items-center"}>
        <Link href="https://tndm.fr" className="flex items-center">
          <Image
            src="/images/logos/tandem.svg"
            alt="tandem"
            width={0}
            height={0}
            sizes="100vw"
            className="size-12"
          />
        </Link>
        <SidebarTrigger />
      </div>
    </div>
  );
};

export default ChatDesktopSidebar;
