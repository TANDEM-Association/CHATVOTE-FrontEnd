import { HelpCircleIcon } from "lucide-react";

import HowToDialog from "@/components/how-to-dialog";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IS_EMBEDDED } from "@/lib/utils";

import ChatEmbedHeader from "./chat-embed-header";
import ChatHeaderTitleDescription from "./chat-header-title-description";
import ChatShareButton from "./chat-share-button";
import CreateNewChatDropdownButton from "./create-new-chat-dropdown-button";
import SocketDisconnectedBanner from "./socket-disconnected-banner";

async function ChatHeader() {
  if (IS_EMBEDDED) {
    return <ChatEmbedHeader />;
  }

  return (
    <>
      <header className="min-h-chat-header border-b-muted bg-background relative z-10 flex w-full items-center gap-1 border-b px-4">
        <div className="flex min-w-0 grow items-center gap-2 overflow-x-hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger />
            </TooltipTrigger>
            <TooltipContent>Menü öffnen</TooltipContent>
          </Tooltip>
          <ChatHeaderTitleDescription />
        </div>
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
    </>
  );
}

export default ChatHeader;
