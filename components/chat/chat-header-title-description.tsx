"use client";

import Image from "next/image";
import Link from "next/link";

import { useChatStore } from "@/components/providers/chat-store-provider";
import { useParties } from "@/components/providers/parties-provider";

import PartyDetailPopover from "./party-detail-popover";

type Props = {
  showPartyPopover?: boolean;
};

function ChatHeaderTitleDescription({ showPartyPopover = true }: Props) {
  const partyIds = useChatStore((state) => state.partyIds);
  const parties = useParties([...partyIds]);

  return (
    <div className="flex min-w-0 grow items-center gap-2">
      <div className="flex min-w-0 flex-col">
        <Link href="/">
          <Image
            src="/images/logos/chatvote.svg"
            alt="chatvote"
            width={0}
            height={0}
            sizes="100vw"
            className="w-24"
          />
        </Link>
      </div>
      {showPartyPopover && parties && parties?.length > 0 && (
        <PartyDetailPopover parties={parties} />
      )}
    </div>
  );
}

export default ChatHeaderTitleDescription;
