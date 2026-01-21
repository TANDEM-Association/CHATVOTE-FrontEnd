import { ChatMessageIcon } from "@/components/chat/chat-message-icon";
import { Markdown } from "@/components/markdown";
import { type SwiperMessage } from "@/lib/chatvote-swiper/chatvote-swiper-store.types";
import { cn, prettifiedUrlName } from "@/lib/utils";

type Props = {
  message: SwiperMessage;
};

const ChatvoteSwiperChatMessage = ({ message }: Props) => {
  const { role, content, sources } = message;

  const onReferenceClick = (number: number) => {
    if (number < 0 || number >= sources.length) {
      return;
    }

    const source = sources[number];
    window.open(source.source, "_blank");
  };

  const getReferenceTooltip = (number: number) => {
    if (number < 0 || number >= sources.length) {
      return null;
    }

    const source = sources[number];
    if (!source) {
      return null;
    }

    return source.source;
  };

  const getReferenceName = (number: number) => {
    if (number < 0 || number >= sources.length) {
      return null;
    }

    const source = sources[number];
    if (!source) {
      return null;
    }

    return prettifiedUrlName(source.source);
  };

  if (role === "assistant") {
    return (
      <article
        className={cn(
          "text-foreground flex w-fit max-w-[95%] gap-3 rounded-[20px] md:gap-4",
          "self-start",
        )}
      >
        <ChatMessageIcon />
        <div className="flex flex-col">
          <Markdown
            getReferenceTooltip={getReferenceTooltip}
            getReferenceName={getReferenceName}
            onReferenceClick={onReferenceClick}
          >
            {content}
          </Markdown>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-muted text-foreground flex w-fit max-w-[90%] self-end rounded-[20px] px-4 py-2">
      <p>{content}</p>
    </article>
  );
};

export default ChatvoteSwiperChatMessage;
