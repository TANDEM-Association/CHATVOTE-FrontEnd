import ChatvoteSwiper from "@/components/chatvote-swiper/chatvote-swiper";
import ChatvoteSwiperChatWrapper from "@/components/chatvote-swiper/chatvote-swiper-chat-wrapper";
import ChatvoteSwiperExperimentalDisclaimer from "@/components/chatvote-swiper/chatvote-swiper-experimental-disclaimer";
import { ChatvoteSwiperStoreProvider } from "@/components/providers/chatvote-swiper-store-provider";
import { getChatvoteSwiperTheses } from "@/lib/firebase/firebase-server";

async function ChatvoteSwiperPage() {
  const thesesResponse = await getChatvoteSwiperTheses();
  const theses = thesesResponse.map((thesis) => ({
    id: thesis.id,
    question: thesis.question,
    topic: thesis.topic,
  }));

  return (
    <ChatvoteSwiperStoreProvider allTheses={theses}>
      <ChatvoteSwiper />

      <ChatvoteSwiperChatWrapper />

      <ChatvoteSwiperExperimentalDisclaimer />
    </ChatvoteSwiperStoreProvider>
  );
}

export default ChatvoteSwiperPage;
