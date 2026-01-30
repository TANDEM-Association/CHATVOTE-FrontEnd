"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { track } from "@vercel/analytics/react";
import { MessageCircleIcon, UsersIcon } from "lucide-react";

import {
  type Candidate,
  type Municipality,
} from "@/lib/election/election.types";
import { type PartyDetails } from "@/lib/party-details";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

import CandidateCard from "./candidate-card";

type Props = {
  candidates: Candidate[];
  parties: PartyDetails[];
  municipality: Municipality;
  selectedCandidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
  className?: string;
};

const MAX_SELECTABLE_CANDIDATES = 7;

const CandidateList = ({
  candidates,
  parties,
  municipality,
  selectedCandidates,
  onSelectCandidate,
  className,
}: Props) => {
  const router = useRouter();

  const handleStartChat = () => {
    if (selectedCandidates.length === 0) {
      return;
    }

    // Get unique party IDs from all selected candidates
    const partyIds = [
      ...new Set(selectedCandidates.flatMap((c) => c.party_ids)),
    ];

    // Track the event
    track("election_flow_chat_started", {
      municipality: municipality.nom,
      municipality_code: municipality.code,
      candidates_count: selectedCandidates.length,
      parties_count: partyIds.length,
    });

    // Navigate to chat with selected party IDs
    const partyParams = partyIds.map((id) => `party_id=${id}`).join("&");
    router.push(`/chat?${partyParams}`);
  };

  if (candidates.length === 0) {
    return (
      <div className={cn("py-8 text-center", className)}>
        <UsersIcon className="text-muted-foreground mx-auto mb-3 size-12" />
        <h3 className="font-medium">Aucun candidat trouvé</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          Il n&apos;y a pas encore de candidats enregistrés pour{" "}
          {municipality.nom}.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UsersIcon className="size-5" />
          <h2 className="text-lg font-semibold">
            Candidats à {municipality.nom}
          </h2>
        </div>
        <span className="text-muted-foreground text-sm">
          {candidates.length} candidat{candidates.length > 1 ? "s" : ""}
        </span>
      </div>

      <p className="text-muted-foreground text-sm">
        Sélectionnez un ou plusieurs candidats pour discuter avec l&apos;IA de
        leur programme.
      </p>

      {/* Candidates grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {candidates.map((candidate) => {
          const isSelected = selectedCandidates.some(
            (c) => c.candidate_id === candidate.candidate_id,
          );

          return (
            <CandidateCard
              key={candidate.candidate_id}
              candidate={candidate}
              parties={parties}
              isSelected={isSelected}
              onSelect={onSelectCandidate}
            />
          );
        })}
      </div>

      {/* Selection summary and action */}
      {selectedCandidates.length > 0 ? (
        <div className="bg-muted/50 sticky bottom-4 flex items-center justify-between gap-4 rounded-lg border p-4 shadow-lg backdrop-blur">
          <div className="flex-1">
            <p className="font-medium">
              {selectedCandidates.length} candidat
              {selectedCandidates.length > 1 ? "s" : ""} sélectionné
              {selectedCandidates.length > 1 ? "s" : ""}
            </p>
            <p className="text-muted-foreground text-xs">
              {selectedCandidates.length < MAX_SELECTABLE_CANDIDATES
                ? `Vous pouvez en sélectionner ${MAX_SELECTABLE_CANDIDATES - selectedCandidates.length} de plus`
                : "Maximum atteint"}
            </p>
          </div>
          <Button onClick={handleStartChat} className="shrink-0">
            <MessageCircleIcon className="mr-2 size-4" />
            Discuter avec l&apos;IA
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default CandidateList;
