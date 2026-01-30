'use client';
import { useEffect, useMemo } from 'react';
import { Button } from '../ui/button';
import { ResponsiveDialogClose } from './responsive-drawer-dialog';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

type Props = {
  selectedPartyIds: string[];
  onSubmit: () => void;
  addPartiesToChat?: boolean;
};

function ChatGroupPartySelectSubmitButton({
  selectedPartyIds,
  onSubmit,
  addPartiesToChat,
}: Props) {
  const t = useTranslations('chat');
  const router = useRouter();

  const navigateUrl = useMemo(() => {
    const searchParams = new URLSearchParams();
    selectedPartyIds.forEach((partyId) => {
      searchParams.append('party_id', partyId);
    });

    return `/session?${searchParams.toString()}`;
  }, [selectedPartyIds]);

  const handleSubmit = () => {
    onSubmit();
    if (!addPartiesToChat) router.push(navigateUrl);
  };

  useEffect(() => {
    if (!addPartiesToChat) router.prefetch(navigateUrl);
  }, [navigateUrl]);

  return (
    <ResponsiveDialogClose asChild>
      <Button className="w-full" onClick={handleSubmit}>
        {addPartiesToChat ? t('change-parties') : t('start-comparison-chat')}
      </Button>
    </ResponsiveDialogClose>
  );
}

export default ChatGroupPartySelectSubmitButton;
