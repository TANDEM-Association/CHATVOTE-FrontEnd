import Link from 'next/link';
import { Button } from './ui/button';
import MessageLoadingBorderTrail from './chat/message-loading-border-trail';
import Logo from './chat/logo';

function EmbedOpenWebsiteButton() {
  return (
    <Button variant="outline" size="sm" asChild className="relative">
      <Link target="_blank" href="https://wahl.chat">
        <MessageLoadingBorderTrail />
        <Logo variant="small" className="size-4" />
        Zu wahl.chat
      </Link>
    </Button>
  );
}

export default EmbedOpenWebsiteButton;
