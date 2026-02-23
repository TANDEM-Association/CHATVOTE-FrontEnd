import React from "react";

import Image from "next/image";
import Link from "next/link";

import HowToDialog from "@components/guide-dialog";
import { LanguageSwitcher } from "@components/i18n/LanguageSwitcher";
import { Button } from "@components/ui/button";
import { SidebarTrigger } from "@components/ui/sidebar";
import { IS_EMBEDDED } from "@lib/utils";
import { HelpCircleIcon } from "lucide-react";

import ChatEmbedHeader from "./chat-embed-header";
import ChatHeaderHomeButton from "./chat-header-home-button";
import CreateNewChatDropdownButton from "./create-new-chat-dropdown-button";
import SocketDisconnectedBanner from "./socket-disconnected-banner";
import { ThemeModeToggle } from "./theme-mode-toggle";

async function ChatHeader() {
  if (IS_EMBEDDED) {
    return <ChatEmbedHeader />;
  }

  return (
    <React.Fragment>
      <header className="flex h-12 w-full items-center justify-between gap-1 px-4">
        {/* Left side - Logo, Home, Theme, Language, Sidebar Toggle */}
        <div className="flex items-center gap-1">
          <Link href="/" className="mr-2 flex items-center">
            <Image
              src="/images/logos/chatvote.svg"
              alt="chatvote"
              width={0}
              height={0}
              sizes="100vw"
              className="size-6"
            />
          </Link>
          <ThemeModeToggle />
          <LanguageSwitcher />
          <ChatHeaderHomeButton />
          <SidebarTrigger />
        </div>

        {/* Right side - Help, Share, New Chat */}
        <div className="flex items-center gap-1">
          <HowToDialog>
            <Button variant="ghost" size="icon" className="size-8">
              <HelpCircleIcon />
            </Button>
          </HowToDialog>
          <CreateNewChatDropdownButton />
        </div>
      </header>

      <SocketDisconnectedBanner />
    </React.Fragment>
  );
}

export default ChatHeader;
