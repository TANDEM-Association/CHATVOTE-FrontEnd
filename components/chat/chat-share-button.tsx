import { ShareIcon } from 'lucide-react';
import { useChatStore } from '@/components/providers/chat-store-provider';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import ChatShareLinkInputForm from './chat-share-link-input-form';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from './responsive-drawer-dialog';
import { useTranslations } from 'next-intl';

function ChatShareButton() {
  const sharePrivateSession = useChatStore(
    (state) => state.messages.length > 0,
  );
  const t = useTranslations('chat');

  return (
    <ResponsiveDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <ResponsiveDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ShareIcon />
            </Button>
          </ResponsiveDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>{t('share-session-title')}</TooltipContent>
      </Tooltip>
      <ResponsiveDialogContent className="sm:max-w-md">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>
            {sharePrivateSession ? t('share-session-title') : t('share-app-title')}
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            {sharePrivateSession
              ? t('share-session-description')
              : t('share-app-description')}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <div className="p-4 md:p-0">
          <ChatShareLinkInputForm sharePrivateSession={sharePrivateSession} />
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export default ChatShareButton;
