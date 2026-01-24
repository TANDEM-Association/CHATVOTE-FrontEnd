import ChatvoteSwiper from "@/components/chatvote-swiper/chatvote-swiper";
import ChatvoteSwiperChatWrapper from "@/components/chatvote-swiper/chatvote-swiper-chat-wrapper";
import { ChatvoteSwiperStoreProvider } from "@/components/providers/chatvote-swiper-store-provider";
import { getChatvoteSwiperTheses } from "@/lib/firebase/firebase-server";

async function ChatvoteSwiperPage() {
  const thesesResponse = await getChatvoteSwiperTheses();
  const theses = thesesResponse.map((thesis) => ({
    id: thesis.id,
    topic: thesis.topic,
    statement: thesis.statement,
    question: thesis.question,
  }));

  return (
    <ChatvoteSwiperStoreProvider allTheses={theses}>
      <ChatvoteSwiper />
      <ChatvoteSwiperChatWrapper />
    </ChatvoteSwiperStoreProvider>
  );
}

export default ChatvoteSwiperPage;
