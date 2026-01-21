import Link from "next/link";

import Logo from "./chat/logo";
import MessageLoadingBorderTrail from "./chat/message-loading-border-trail";
import { Button } from "./ui/button";

function EmbedOpenWebsiteButton() {
  return (
    <Button variant="outline" size="sm" asChild className="relative">
      <Link target="_blank" href="https://chatvote.fr">
        <MessageLoadingBorderTrail />
        <Logo variant="small" className="size-4" />
        Vers chatvote
      </Link>
    </Button>
  );
}

export default EmbedOpenWebsiteButton;
