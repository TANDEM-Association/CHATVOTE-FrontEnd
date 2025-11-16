import type { Vote } from '@/lib/socket.types';
import { useChatVotingDetails } from '../providers/chat-voting-details-provider';

type Props = {
  vote: Vote;
};

function ChatVotingBehaviorDetailJustification({ vote }: Props) {
  const { selectedPartyId } = useChatVotingDetails();

  const party = vote.voting_results.by_party.find(
    (party) => party.party === selectedPartyId
  );

  if (!party || !party.justification) return null;

  return (
    <>
      <h2 className="text-base font-bold pt-4 pb-2">Begründung</h2>
      <p className="text-sm text-muted-foreground">{party.justification}</p>
    </>
  );
}

export default ChatVotingBehaviorDetailJustification;
