"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useRef,
  useState,
} from "react";

import { useStore } from "zustand";

import {
  createChatvoteSwiperStore,
  SWIPER_DEFAULT_QUICK_REPLIES,
} from "@/lib/chatvote-swiper/chatvote-swiper-store";
import {
  type ChatvoteSwiperStore,
  type SwiperMessage,
  type Thesis,
} from "@/lib/chatvote-swiper/chatvote-swiper-store.types";

import ChatvoteSwiperExperimentalDisclaimer from "../chatvote-swiper/chatvote-swiper-experimental-disclaimer";

export type ChatvoteSwiperStoreApi = ReturnType<
  typeof createChatvoteSwiperStore
>;

export const ChatvoteSwiperStoreContext =
  createContext<ChatvoteSwiperStoreApi | null>(null);

type Props = {
  children: ReactNode;
  allTheses: Thesis[];
};

export const ChatvoteSwiperStoreProvider = ({ children, allTheses }: Props) => {
  const storeRef = useRef<ChatvoteSwiperStoreApi>(null);
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false);

  if (storeRef.current === null) {
    storeRef.current = createChatvoteSwiperStore({
      allTheses,
      thesesStack: allTheses,
      messageHistory: allTheses.reduce(
        (acc, thesis) => {
          acc[thesis.id] = [];
          return acc;
        },
        {} as Record<string, SwiperMessage[]>,
      ),
      swiperInput: allTheses.reduce(
        (acc, thesis) => {
          acc[thesis.id] = "";
          return acc;
        },
        {} as Record<string, string>,
      ),
      isLoadingMessage: allTheses.reduce(
        (acc, thesis) => {
          acc[thesis.id] = false;
          return acc;
        },
        {} as Record<string, boolean>,
      ),
      currentQuickReplies: allTheses.reduce(
        (acc, thesis) => {
          acc[thesis.id] = SWIPER_DEFAULT_QUICK_REPLIES;
          return acc;
        },
        {} as Record<string, string[]>,
      ),
    });
  }

  return (
    <ChatvoteSwiperStoreContext.Provider value={storeRef.current}>
      <ChatvoteSwiperExperimentalDisclaimer
        isOpen={isDisclaimerAccepted === false}
        onClose={() => setIsDisclaimerAccepted(true)}
      />
      {isDisclaimerAccepted === true ? children : null}
    </ChatvoteSwiperStoreContext.Provider>
  );
};

export const useChatvoteSwiperStore = <T,>(
  selector: (store: ChatvoteSwiperStore) => T,
): T => {
  const context = useContext(ChatvoteSwiperStoreContext);

  if (context === null) {
    throw new Error(
      `useChatvoteSwiperStore must be used within ChatvoteSwiperStoreProvider`,
    );
  }

  return useStore(context, selector);
};
