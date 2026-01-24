import { notFound, redirect } from "next/navigation";

import ChatvoteSwiperResult from "@/components/chatvote-swiper/chatvote-swiper-result";
import { chatvoteSwiperCalculateScore } from "@/lib/chatvote-swiper/chatvote-swiper-calculate-score";
import {
  getChatvoteSwiperHistory,
  getCurrentUser,
  getParties,
} from "@/lib/firebase/firebase-server";
import { getUserDetailsFromUser } from "@/lib/utils";

type Props = {
  params: Promise<{
    resultId: string;
  }>;
};

async function ChatvoteSwiperResultsPage({ params }: Props) {
  const { resultId } = await params;

  const user = await getCurrentUser();
  const swiperResult = await getChatvoteSwiperHistory(resultId).catch(() => {
    redirect("/swiper");
  });

  if (Object.keys(swiperResult.history).length === 0) {
    notFound();
  }

  const scores = await chatvoteSwiperCalculateScore(swiperResult.history);
  const parties = await getParties();
  const userDetails = user ? getUserDetailsFromUser(user) : undefined;

  return (
    <ChatvoteSwiperResult
      resultId={resultId}
      scores={scores}
      parties={parties}
      userDetails={userDetails}
    />
  );
}

export default ChatvoteSwiperResultsPage;
