"use client";

import React, { useState } from "react";

import { ShareIcon } from "lucide-react";

import { useChatStore } from "@/components/providers/chat-store-provider";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ChatShareLinkInputForm from "./chat-share-link-input-form";

const ChatShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sharePrivateSession = useChatStore(
    (state) => state.messages.length > 0,
  );

  return (
    <React.Fragment>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setIsOpen(true)}
          >
            <ShareIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Partager la session de chat</TooltipContent>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-full max-w-md p-6"
      >
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            {sharePrivateSession
              ? "Partager la session de chat"
              : "Partager chatvote"}
          </h2>
          <p className="text-muted-foreground text-sm">
            {sharePrivateSession
              ? "Toute personne disposant de ce lien peut voir cette session de chat."
              : "Partagez chatvote avec vos amis et votre famille."}
          </p>
        </div>

        <ChatShareLinkInputForm sharePrivateSession={sharePrivateSession} />
      </Modal>
    </React.Fragment>
  );
};

export default ChatShareButton;
