"use client";

import React, { useState } from "react";

import { useChatStore } from "@components/providers/chat-store-provider";
import { Button } from "@components/ui/button";
import { Modal } from "@components/ui/modal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { ShareIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import ChatShareLinkInputForm from "./chat-share-link-input-form";

const ChatShareButton = () => {
  const t = useTranslations("chat.share");
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
        <TooltipContent>{t("shareSession")}</TooltipContent>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-full max-w-md p-6"
      >
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            {sharePrivateSession ? t("shareSession") : t("shareChatvote")}
          </h2>
          <p className="text-muted-foreground text-sm">
            {sharePrivateSession
              ? t("shareSessionDescription")
              : t("shareChatvoteDescription")}
          </p>
        </div>

        <ChatShareLinkInputForm sharePrivateSession={sharePrivateSession} />
      </Modal>
    </React.Fragment>
  );
};

export default ChatShareButton;
