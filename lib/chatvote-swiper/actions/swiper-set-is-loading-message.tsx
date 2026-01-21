import { type ChatvoteSwiperStoreActionHandlerFor } from "@/lib/chatvote-swiper/chatvote-swiper-store.types";

export const swiperSetIsLoadingMessage: ChatvoteSwiperStoreActionHandlerFor<
  "setIsLoadingMessage"
> = (get, set) => (isLoading) => {
  const currentThesis = get().getCurrentThesis();

  if (!currentThesis) {
    return;
  }

  set((state) => ({
    isLoadingMessage: {
      ...state.isLoadingMessage,
      [currentThesis.id]: isLoading,
    },
  }));
};
