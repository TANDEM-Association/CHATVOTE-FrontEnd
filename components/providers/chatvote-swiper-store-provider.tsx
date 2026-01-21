"use client";
import { createContext, type ReactNode, useContext, useRef } from "react";

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

export type ChatvoteSwiperStoreApi = ReturnType<
  typeof createChatvoteSwiperStore
>;

export const ChatvoteSwiperStoreContext = createContext<
  ChatvoteSwiperStoreApi | undefined
>(undefined);

type Props = {
  children: ReactNode;
  allTheses: Thesis[];
};

export const ChatvoteSwiperStoreProvider = ({ children, allTheses }: Props) => {
  const storeRef = useRef<ChatvoteSwiperStoreApi>(null);

  if (!storeRef.current) {
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
      {children}
    </ChatvoteSwiperStoreContext.Provider>
  );
};

export const useChatvoteSwiperStore = <T,>(
  selector: (store: ChatvoteSwiperStore) => T,
): T => {
  const chatvoteSwiperStoreContext = useContext(ChatvoteSwiperStoreContext);

  if (!chatvoteSwiperStoreContext) {
    throw new Error(
      `useChatvoteSwiperStore must be used within ChatvoteSwiperStoreProvider`,
    );
  }

  return useStore(chatvoteSwiperStoreContext, selector);
};
