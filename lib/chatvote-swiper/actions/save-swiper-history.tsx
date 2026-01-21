import {
  type ChatvoteSwiperStoreActionHandlerFor,
  type SwiperMessage,
} from "@/lib/chatvote-swiper/chatvote-swiper-store.types";
import { saveChatvoteSwiperHistory } from "@/lib/firebase/firebase";

export const saveSwiperHistory: ChatvoteSwiperStoreActionHandlerFor<
  "saveSwiperHistory"
> = (get) => (userId) => {
  const { history, messageHistory } = get();

  const normalizedMessageHistory = Object.entries(messageHistory).reduce(
    (acc, [thesisId, messages]) => {
      if (!messages.length) {
        return acc;
      }

      acc[thesisId] = messages.map((message) => ({
        ...message,
      }));

      return acc;
    },
    {} as Record<string, SwiperMessage[]>,
  );

  return saveChatvoteSwiperHistory(userId, history, normalizedMessageHistory);
};
