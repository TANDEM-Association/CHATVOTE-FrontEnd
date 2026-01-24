import {
  ArrowUp,
  ChevronDown,
  MessageCircleMoreIcon,
  XIcon,
} from "lucide-react";

import { useAppContext } from "@/app/_providers/AppProvider";
import Logo from "@/components/chat/logo";
import MessageLoadingBorderTrail from "@/components/chat/message-loading-border-trail";
import { useChatvoteSwiperStore } from "@/components/providers/chatvote-swiper-store-provider";
import { Button } from "@/components/ui/button";
import { SWIPER_DEFAULT_QUICK_REPLIES } from "@/lib/chatvote-swiper/chatvote-swiper-store";
import { cn } from "@/lib/utils";

type Props = {
  isSticky: boolean;
  handleToggleExpand: () => void;
  handleNewMessage?: (message: string) => void;
};

const ChatvoteSwiperInput = ({
  isSticky,
  handleToggleExpand,
  handleNewMessage,
}: Props) => {
  const setInput = useChatvoteSwiperStore((state) => state.setSwiperInput);
  const input = useChatvoteSwiperStore((state) => {
    const currentThesis = state.getCurrentThesis();
    if (!currentThesis) return "";

    return state.swiperInput[currentThesis.id];
  });
  const addUserMessage = useChatvoteSwiperStore(
    (state) => state.addUserMessage,
  );
  const isLoadingMessage = useChatvoteSwiperStore((state) => {
    const currentThesis = state.getCurrentThesis();
    if (!currentThesis) return false;
    return state.isLoadingMessage[currentThesis.id];
  });
  const showExpandToggle = useChatvoteSwiperStore((state) => {
    const currentThesis = state.getCurrentThesis();
    if (!currentThesis) return false;

    return state.messageHistory[currentThesis.id]?.length > 0;
  });
  const chatIsExpanded = useChatvoteSwiperStore(
    (state) => state.chatIsExpanded,
  );
  const { device } = useAppContext();
  const isDesktop = device === "desktop" || device === "tablet";
  const currentQuickReplies = useChatvoteSwiperStore((state) => {
    const currentThesis = state.getCurrentThesis();
    if (!currentThesis) return SWIPER_DEFAULT_QUICK_REPLIES;

    return state.currentQuickReplies[currentThesis.id];
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUserMessage(input);
    handleNewMessage?.(input);
    setInput("");
  };

  const handleQuickReplyClick = (reply: string) => {
    addUserMessage(reply);
    setInput("");
    handleNewMessage?.(reply);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "border-input bg-chat-input relative mx-auto grid min-h-[82px] w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl transition-shadow duration-300 ease-out focus-within:border-zinc-300 md:shadow-none dark:focus-within:border-zinc-700",
        !isSticky && "shadow-none",
      )}
    >
      {isLoadingMessage && <MessageLoadingBorderTrail />}

      <div className="flex gap-1 overflow-x-auto px-2 pt-2 whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {showExpandToggle && (
          <button
            className={cn(
              "bg-primary text-primary-foreground flex shrink-0 items-center gap-1 rounded-full px-2 py-1",
            )}
            type="button"
            onClick={handleToggleExpand}
          >
            {!isDesktop ? (
              <ChevronDown
                className={cn("size-3 transition-transform", {
                  "rotate-180": !chatIsExpanded,
                })}
              />
            ) : chatIsExpanded ? (
              <XIcon className="size-3" />
            ) : (
              <MessageCircleMoreIcon className="size-3" />
            )}
            <span className="text-xs">
              Chat {chatIsExpanded ? "fermer" : "ouvrir"}
            </span>
          </button>
        )}
        {typeof currentQuickReplies !== "undefined" &&
        currentQuickReplies.length > 0
          ? currentQuickReplies.map((reply) => {
              return (
                <button
                  key={reply}
                  className={cn(
                    "bg-muted enabled:hover:bg-muted/70 shrink-0 rounded-full px-2 py-1 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                  )}
                  type="button"
                  disabled={isLoadingMessage}
                  onClick={() => handleQuickReplyClick(reply)}
                >
                  <p className="line-clamp-1 text-xs">{reply}</p>
                </button>
              );
            })
          : null}
      </div>

      <Logo
        variant="small"
        className="border-border absolute bottom-2 left-2 size-8 translate-y-0 rounded-full border p-1"
      />
      <input
        className="bg-chat-input placeholder:text-muted-foreground w-full px-12 py-3 text-base focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed"
        name="question"
        placeholder="Posez une question à chatvote..."
        value={input}
        type="text"
        onChange={(e) => setInput(e.target.value)}
        maxLength={500}
      />
      <Button
        type="submit"
        className={cn(
          "bg-foreground text-background hover:bg-foreground/80 disabled:bg-foreground/20 disabled:text-muted absolute right-2 bottom-2 flex size-8 translate-y-0 items-center justify-center rounded-full transition-colors",
        )}
        disabled={!input.length || isLoadingMessage}
      >
        <ArrowUp className="size-4 font-bold" />
      </Button>
    </form>
  );
};

export default ChatvoteSwiperInput;
