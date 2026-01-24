"use client";

import React, { useState } from "react";

import { Modal } from "@/components/ui/modal";

import ChatGroupPartySelectContent from "./chat-group-party-select-content";

type Props = {
  children: React.ReactNode;
  onNewChat?: (partyIds: string[]) => void;
  selectedPartyIdsInStore?: string[];
  addPartiesToChat?: boolean;
};

const ChatGroupPartySelect = ({
  children,
  onNewChat,
  selectedPartyIdsInStore,
  addPartiesToChat,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNewChat = (partyIds: string[]) => {
    setIsOpen(false);
    onNewChat?.(partyIds);
  };

  return (
    <React.Fragment>
      <div onClick={() => setIsOpen(true)}>{children}</div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-full max-w-lg p-6"
      >
        <div className="mb-4 text-left">
          <h2 className="text-lg font-semibold">Sélection des partis</h2>
          <p className="text-muted-foreground text-sm">
            {addPartiesToChat
              ? "Modifiez les partis sélectionnés."
              : "Sélectionnez jusqu'à sept partis avec lesquels vous souhaitez démarrer le chat."}
          </p>
        </div>
        <ChatGroupPartySelectContent
          selectedPartyIdsInStore={selectedPartyIdsInStore}
          onNewChat={handleNewChat}
          addPartiesToChat={addPartiesToChat}
        />
      </Modal>
    </React.Fragment>
  );
};

export default ChatGroupPartySelect;
