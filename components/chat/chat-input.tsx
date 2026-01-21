"use client";

import { ArrowUp } from "lucide-react";

import { useAnonymousAuth } from "@/components/anonymous-auth";
import { useChatStore } from "@/components/providers/chat-store-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import ChatInputAddPartiesButton from "./chat-input-add-parties-button";
import MessageLoadingBorderTrail from "./message-loading-border-trail";

function ChatInput() {
  const { user } = useAnonymousAuth();
  const input = useChatStore((state) => state.input);
  const setInput = useChatStore((state) => state.setInput);
  const addUserMessage = useChatStore((state) => state.addUserMessage);
  const quickReplies = useChatStore((state) => state.currentQuickReplies);
  const loading = useChatStore((state) => {
    const loading = state.loading;
    return (
      loading.general ||
      loading.newMessage ||
      loading.chatSession ||
      loading.initializingChatSocketSession
    );
  });

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement> | string,
  ) => {
    let effectiveInput = input;

    if (typeof event === "string") {
      effectiveInput = event;
    } else {
      event.preventDefault();
    }

    if (!user?.uid || !effectiveInput.trim()) return;

    addUserMessage(user.uid, effectiveInput);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleQuickReplyClick = (reply: string) => {
    handleSubmit(reply);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "border-input bg-chat-input relative w-full overflow-hidden rounded-[30px] border transition-colors focus-within:border-zinc-300 dark:focus-within:border-zinc-700",
        quickReplies?.length > 0 && "rounded-[20px]",
      )}
    >
      {quickReplies.length > 0 && (
        <>
          <ChatInputAddPartiesButton disabled={loading} />
          <div
            className={cn(
              "ml-7 flex gap-1 overflow-x-auto px-2 pt-2 whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              loading && "z-0 opacity-50",
            )}
          >
            {quickReplies.map((r) => (
              <button
                key={r}
                className="bg-muted enabled:hover:bg-muted/50 shrink-0 rounded-full px-2 py-1 transition-colors disabled:cursor-not-allowed"
                onClick={() => handleQuickReplyClick(r)}
                disabled={loading}
                type="button"
              >
                <p className="line-clamp-1 text-xs">{r}</p>
              </button>
            ))}
          </div>
        </>
      )}

      {loading && <MessageLoadingBorderTrail />}

      <input
        className="bg-chat-input placeholder:text-muted-foreground w-full py-3 pr-11 pl-4 text-[16px] focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed"
        placeholder="Écrivez un message..."
        onChange={handleChange}
        value={input}
        disabled={loading}
        maxLength={500}
      />
      <Button
        type="submit"
        disabled={!input.length || loading}
        className={cn(
          "bg-foreground text-background hover:bg-foreground/80 disabled:bg-foreground/20 disabled:text-muted absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full transition-colors",
          quickReplies.length > 0 && "bottom-0 translate-y-0",
        )}
      >
        <ArrowUp className="size-4 font-bold" />
      </Button>
    </form>
  );
}

export default ChatInput;
