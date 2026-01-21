import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

import { saveSwiperHistory } from "./actions/save-swiper-history";
import { setSwiperInput } from "./actions/set-swiper-input";
import { addUserMessage } from "./actions/swiper-add-user-message";
import { swiperRemoveCard } from "./actions/swiper-remove-card";
import { swiperSetIsLoadingMessage } from "./actions/swiper-set-is-loading-message";
import {
  type ChatvoteSwiperStore,
  type ChatvoteSwiperStoreState,
} from "./chatvote-swiper-store.types";

export const SURVEY_BANNER_MIN_MESSAGE_COUNT = 8;
export const SWIPER_DEFAULT_QUICK_REPLIES = [
  "Quelle est la situation actuelle ?",
  "Quels sont les avantages et inconvénients ?",
  "Quelles sont les solutions alternatives ?",
];

const defaultState: ChatvoteSwiperStoreState = {
  allTheses: [],
  thesesStack: [],
  history: {},
  messageHistory: {},
  swiperInput: {},
  isLoadingMessage: {},
  chatIsExpanded: false,
  currentQuickReplies: {},
  showSkipDisclaimer: false,
  skipDisclaimerShown: false,
};

export function createChatvoteSwiperStore(
  initialState?: Partial<ChatvoteSwiperStore>,
) {
  return createStore<ChatvoteSwiperStore>()(
    immer((set, get) => ({
      ...defaultState,
      ...initialState,

      removeCard: swiperRemoveCard(get, set),
      reset: () => {
        set((state) => {
          state.thesesStack = state.allTheses;
          state.history = {};
        });
      },
      back: () => {
        set((state) => {
          state.thesesStack.push(state.allTheses[state.thesesStack.length]);
        });
      },
      addUserMessage: addUserMessage(get, set),
      setSwiperInput: setSwiperInput(get, set),
      setIsLoadingMessage: swiperSetIsLoadingMessage(get, set),
      setChatIsExpanded: (isExpanded: boolean) =>
        set({ chatIsExpanded: isExpanded }),
      getCurrentThesis: () => get().thesesStack[get().thesesStack.length - 1],
      saveSwiperHistory: saveSwiperHistory(get, set),
      setShowSkipDisclaimer: (show: boolean) =>
        set({ showSkipDisclaimer: show }),
      setSkipDisclaimerShown: (shown: boolean) =>
        set({ skipDisclaimerShown: shown }),
    })),
  );
}
