import type { Vote } from '@/lib/socket.types';
import { useParties } from '../providers/parties-provider';
import { useMemo } from 'react';
import Image from 'next/image';
import { buildPartyImageUrl } from '@/lib/utils';

type Props = {
  vote: Vote;
};

function ChatVotingBehaviorSubmittingParties({ vote }: Props) {
  const parties = useParties();

  const submittingParties = useMemo(() => {
    return vote.submitting_parties
      .map((party) => parties?.find((p) => p?.party_id === party))
      .filter((p) => p !== undefined);
  }, [vote.submitting_parties, parties]);

  return (
    <>
      <p className="text-sm font-bold pt-4 pb-2">
        Einreichende{' '}
        {vote.submitting_parties.length > 1 ? 'Parteien' : 'Partei'}
      </p>

      <div className="flex flex-row flex-wrap gap-2">
        {submittingParties.map((party) => (
          <div
            className="text-xs flex flex-row items-center gap-2 bg-muted rounded-full p-2"
            key={party.party_id}
          >
            <div
              className="relative flex items-center justify-center size-6 rounded-full"
              style={{
                backgroundColor: party.background_color,
              }}
            >
              <Image
                src={buildPartyImageUrl(party.party_id)}
                alt={party.name}
                sizes="20px"
                fill
                className="rounded-full object-contain"
              />
            </div>
            {party.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default ChatVotingBehaviorSubmittingParties;
