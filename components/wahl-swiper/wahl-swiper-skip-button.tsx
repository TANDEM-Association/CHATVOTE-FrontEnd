import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import type { WahlSwiperButtonVariant } from './wahl-swiper-button';
import { Popover, PopoverContent } from '../ui/popover';
import * as RadixPopover from '@radix-ui/react-popover';
import { ChevronsRightIcon, MessageCircleMoreIcon } from 'lucide-react';
import { useWahlSwiperStore } from '../providers/wahl-swiper-store-provider';
import { useTranslations } from 'next-intl';

type Props = {
  variant: WahlSwiperButtonVariant;
  clicked: boolean;
  onClick: () => void;
};

function WahlSwiperSkipButton({ variant, clicked, onClick }: Props) {
  const t = useTranslations('swiper');
  const expandChat = useWahlSwiperStore((state) => state.setChatIsExpanded);
  const showSkipDisclaimer = useWahlSwiperStore(
    (state) => state.showSkipDisclaimer,
  );
  const setShowSkipDisclaimer = useWahlSwiperStore(
    (state) => state.setShowSkipDisclaimer,
  );
  const disclaimerShown = useWahlSwiperStore(
    (state) => state.skipDisclaimerShown,
  );
  const setSkipDisclaimerShown = useWahlSwiperStore(
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
            'size-14 rounded-full transition-all duration-200 border-4 md:hover:scale-[1.18] ease-in-out',
            !clicked && variant.hover,
            clicked && variant.normal,
          )}
          onClick={handleClick}
        >
          {variant.icon}
        </Button>
      </RadixPopover.Anchor>

      <PopoverContent side="top" sideOffset={12}>
        <h1 className="font-bold">{t('skip-disclaimer-title')}</h1>
        <p className="text-sm text-muted-foreground">
          {t.rich('skip-disclaimer-description', {
            boldChat: (chunks) => <span className="font-bold">{chunks}</span>,
            boldDecision: (chunks) => (
              <span className="font-bold">{chunks}</span>
            ),
          })}
        </p>
        <div className="flex justify-center mt-2 gap-2">
          <Button size="sm" className="grow" onClick={handleStartChat}>
            <MessageCircleMoreIcon className="size-4" />
            {t('start-chat-button')}
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
}

export default WahlSwiperSkipButton;
