"use client";

import React, { useState } from "react";

import { ShareIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

import ChatvoteSwiperShareLinkInputForm from "./chatvote-swiper-share-input-form";

const ChatvoteSwiperShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        <ShareIcon />
        Partager
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-full max-w-md p-6"
      >
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Partager le résultat du Swiper
          </h2>
          <p className="text-muted-foreground text-sm">
            Toute personne disposant de ce lien pourra voir ce résultat.
          </p>
        </div>

        <ChatvoteSwiperShareLinkInputForm />
      </Modal>
    </React.Fragment>
  );
};

export default ChatvoteSwiperShareButton;
