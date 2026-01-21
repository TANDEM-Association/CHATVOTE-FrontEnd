import React, { useMemo } from "react";

import { type Vote } from "@/lib/socket.types";

import VoteChart from "./vote-chart";

type Props = {
  vote: Vote;
};

function OverallVoteChart({ vote }: Props) {
  const [resultStatement, percentageStatement] = useMemo(() => {
    const { yes, no, abstain } = vote.voting_results.overall;

    const totalVotes = yes + no + abstain;

    if (totalVotes === 0) {
      return [
        "Aucun vote valide enregistré",
        "Aucun résultat n&lsquo;a pu être déterminé",
      ];
    }

    let outcome: string;
    let percentage: number;

    if (yes > no) {
      outcome = "adopté";
      percentage = (yes / totalVotes) * 100;
    } else if (no > yes) {
      outcome = "rejeté";
      percentage = (no / totalVotes) * 100;
    } else {
      outcome = "égalité";
      percentage = (no / totalVotes) * 100;
    }

    const resultStatement = (
      <React.Fragment>
        Motion{" "}
        <span className="font-bold">
          {outcome.charAt(0).toUpperCase() + outcome.slice(1)}.
        </span>
      </React.Fragment>
    );

    let percentageStatement: string;
    if (outcome === "égalité") {
      percentageStatement = `Motion à égalité avec ${percentage.toFixed(
        1,
      )}% des voix chacun.`;
    } else {
      percentageStatement = `Motion ${outcome} avec ${percentage.toFixed(1)}% des voix.`;
    }

    return [resultStatement, percentageStatement];
  }, [vote.voting_results.overall]);

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4">
      <VoteChart
        voteResults={vote.voting_results.overall}
        memberCount={vote.voting_results.overall.members}
      />

      <div className="flex flex-col items-center justify-center text-center">
        <p>{resultStatement}</p>
        <p className="text-muted-foreground text-xs">{percentageStatement}</p>
      </div>
    </section>
  );
}

export default OverallVoteChart;
