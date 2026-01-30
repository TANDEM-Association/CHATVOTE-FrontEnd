'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import CreateNewChatDropdownButtonTrigger from './create-new-chat-dropdown-button-trigger';
import PartyCards from '../party-cards';

function CreateNewChatDropdownButton() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('chat');

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <CreateNewChatDropdownButtonTrigger
        onTriggerClick={() => setOpen(true)}
      />
      <DropdownMenuContent align="end" className="p-3 w-[80vw] max-w-[300px]">
        <div className="mb-2 flex flex-col">
          <h2 className="text-lg font-bold">{t('new-chat-title')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('new-chat-description')}
          </p>
        </div>
        <PartyCards
          gridColumns={3}
          selectable={false}
          onPartyClicked={() => setOpen(false)}
          showWahlChatButton
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CreateNewChatDropdownButton;
