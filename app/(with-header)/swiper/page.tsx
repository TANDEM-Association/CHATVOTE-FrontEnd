import { WahlSwiperStoreProvider } from '@/components/providers/wahl-swiper-store-provider';

import WahlSwiper from '@/components/wahl-swiper/wahl-swiper';
import WahlSwiperChatWrapper from '@/components/wahl-swiper/wahl-swiper-chat-wrapper';
import WahlSwiperExperimentalDisclaimer from '@/components/wahl-swiper/wahl-swiper-experimental-disclaimer';
import { getWahlSwiperTheses } from '@/lib/firebase/firebase-server';

// Force dynamic rendering to avoid Firebase calls during build
export const dynamic = 'force-dynamic';

async function WahlOMatPage() {
  const thesesResponse = await getWahlSwiperTheses();
  const theses = thesesResponse.map((thesis) => ({
    id: thesis.id,
    question: thesis.question,
    topic: thesis.topic,
  }));

  return (
    <WahlSwiperStoreProvider allTheses={theses}>
      <WahlSwiper />

      <WahlSwiperChatWrapper />

      <WahlSwiperExperimentalDisclaimer />
    </WahlSwiperStoreProvider>
  );
}

export default WahlOMatPage;
