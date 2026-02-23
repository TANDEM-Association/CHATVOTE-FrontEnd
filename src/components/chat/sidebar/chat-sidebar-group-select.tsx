"use client";

import ChatGroupPartySelect from "@components/chat/chat-group-party-select";
import { Button } from "@components/ui/button";
import { useSidebar } from "@components/ui/sidebar";
import { GitCompareIcon } from "lucide-react";

function ChatSidebarGroupSelect() {
  const { setOpen } = useSidebar();

  const handleNewChat = () => {
    setOpen(false);

    // hacky fix since the sidebar collides with the drawer's pointer events settings
    setTimeout(() => {
      if (document) {
        document.body.style.pointerEvents = "auto";
      }
    }, 500);
  };

  return (
    <div className="w-full">
      <ChatGroupPartySelect onNewChat={handleNewChat}>
        <Button className="mt-4 w-full max-w-xl whitespace-normal">
          <GitCompareIcon />
          Comparer les partis
        </Button>
      </ChatGroupPartySelect>
    </div>
  );
}

export default ChatSidebarGroupSelect;
