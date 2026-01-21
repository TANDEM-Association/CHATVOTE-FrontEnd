import { type ChatvoteSwiperStoreActionHandlerFor } from "@/lib/chatvote-swiper/chatvote-swiper-store.types";

export const swiperRemoveCard: ChatvoteSwiperStoreActionHandlerFor<
  "removeCard"
> = (get, set) => (swipe) => {
  set((state) => {
    state.history[state.thesesStack[state.thesesStack.length - 1].id] = swipe;
    state.thesesStack.pop();
  });
};
