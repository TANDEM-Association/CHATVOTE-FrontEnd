import * as RadixPopover from "@radix-ui/react-popover";
import { ChevronsRightIcon, MessageCircleMoreIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { useChatvoteSwiperStore } from "../providers/chatvote-swiper-store-provider";
import { Button } from "../ui/button";
import { Popover, PopoverContent } from "../ui/popover";

import { type ChatvoteSwiperButtonVariant } from "./chatvote-swiper-button";

type Props = {
  variant: ChatvoteSwiperButtonVariant;
  clicked: boolean;
  onClick: () => void;
};

const ChatvoteSwiperSkipButton = ({ variant, clicked, onClick }: Props) => {
  const expandChat = useChatvoteSwiperStore((state) => state.setChatIsExpanded);
  const showSkipDisclaimer = useChatvoteSwiperStore(
    (state) => state.showSkipDisclaimer,
  );
  const setShowSkipDisclaimer = useChatvoteSwiperStore(
    (state) => state.setShowSkipDisclaimer,
  );
  const disclaimerShown = useChatvoteSwiperStore(
    (state) => state.skipDisclaimerShown,
  );
  const setSkipDisclaimerShown = useChatvoteSwiperStore(
    (state) => state.setSkipDisclaimerShown,
  );

  const handleClick = () => {
    if (disclaimerShown) {
      return onClick();
    }

    setShowSkipDisclaimer(!showSkipDisclaimer);
    setSkipDisclaimerShown(true);
  };

  const handleStartChat = () => {
    setShowSkipDisclaimer(false);
    expandChat(true);
  };

  const handleSkip = () => {
    setShowSkipDisclaimer(false);
    onClick();
  };

  return (
    <Popover open={showSkipDisclaimer} onOpenChange={setSkipDisclaimerShown}>
      <RadixPopover.Anchor asChild>
        <Button
          variant="outline"
          className={cn(
            "size-14 rounded-full border-4 transition-all duration-200 ease-in-out md:hover:scale-[1.18]",
            !clicked && variant.hover,
            clicked && variant.normal,
          )}
          onClick={handleClick}
        >
          {variant.icon}
        </Button>
      </RadixPopover.Anchor>

      <PopoverContent side="top" sideOffset={12}>
        <h1 className="font-bold">
          Voulez-vous en savoir plus sur cette thèse ?
        </h1>
        <p className="text-muted-foreground text-sm">
          Utilisez notre <span className="font-bold">Chat</span> pour en savoir
          plus sur la thèse et prendre une{" "}
          <span className="font-bold">meilleure décision</span>.
        </p>
        <div className="mt-2 flex justify-center gap-2">
          <Button size="sm" className="grow" onClick={handleStartChat}>
            <MessageCircleMoreIcon className="size-4" />
            Démarrer le chat
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="aspect-square"
            onClick={handleSkip}
          >
            <ChevronsRightIcon className="size-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChatvoteSwiperSkipButton;
