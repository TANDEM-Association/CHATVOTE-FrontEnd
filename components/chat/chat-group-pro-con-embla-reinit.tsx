'use client';

import { useCarousel } from '@/components/ui/carousel';
import { useChatStore } from '@/components/providers/chat-store-provider';
import { useEffect } from 'react';

type Props = {
  messageId: string;
  isExpanded: boolean;
};

function ChatGroupProConEmblaReinit({ messageId, isExpanded }: Props) {
  const embla = useCarousel();
  const isLoadingProConPerspective = useChatStore(
    (state) => state.loading.proConPerspective === messageId,
  );

  useEffect(() => {
    embla.api?.reInit();
  }, [embla.api, isLoadingProConPerspective, isExpanded]);

  return null;
}

export default ChatGroupProConEmblaReinit;
