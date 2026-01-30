import React, { Suspense } from "react";

import AiDisclaimer from "@/components/legal/ai-disclaimer";
import LoadingSpinner from "@/components/loading-spinner";
import { getAuth, getSystemStatus } from "@/lib/firebase/firebase-server";

import ChatSidebar from "./sidebar/chat-sidebar";
import ChatDynamicChatInput from "./chat-dynamic-chat-input";
import ChatHeader from "./chat-header";
import ChatMainContent from "./chat-main-content";
import ChatScrollDownIndicator from "./chat-scroll-down-indicator";
import ChatViewSsr from "./chat-view-ssr";

type Props = {
  sessionId?: string;
  partyIds?: string[];
  initialQuestion?: string;
  municipalityCode?: string;
};

async function ChatView({
  sessionId,
  partyIds,
  initialQuestion,
  municipalityCode,
}: Props) {
  const systemStatus = await getSystemStatus();
  const auth = await getAuth();

  return (
    <div className="relative flex size-full flex-col overflow-hidden">
      {/* Sidebar as fixed overlay */}
      <ChatSidebar />

      <ChatHeader />
      {/* Main content - adds padding when sidebar is expanded */}
      <ChatMainContent>
        <Suspense
          fallback={
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2">
              <LoadingSpinner />
              <p className="text-muted-foreground text-center text-sm">
                Loading Chat Session...
              </p>
            </div>
          }
        >
          <ChatViewSsr
            chatId={sessionId}
            partyIds={partyIds}
            initialQuestion={initialQuestion}
            municipalityCode={municipalityCode}
          />
        </Suspense>

        <div className="bg-background relative mx-auto w-full max-w-192 shrink-0 p-3 md:p-4">
          <ChatScrollDownIndicator />
          <ChatDynamicChatInput
            initialSystemStatus={systemStatus}
            hasValidServerUser={
              auth.session !== null && !auth.session.isAnonymous
            }
          />
          <AiDisclaimer />
        </div>
      </ChatMainContent>
    </div>
  );
}

export default ChatView;
