"use client";

import React, { useEffect, useRef, useState } from "react";

import { useChatvoteSwiperStore } from "@/components/providers/chatvote-swiper-store-provider";
import { Modal } from "@/components/ui/modal";
import { Separator } from "@/components/ui/separator";
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

    if (!cachedRef) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(entry.intersectionRatio < 1),
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

  if (shouldShowChat === false) {
    return null;
  }

  return (
    <React.Fragment>
      <div
        ref={ref}
        className={cn(
          "sticky -bottom-px z-40 -mx-2 mt-6 pb-4 transition-all duration-300 ease-out md:pb-2",
          isSticky === false ? "mx-0" : undefined,
        )}
      >
        <ChatvoteSwiperInput
          isSticky={isSticky}
          handleToggleExpand={handleToggleExpand}
          handleNewMessage={() => setChatIsExpanded(true)}
        />
      </div>

      <Modal
        isOpen={chatIsExpanded}
        onClose={() => setChatIsExpanded(false)}
        className="flex h-[85dvh] w-full max-w-xl flex-col p-6"
      >
        <div className="mb-2">
          <h2 className="text-sm font-semibold whitespace-normal md:text-base">
            {currentThesis?.question}
          </h2>
        </div>

        <Separator />

        <div className="mt-2 flex grow flex-col overflow-y-hidden">
          <ChatvoteSwiperChat />

          <ChatvoteSwiperInput
            isSticky={false}
            handleToggleExpand={handleToggleExpand}
          />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ChatvoteSwiperChatWrapper;
