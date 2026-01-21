"use client";

import { ShareIcon } from "lucide-react";

import { useChatStore } from "@/components/providers/chat-store-provider";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ChatShareLinkInputForm from "./chat-share-link-input-form";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "./responsive-drawer-dialog";

function ChatShareButton() {
  const sharePrivateSession = useChatStore(
    (state) => state.messages.length > 0,
  );

  return (
    <ResponsiveDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <ResponsiveDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ShareIcon />
            </Button>
          </ResponsiveDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Partager la session de chat</TooltipContent>
      </Tooltip>
      <ResponsiveDialogContent className="sm:max-w-md">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>
            {sharePrivateSession
              ? "Partager la session de chat"
              : "Partager chatvote"}
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            {sharePrivateSession
              ? "Toute personne disposant de ce lien peut voir cette session de chat."
              : "Partagez chatvote avec vos amis et votre famille."}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <div className="p-4 md:p-0">
          <ChatShareLinkInputForm sharePrivateSession={sharePrivateSession} />
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export default ChatShareButton;
