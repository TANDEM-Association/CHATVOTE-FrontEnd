'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useWahlSwiperStore } from '@/components/providers/wahl-swiper-store-provider';
import { useRouter } from 'next/navigation';
import { useAnonymousAuth } from '@/components/anonymous-auth';
import SwipingCards from './swiping-cards';
import LoadingSpinner from '@/components/loading-spinner';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

function WahlSwiper() {
  const [isLoading, setIsLoading] = useState(false);
  const finished = useWahlSwiperStore(
    (state) => state.thesesStack.length === 0,
  );
  const saveSwiperHistory = useWahlSwiperStore(
    (state) => state.saveSwiperHistory,
  );
  const { user } = useAnonymousAuth();
  const router = useRouter();
  const t = useTranslations('swiper');

  const handleFinished = useCallback(async () => {
    const errorToast = () =>
      toast.error(t('error-calculate-results'));

    if (!user) {
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
  }, [user, router, saveSwiperHistory, t]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (finished) {
      handleFinished();
    }
  }, [finished, handleFinished]);

  const swipingCards = useMemo(() => {
    return <SwipingCards />;
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto mt-8 flex min-h-[calc(100vh-var(--header-height)-var(--footer-height))] w-full grow flex-col items-center justify-center gap-2">
        <LoadingSpinner />
        <p className="text-muted-foreground">
          Wir berechnen deine Ergebnisse...
        </p>
      </div>
    );
  }

  return swipingCards;
}

export default WahlSwiper;
