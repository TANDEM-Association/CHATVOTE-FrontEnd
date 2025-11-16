'use client';

import PartyCards from '@/components/party-cards';
import { useSidebar } from '@/components/ui/sidebar';

function SidebarNewChatButtons() {
  const { setOpenMobile } = useSidebar();

  const handleNewChat = () => {
    setOpenMobile(false);
  };

  return (
    <PartyCards
      gridColumns={3}
      selectable={false}
      showWahlChatButton
      onPartyClicked={handleNewChat}
    />
  );
}

export default SidebarNewChatButtons;
