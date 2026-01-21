import { type ChatvoteSwiperStoreActionHandlerFor } from "@/lib/chatvote-swiper/chatvote-swiper-store.types";

export const setSwiperInput: ChatvoteSwiperStoreActionHandlerFor<
  "setSwiperInput"
> = (get, set) => (input) => {
  const currentThesis = get().getCurrentThesis();

  if (!currentThesis) {
    return;
  }

  set((state) => ({
    swiperInput: {
      ...state.swiperInput,
      [currentThesis.id]: input,
    },
  }));
};
