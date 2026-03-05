import React from "react";

import DonationDialog from "@components/donation-dialog";
import HowToDialog from "@components/guide-dialog";
import { LanguageSwitcher } from "@components/i18n/LanguageSwitcher";
import { Button } from "@components/ui/button";
import { SidebarTrigger } from "@components/ui/sidebar";
import { cn, IS_EMBEDDED } from "@lib/utils";
import { Heart, HelpCircleIcon } from "lucide-react";

import ChatEmbedHeader from "./chat-embed-header";
import CreateNewChatDropdownButton from "./create-new-chat-dropdown-button";
import SocketDisconnectedBanner from "./socket-disconnected-banner";
import { ThemeModeToggle } from "./theme-mode-toggle";

function ChatHeader() {
  if (IS_EMBEDDED) {
    return <ChatEmbedHeader />;
  }

  return (
    <React.Fragment>
      <header>
        <div
          className={
            "flex w-full items-center justify-between bg-purple-600 px-4 py-3"
          }
        >
          <div className={"text-sm"}>
            ChatVote est une initiative associative open source et souveraine -
            la fiabilité et traçablité de l’information fournie sont notre
            priorité. Pas d’historique conservé. Version. 1.0. Aidez-nous à
            aider la démocratie.
          </div>
          <Button data-sidebar="more" size="sm">
            <div>En savoir plus</div>
          </Button>
        </div>
        <div className="flex h-16 w-full flex-none items-center justify-between gap-1 px-4">
          {/* Left side - Logo, Home, Theme, Language, Sidebar Toggle */}
          <div className="flex items-center gap-1">
            <div className="block md:hidden">
              <SidebarTrigger className={"bg-primary"} />
            </div>
            <ThemeModeToggle />
            <LanguageSwitcher />
          </div>
          {/* Right side - Help, Share, New Chat */}
          <div className="flex items-center gap-1">
            <DonationDialog>
              <Button
                data-sidebar="donation"
                variant="secondary"
                size="icon"
                className={cn("size-10")}
              >
                <Heart />
              </Button>
            </DonationDialog>
            <HowToDialog>
              <Button variant="ghost" size="icon" className="size-8">
                <HelpCircleIcon />
              </Button>
            </HowToDialog>
            <CreateNewChatDropdownButton />
          </div>
        </div>

        <SocketDisconnectedBanner />
      </header>
    </React.Fragment>
  );
}

export default ChatHeader;
