import Image from "next/image";
import Link from "next/link";

import MessageLoadingBorderTrail from "./chat/message-loading-border-trail";
import { Button } from "./ui/button";

function EmbedOpenWebsiteButton() {
  return (
    <Button variant="outline" size="sm" asChild className="relative">
      <Link target="_blank" href="https://app.chatvote.org">
        <MessageLoadingBorderTrail />
        <Image
          src="/images/logos/chatvote.svg"
          alt="chatvote"
          width={0}
          height={0}
          sizes="100vw"
          className="size-4"
        />
        Vers chatvote
      </Link>
    </Button>
  );
}

export default EmbedOpenWebsiteButton;
