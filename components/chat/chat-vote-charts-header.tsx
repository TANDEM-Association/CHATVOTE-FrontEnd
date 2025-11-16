import type { Vote } from '@/lib/socket.types';
import OverallVoteChart from './overall-vote-chart';
import { Separator } from '../ui/separator';
import PartiesVoteChart from './parties-vote-chart';
import useCarouselCurrentIndex from '@/lib/hooks/use-carousel-current-index';

type Props = {
  votes: Vote[];
};

function ChatVoteChartsHeader({ votes }: Props) {
  const selectedIndex = useCarouselCurrentIndex();

  const vote = votes[selectedIndex];

  return (
    <>
      <div className="grid grid-cols-2 md:flex gap-0 mb-0 mt-8 md:mt-12 justify-center px-4">
        <OverallVoteChart vote={vote} />
        <Separator
          orientation="vertical"
          className="h-[100px] my-auto hidden md:block"
        />
        <PartiesVoteChart vote={vote} />
      </div>

      <div className="flex flex-row gap-4 text-sm text-muted-foreground flex-wrap justify-center items-center mt-4 p-4">
        <p>
          <span className="size-2 bg-[hsl(var(--chart-yes))] rounded-full inline-block mr-2" />
          Ja
        </p>
        <p>
          <span className="size-2 bg-[hsl(var(--chart-no))] rounded-full inline-block mr-2" />
          Nein
        </p>
        <p>
          <span className="size-2 bg-[hsl(var(--chart-abstain))] rounded-full inline-block mr-2" />
          Enthaltung
        </p>
        <p>
          <span className="size-2 bg-[hsl(var(--chart-not-voted))] rounded-full inline-block mr-2" />
          Nicht abgestimmt
        </p>
      </div>

      <Separator className="mt-2" />
    </>
  );
}

export default ChatVoteChartsHeader;
