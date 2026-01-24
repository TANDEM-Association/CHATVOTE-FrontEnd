"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { useAnonymousAuth } from "@/components/anonymous-auth";
import LoadingSpinner from "@/components/loading-spinner";
import { useChatvoteSwiperStore } from "@/components/providers/chatvote-swiper-store-provider";

import SwipingCards from "./swiping-cards";

const ChatvoteSwiper = () => {
  const [isLoading, setIsLoading] = useState(false);
  const finished = useChatvoteSwiperStore(
    (state) => state.thesesStack.length === 0,
  );
  const hasHistory = useChatvoteSwiperStore(
    (state) => Object.keys(state.history).length > 0,
  );
  const saveSwiperHistory = useChatvoteSwiperStore(
    (state) => state.saveSwiperHistory,
  );
  const { user } = useAnonymousAuth();
  const router = useRouter();
  useEffect(() => {
    const onFinished = async () => {
      const errorToast = () =>
        toast.error(
          "Erreur lors du calcul de vos résultats. Veuillez recharger la page.",
        );

      if (user === null) {
        errorToast();
        return;
      }

      setIsLoading(true);

      try {
        const resultId = await saveSwiperHistory(user.uid);
        router.push(`/swiper/results/${resultId}`);
      } catch (error) {
        console.error(error);
        errorToast();
        setIsLoading(false);
      }
    };

    // Only trigger save if finished AND there's actual history data
    if (finished === true && hasHistory === true) {
      onFinished();
    }
  }, [finished, hasHistory, router, saveSwiperHistory, user]);

  if (isLoading === true) {
    return (
      <div className="mx-auto mt-8 flex min-h-[calc(100vh-var(--header-height)-var(--footer-height))] w-full grow flex-col items-center justify-center gap-2">
        <LoadingSpinner />
        <p className="text-muted-foreground">Nous calculons vos résultats...</p>
      </div>
    );
  }

  return <SwipingCards />;
};

export default ChatvoteSwiper;
