"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { useAnonymousAuth } from "@/components/anonymous-auth";
import DynamicRateLimitStickyInput from "@/components/dynamic-rate-limit-sticky-input";
import { type LlmSystemStatus } from "@/lib/firebase/firebase.types";
import { copySharedChatSession } from "@/lib/firebase/firebase-admin";

type Props = {
  snapshotId: string;
  quickReplies?: string[];
  initialSystemStatus: LlmSystemStatus;
  hasValidServerUser?: boolean;
};

function ShareChatInput({
  snapshotId,
  quickReplies,
  initialSystemStatus,
  hasValidServerUser,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useAnonymousAuth();

  const errorToast = () => {
    toast.error(
      "Une erreur s&lsquo;est produite. Veuillez réessayer ou recharger la page.",
    );
  };

  const handleStartChat = async (message: string) => {
    if (!user?.uid) {
      errorToast();
      return;
    }

    setIsLoading(true);

    try {
      const { session_id } = await copySharedChatSession(snapshotId, user.uid);

      const searchParams = new URLSearchParams({
        ref_snapshot_id: snapshotId,
        q: message,
      });

      router.push(`/session/${session_id}?${searchParams.toString()}`, {
        scroll: false,
      });
    } catch (error) {
      console.error(error);
      errorToast();
      setIsLoading(false);
    }
  };

  return (
    <DynamicRateLimitStickyInput
      isLoading={isLoading}
      onSubmit={handleStartChat}
      quickReplies={quickReplies}
      initialSystemStatus={initialSystemStatus}
      hasValidServerUser={hasValidServerUser}
    />
  );
}

export default ShareChatInput;
