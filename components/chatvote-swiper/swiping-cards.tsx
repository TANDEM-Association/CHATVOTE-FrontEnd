import { ChevronsRightIcon, HeartIcon, XIcon } from "lucide-react";

import { useChatvoteSwiperStore } from "@/components/providers/chatvote-swiper-store-provider";
import { Progress } from "@/components/ui/progress";

import ChatvoteSwiperButton from "./chatvote-swiper-button";
import ThesisCard from "./thesis-card";

const SwipingCards = () => {
  const currentThesesStack = useChatvoteSwiperStore(
    (state) => state.thesesStack,
  );
  const progress = useChatvoteSwiperStore(
    (state) =>
      ((state.allTheses.length - state.thesesStack.length) /
        state.allTheses.length) *
      100,
  );
  const removeCard = useChatvoteSwiperStore((state) => state.removeCard);
  const handleBack = useChatvoteSwiperStore((state) => state.back);

  const handleDislike = () => removeCard("no");
  const handleSkip = () => removeCard("skip");
  const handleLike = () => removeCard("yes");

  return (
    <div className="flex flex-col md:gap-4">
      <Progress value={progress} className="my-4 h-2 w-full" />
      <div className="relative mx-auto flex h-[200px] w-full max-w-80 items-center justify-center [@media(min-height:600px)]:aspect-square [@media(min-height:650px)]:h-auto">
        {currentThesesStack.map((card, index) => (
          <ThesisCard
            key={card.id}
            active={index === currentThesesStack.length - 1}
            removeCard={removeCard}
            card={card}
            canGoBack={progress > 0}
            handleBack={handleBack}
          />
        ))}
      </div>

      <div className="mx-auto mt-6 flex flex-row items-center justify-center gap-4">
        <ChatvoteSwiperButton type="no" onClick={handleDislike} />
        <ChatvoteSwiperButton type="skip" onClick={handleSkip} />
        <ChatvoteSwiperButton type="yes" onClick={handleLike} />
      </div>

      <section className="text-muted-foreground mx-auto mt-6 flex flex-row flex-wrap justify-center gap-4 text-xs">
        <div className="flex flex-row items-center gap-2">
          <XIcon className="size-4 text-red-500" />
          <p>Non</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <ChevronsRightIcon className="size-4 text-gray-500" />
          <p>Passer</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <HeartIcon className="size-4 text-green-500" />
          <p>Oui</p>
        </div>
      </section>
    </div>
  );
};

export default SwipingCards;
