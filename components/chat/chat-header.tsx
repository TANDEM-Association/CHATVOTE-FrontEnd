import React from "react";

import Image from "next/image";
import Link from "next/link";

import { HelpCircleIcon, HomeIcon } from "lucide-react";

import HowToDialog from "@/components/how-to-dialog";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { IS_EMBEDDED } from "@/lib/utils";

import ChatEmbedHeader from "./chat-embed-header";
import ChatShareButton from "./chat-share-button";
import CreateNewChatDropdownButton from "./create-new-chat-dropdown-button";
import SocketDisconnectedBanner from "./socket-disconnected-banner";
import { ThemeModeToggle } from "./theme-mode-toggle";

async function ChatHeader() {
  if (IS_EMBEDDED) {
    return <ChatEmbedHeader />;
  }

  return (
    <React.Fragment>
      <header className="border-b-muted bg-background sticky top-0 z-10 flex h-12 w-full shrink-0 items-center justify-between gap-1 border-b px-4">
        {/* Left side - Logo, Home, Theme, Sidebar Toggle */}
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
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="size-8"
            tooltip="Page d'accueil"
          >
            <Link href="/">
              <HomeIcon className="size-4" />
            </Link>
          </Button>
          <SidebarTrigger />
        </div>

        {/* Right side - Help, Share, New Chat */}
        <div className="flex items-center gap-1">
          <HowToDialog>
            <Button variant="ghost" size="icon" className="size-8">
              <HelpCircleIcon />
            </Button>
          </HowToDialog>
          <ChatShareButton />
          <CreateNewChatDropdownButton />
        </div>
      </header>

      <SocketDisconnectedBanner />
    </React.Fragment>
  );
}

export default ChatHeader;
