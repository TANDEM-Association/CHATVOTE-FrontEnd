import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import ChatShareButton from './chat-share-button';
import SocketDisconnectedBanner from './socket-disconnected-banner';
import CreateNewChatDropdownButton from './create-new-chat-dropdown-button';
import ChatHeaderTitleDescription from './chat-header-title-description';
import { Button } from '@/components/ui/button';
import { HelpCircleIcon } from 'lucide-react';
import HowToDialog from '@/components/how-to-dialog';
import { IS_EMBEDDED } from '@/lib/utils';
import ChatEmbedHeader from './chat-embed-header';
import { useTranslations } from 'next-intl';

function ChatHeader() {
  const t = useTranslations('navigation');
  if (IS_EMBEDDED) {
    return <ChatEmbedHeader />;
  }

  return (
    <>
      <header className="relative z-10 flex min-h-chat-header w-full items-center gap-1 border-b border-b-muted bg-background px-4">
        <div className="flex min-w-0 grow items-center gap-2 overflow-x-hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger />
            </TooltipTrigger>
            <TooltipContent>{t('open-menu')}</TooltipContent>
          </Tooltip>
          <ChatHeaderTitleDescription />
        </div>
        <div className="flex items-center gap-1">
          <HowToDialog>
            <Button variant="ghost" size="icon" className="size-8">
              <HelpCircleIcon />
            </Button>
          </HowToDialog>
          <ChatShareButton />
          <CreateNewChatDropdownButton />
        </div>
      </header>

      <SocketDisconnectedBanner />
    </>
  );
}

export default ChatHeader;
