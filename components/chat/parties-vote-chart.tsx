import type { Vote } from '@/lib/socket.types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useMemo } from 'react';
import VoteChart from './vote-chart';
import { useParties } from '../providers/parties-provider';
import { useChatVotingDetails } from '../providers/chat-voting-details-provider';

type Props = {
  vote: Vote;
};

function PartiesVoteChart({ vote }: Props) {
  const { selectedPartyId, setSelectedPartyId } = useChatVotingDetails();

  const parties = useParties();
  const byParty = vote.voting_results.by_party;

  const partyNamesAndKeys = useMemo(() => {
    return byParty.map((party) => ({
      key: party.party,
      name:
        party.party === 'fraktionslose'
          ? 'Fraktionslose'
          : (parties?.find((p) => p.party_id === party.party)?.name ??
            party.party),
    }));
  }, [byParty, parties]);

  const selectedPartyData = useMemo(() => {
    return byParty.find((party) => party.party === selectedPartyId);
  }, [byParty, selectedPartyId]);

  if (!selectedPartyData) {
    return null;
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 flex-1">
      <VoteChart
        voteResults={selectedPartyData}
        memberCount={selectedPartyData.members}
      />

      <div className="grow flex flex-col items-center justify-center">
        <Select
          defaultValue={selectedPartyId}
          value={selectedPartyId}
          onValueChange={setSelectedPartyId}
        >
          <SelectTrigger className="h-8 w-[130px] rounded-lg">
            <SelectValue placeholder="Wähle eine Partei" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {partyNamesAndKeys.map((party) => (
                <SelectItem key={party.key} value={party.key}>
                  {party.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}

export default PartiesVoteChart;
