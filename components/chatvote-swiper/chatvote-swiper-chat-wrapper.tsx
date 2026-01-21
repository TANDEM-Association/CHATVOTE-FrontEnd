"use client";

import { useEffect, useRef, useState } from "react";

import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/chat/responsive-drawer-dialog";
import { useChatvoteSwiperStore } from "@/components/providers/chatvote-swiper-store-provider";
import { Separator } from "@/components/ui/separator";
import VisuallyHidden from "@/components/visually-hidden";
import { cn } from "@/lib/utils";

import ChatvoteSwiperChat from "./chatvote-swiper-chat";
import ChatvoteSwiperInput from "./chatvote-swiper-input";

const ChatvoteSwiperChatWrapper = () => {
  const shouldShowChat = useChatvoteSwiperStore(
    (state) => state.thesesStack.length > 0,
  );
  const [isSticky, setIsSticky] = useState(true);
  const chatIsExpanded = useChatvoteSwiperStore(
    (state) => state.chatIsExpanded,
  );
  const setChatIsExpanded = useChatvoteSwiperStore(
    (state) => state.setChatIsExpanded,
  );
  const currentThesis = useChatvoteSwiperStore((state) =>
    state.getCurrentThesis(),
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cachedRef = ref.current;

    if (!cachedRef) return;

    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      { threshold: 1 },
    );

    observer.observe(cachedRef);

    return () => {
      observer.unobserve(cachedRef);
    };
  }, [ref]);

  const handleToggleExpand = () => {
    setChatIsExpanded(!chatIsExpanded);
  };

  if (!shouldShowChat) return null;

  return (
    <ResponsiveDialog open={chatIsExpanded} onOpenChange={setChatIsExpanded}>
      <div
        ref={ref}
        className={cn(
          "sticky bottom-[-1px] z-40 -mx-2 mt-6 pb-4 transition-all duration-300 ease-out md:pb-2",
          !isSticky && "mx-0",
        )}
      >
        <ChatvoteSwiperInput
          isSticky={isSticky}
          handleToggleExpand={handleToggleExpand}
          handleNewMessage={() => setChatIsExpanded(true)}
        />
      </div>

      <ResponsiveDialogContent className="flex h-[95dvh] w-full flex-col md:max-w-xl">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle className="text-sm whitespace-normal md:max-w-[95%] md:text-base">
            {currentThesis?.question}
          </ResponsiveDialogTitle>
          <VisuallyHidden>
            <ResponsiveDialogDescription>
              Discutez avec le Chatvote Swiper
            </ResponsiveDialogDescription>
          </VisuallyHidden>
        </ResponsiveDialogHeader>

        <Separator />

        <div className="mt-2 flex grow flex-col overflow-y-hidden px-2 pb-4 md:mt-0 md:p-1">
          <ChatvoteSwiperChat />

          <ChatvoteSwiperInput
            isSticky={false}
            handleToggleExpand={handleToggleExpand}
          />
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default ChatvoteSwiperChatWrapper;
