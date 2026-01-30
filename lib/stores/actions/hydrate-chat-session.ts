import { toast } from "sonner";

import { chatViewScrollToBottom } from "@/lib/scroll-utils";
import { type ChatStoreActionHandlerFor } from "@/lib/stores/chat-store.types";
import { areSetsEqual, generateUuid } from "@/lib/utils";

export const hydrateChatSession: ChatStoreActionHandlerFor<
  "hydrateChatSession"
> =
  (get, set) =>
  async ({
    chatSession,
    chatId,
    messages,
    preSelectedPartyIds,
    initialQuestion,
    userId,
    tenant,
    municipalityCode,
  }) => {
    const {
      chatId: currentChatId,
      partyIds: currentPartyIds,
      loadChatSession,
      initializeChatSession,
    } = get();

    const partyIds = new Set(preSelectedPartyIds ?? []);

    const changedPage =
      chatId !== currentChatId || !areSetsEqual(partyIds, currentPartyIds);

    // Determine scope based on municipality code presence
    const scope = municipalityCode !== undefined ? "local" : "national";

    set((state) => {
      const sessionId = changedPage ? chatId : state.chatId;
      const preliminarySessionId =
        (changedPage ? sessionId : state.localPreliminaryChatId) ??
        generateUuid();

      state.chatId = sessionId;
      state.localPreliminaryChatId = preliminarySessionId;
      state.partyIds = partyIds;
      state.initialQuestionError = undefined;
      state.pendingInitialQuestion = initialQuestion;
      state.userId = userId;
      state.tenant = tenant;
      state.scope = scope;
      state.municipalityCode = municipalityCode;
    });

    if (initialQuestion && typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("q");
      window.history.replaceState({}, "", url.toString());
    }

    if (chatSession && messages !== undefined) {
      set((state) => {
        const lastMessage = messages[messages.length - 1];

        return {
          messages,
          chatId: chatSession.id,
          currentQuickReplies: lastMessage
            ? (lastMessage.quick_replies ?? [])
            : [],
          currentChatTitle: chatSession.title,
          chatSessionIsPublic: chatSession.is_public,
          currentStreamingMessages: undefined,
          partyIds: new Set(chatSession.party_ids ?? []),
          preSelectedPartyIds: new Set(chatSession.party_ids ?? []),
          loading: {
            ...state.loading,
            chatSession: false,
            initializingChatSession: false,
            newMessage: false,
          },
          sharingSnapshot: chatSession.sharing_snapshot
            ? {
                id: chatSession.sharing_snapshot?.id,
                messagesLengthAtSharing:
                  chatSession.sharing_snapshot?.messages_length_at_sharing ?? 0,
              }
            : undefined,
        };
      });

      chatViewScrollToBottom();
    } else if (chatId && changedPage) {
      await toast
        .promise(loadChatSession(chatId), {
          loading: "Loading chat session...",
          success: "Chat session loaded!",
          error: "Failed to load chat session",
        })
        .unwrap();
    } else {
      set((state) => ({
        messages: [],
        currentQuickReplies: [],
        currentChatTitle: undefined,
        chatSessionIsPublic: false,
        currentStreamingMessages: undefined,
        loading: {
          ...state.loading,
          chatSession: false,
          initializingChatSession: false,
          newMessage: false,
        },
        sharingSnapshot: undefined,
      }));
    }

    initializeChatSession();
  };
