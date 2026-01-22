"use client";

import { useState } from "react";

import { track } from "@vercel/analytics/react";
import { toast } from "sonner";

import PartyCards from "@/components/party-cards";

import ChatGroupPartySelectSubmitButton from "./chat-group-party-select-submit-button";
import { ResponsiveDialogFooter } from "./responsive-drawer-dialog";

type Props = {
  selectedPartyIdsInStore?: string[];
  onNewChat?: (partyIds: string[]) => void;
  addPartiesToChat?: boolean;
};

export const MAX_SELECTABLE_PARTIES = 7;

function ChatGroupPartySelectContent({
  selectedPartyIdsInStore,
  onNewChat,
  addPartiesToChat,
}: Props) {
  const [selectedPartyIds, setSelectedPartyIds] = useState<string[]>(
    selectedPartyIdsInStore ?? [],
  );

  const handlePartyClicked = (partyId: string) => {
    if (selectedPartyIds.includes(partyId)) {
      setSelectedPartyIds((prev) => prev.filter((id) => id !== partyId));
      return;
    }

    if (selectedPartyIds.length >= MAX_SELECTABLE_PARTIES) {
      toast.error(
        `Vous ne pouvez sélectionner que ${MAX_SELECTABLE_PARTIES} partis maximum`,
      );
      return;
    }

    setSelectedPartyIds((prev) => {
      return [...prev, partyId];
    });
  };

  const handleNewChat = () => {
    track("chat_group_party_select_submit", {
      party_ids: selectedPartyIds.join(","),
    });
    onNewChat?.(selectedPartyIds);
  };

  return (
    <>
      <PartyCards
        className="px-4 pb-2 md:px-0 md:pb-0"
        onSelectParty={handlePartyClicked}
        selectedPartyIds={selectedPartyIds}
      />
      <ResponsiveDialogFooter className="pt-2">
        <ChatGroupPartySelectSubmitButton
          selectedPartyIds={selectedPartyIds}
          onSubmit={handleNewChat}
          addPartiesToChat={addPartiesToChat}
        />
      </ResponsiveDialogFooter>
    </>
  );
}

export default ChatGroupPartySelectContent;
