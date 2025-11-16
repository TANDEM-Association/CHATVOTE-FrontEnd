'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import ChatVoteDetailsSlideCounter from './chat-vote-details-slide-counter';
import ChatVoteDetailsHeader from './chat-vote-details-header';
import { prettifiedUrlName } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';
import ChatVoteChartsHeader from './chat-vote-charts-header';
import type { Vote } from '@/lib/socket.types';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import ChatVotingBehaviorSubmittingParties from './chat-voting-behavior-submitting-parties';
import { ChatVotingDetailsProvider } from '../providers/chat-voting-details-provider';
import { useState } from 'react';
import ChatVotingBehaviorDetailJustification from './chat-voting-behavior-detail-justification';

type Props = {
  votes: Vote[];
  startIndex?: number;
  partyId: string;
};

function ChatVotingBehaviorDetailView({
  votes,
  startIndex = 0,
  partyId,
}: Props) {
  const [selectedPartyId, setSelectedPartyId] = useState(partyId);

  return (
    <ChatVotingDetailsProvider
      selectedPartyId={selectedPartyId}
      setSelectedPartyId={setSelectedPartyId}
    >
      <Carousel
        opts={{
          startIndex,
        }}
        className="flex flex-col h-full overflow-y-auto md:overflow-y-hidden"
      >
        <ChatVoteDetailsHeader votes={votes} />

        <section className="grow md:overflow-y-auto">
          <ChatVoteChartsHeader votes={votes} />

          <CarouselContent className="pb-16 grow">
            {votes.map((vote) => (
              <CarouselItem key={vote.id}>
                <div className="p-4">
                  <div className="flex flex-row justify-between items-center">
                    <h2 className="text-base font-bold">Beschreibung</h2>
                    <Button variant="link" asChild>
                      <Link href={vote.url} target="_blank">
                        <ArrowUpRightIcon />
                        Zur Quelle
                      </Link>
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {vote.short_description}
                  </p>

                  <ChatVotingBehaviorDetailJustification vote={vote} />

                  <ChatVotingBehaviorSubmittingParties vote={vote} />

                  <p className="text-sm font-bold pt-4 pb-2">Weitere Links</p>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {vote.links.map((link, index) => (
                      <Tooltip key={link.url}>
                        <TooltipTrigger asChild>
                          <Link
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            className="flex flex-col justify-between h-20 border border-border rounded-md p-2 hover:border-primary hover:bg-muted transition-colors"
                          >
                            <p className="text-sm line-clamp-2">{link.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {prettifiedUrlName(link.url)}
                            </p>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent
                          align={index === 0 ? 'start' : 'center'}
                        >
                          <p className="text-sm max-w-[300px]">{link.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </section>
        <div className="fixed md:absolute bottom-0 left-0 right-0 flex flex-row items-center justify-center gap-4 bg-background/10 border-t border-border py-4 backdrop-blur-sm">
          <CarouselPrevious />
          <ChatVoteDetailsSlideCounter votes={votes} />
          <CarouselNext />
        </div>
      </Carousel>
    </ChatVotingDetailsProvider>
  );
}

export default ChatVotingBehaviorDetailView;
