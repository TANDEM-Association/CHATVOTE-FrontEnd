'use client';

import { useChatStore } from '@/components/providers/chat-store-provider';
import { CircleAlertIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

function SocketDisconnectedBanner() {
  const isSocketConnected = useChatStore((state) => state.socket.connected);
  const t = useTranslations('chat');

  if (isSocketConnected === true || isSocketConnected === undefined)
    return null;

  return (
    <div className="flex items-center justify-center bg-red-500 py-2 text-center text-xs text-white">
      <CircleAlertIcon className="mr-2 size-4" />
      {t('socket-disconnected')}
    </div>
  );
}

export default SocketDisconnectedBanner;
