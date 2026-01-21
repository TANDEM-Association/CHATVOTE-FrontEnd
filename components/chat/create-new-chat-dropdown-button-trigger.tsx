"use client";

import { SquarePenIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  onTriggerClick?: () => void;
};

function CreateNewChatDropdownButtonTrigger({ onTriggerClick }: Props) {
  const { isMobile, state } = useSidebar();

  if (!isMobile && state === "expanded") return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="size-8"
            onClick={onTriggerClick}
          >
            <SquarePenIcon />
          </Button>
        </DropdownMenuTrigger>
      </TooltipTrigger>
      <TooltipContent>Créer un nouveau chat</TooltipContent>
    </Tooltip>
  );
}

export default CreateNewChatDropdownButtonTrigger;
