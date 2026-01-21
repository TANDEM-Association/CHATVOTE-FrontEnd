"use client";

import { GitCompareIcon } from "lucide-react";

import ChatGroupPartySelect from "@/components/chat/chat-group-party-select";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

function ChatSidebarGroupSelect() {
  const { setOpenMobile, isMobile } = useSidebar();

  const handleNewChat = () => {
    if (!isMobile) {
      return;
    }

    setOpenMobile(false);

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
        <Button
          className="border-border mt-4 w-full max-w-xl border whitespace-normal"
          variant="secondary"
        >
          <GitCompareIcon />
          Comparer les partis
        </Button>
      </ChatGroupPartySelect>
    </div>
  );
}

export default ChatSidebarGroupSelect;
