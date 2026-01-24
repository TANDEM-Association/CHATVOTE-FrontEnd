import { useEffect, useMemo } from "react";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

type Props = {
  selectedPartyIds: string[];
  onSubmit: () => void;
  addPartiesToChat?: boolean;
};

const ChatGroupPartySelectSubmitButton = ({
  selectedPartyIds,
  onSubmit,
  addPartiesToChat,
}: Props) => {
  const router = useRouter();

  const navigateUrl = useMemo(() => {
    const searchParams = new URLSearchParams();
    selectedPartyIds.forEach((partyId) => {
      searchParams.append("party_id", partyId);
    });

    return `/session?${searchParams.toString()}`;
  }, [selectedPartyIds]);

  const handleSubmit = () => {
    onSubmit();
    if (!addPartiesToChat) {
      router.push(navigateUrl);
    }
  };

  useEffect(() => {
    if (!addPartiesToChat) {
      router.prefetch(navigateUrl);
    }
  }, [addPartiesToChat, navigateUrl, router]);

  return (
    <Button className="w-full" onClick={handleSubmit}>
      {addPartiesToChat ? "Modifier les partis" : "Démarrer le chat comparatif"}
    </Button>
  );
};

export default ChatGroupPartySelectSubmitButton;
