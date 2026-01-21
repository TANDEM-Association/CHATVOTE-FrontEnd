import ChatMarkdown from "@/components/chat/chat-markdown";
import { ChatMessageIcon } from "@/components/chat/chat-message-icon";
import SourcesButton from "@/components/chat/sources-button";
import { type PartyDetails } from "@/lib/party-details";
import { type MessageItem } from "@/lib/stores/chat-store.types";
import { cn } from "@/lib/utils";

type Props = {
  message: MessageItem;
  party?: PartyDetails;
};

function ShareSingleMessage({ message, party }: Props) {
  if (message.role === "user") {
    return (
      <article className="flex flex-col items-end justify-end gap-1">
        <div className="bg-muted text-foreground w-fit max-w-[90%] rounded-[20px] px-4 py-2">
          {message.content ?? ""}
        </div>
      </article>
    );
  }

  return (
    <article
      id={message.id}
      className={cn(
        "relative flex flex-col gap-4 transition-all duration-200 ease-out",
      )}
    >
      <div className={cn("flex items-start justify-start gap-3 md:gap-4")}>
        <ChatMessageIcon partyId={message.party_id} party={party} />
        <div className="flex flex-col gap-4">
          <ChatMarkdown message={message} />

          <div>
            <SourcesButton
              sources={message.sources ?? []}
              messageContent={message.content ?? ""}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default ShareSingleMessage;
