"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowUpDown, Eye, EyeClosed, SparkleIcon } from "lucide-react";

import { Markdown } from "@/components/markdown";
import { useChatStore } from "@/components/providers/chat-store-provider";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buildProConPerspectiveSeparatorId } from "@/lib/scroll-constants";
import {
  chatViewScrollToProConPerspectiveContainer,
  scrollMessageIntoView,
} from "@/lib/scroll-utils";
import { type StreamingMessage } from "@/lib/socket.types";
import { type MessageItem } from "@/lib/stores/chat-store.types";
import { cn, prettifiedUrlName } from "@/lib/utils";

import AnimatedMessageSequence from "./animated-message-sequence";
import ChatGroupProConEmblaReinit from "./chat-group-pro-con-embla-reinit";

type Props = {
  message: MessageItem | StreamingMessage;
  isGroupChat?: boolean;
};

const ChatProConExpandable = ({ message, isGroupChat }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLoadingProConPerspective = useChatStore(
    (state) => state.loading.proConPerspective === message.id,
  );
  const [prevIsLoadingProConPerspective, setPrevIsLoadingProConPerspective] =
    useState(isLoadingProConPerspective);

  const proConMessage = message.pro_con_perspective;

  const isFirstRender = useRef(true);

  // Adjust state during render (React-recommended pattern for prop/state transitions)
  if (prevIsLoadingProConPerspective !== isLoadingProConPerspective) {
    setPrevIsLoadingProConPerspective(isLoadingProConPerspective);
    if (prevIsLoadingProConPerspective && !isLoadingProConPerspective) {
      setIsExpanded(true);
    }
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isExpanded) {
      chatViewScrollToProConPerspectiveContainer(message.id);
    } else {
      scrollMessageIntoView(message.id);
    }
  }, [isExpanded, message.id]);

  const emblaReinitComponent = isGroupChat ? (
    <ChatGroupProConEmblaReinit
      messageId={message.id}
      isExpanded={isExpanded}
    />
  ) : null;

  if (isLoadingProConPerspective) {
    return (
      <>
        <Separator />
        <div className="flex items-center gap-4">
          <SparkleIcon className="text-muted-foreground size-4 animate-spin [animation-duration:4s]" />

          <AnimatedMessageSequence
            className="text-muted-foreground"
            messages={[
              "Compréhension du sujet...",
              "Analyse de la faisabilité...",
              "Identification des effets à court terme...",
              "Identification des effets à long terme...",
              "Finalisation de l&lsquo;analyse...",
            ]}
          />
        </div>
        {emblaReinitComponent}
      </>
    );
  }

  if (!proConMessage) {
    return null;
  }

  const onReferenceClick = (number: number) => {
    if (number < 0 || number >= proConMessage.sources.length) {
      return;
    }

    const source = proConMessage.sources[number];
    window.open(source.source, "_blank");
  };

  const getReferenceTooltip = (number: number) => {
    if (number < 0 || number >= proConMessage.sources.length) {
      return null;
    }

    const source = proConMessage.sources[number];
    if (!source) {
      return null;
    }

    return source.source;
  };

  const getReferenceName = (number: number) => {
    if (number < 0 || number >= proConMessage.sources.length) {
      return null;
    }

    const source = proConMessage.sources[number];
    if (!source) {
      return null;
    }

    return prettifiedUrlName(source.source);
  };

  return (
    <>
      <Separator id={buildProConPerspectiveSeparatorId(message.id)} />
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent asChild>
          <Markdown
            getReferenceTooltip={getReferenceTooltip}
            getReferenceName={getReferenceName}
            onReferenceClick={onReferenceClick}
          >
            {proConMessage.content}
          </Markdown>
        </CollapsibleContent>
        <div
          className={cn(
            "mt-0 flex flex-row items-center justify-between",
            isExpanded && "mt-4",
          )}
        >
          {!isExpanded ? (
            <p className="text-muted-foreground text-xs">
              Ce message contient une{" "}
              <span className="font-bold">position évaluée</span>.
            </p>
          ) : (
            <span className="text-muted-foreground flex flex-row items-center gap-2 text-xs">
              <ArrowUpDown className="size-4" />
              Faites défiler pour plus
            </span>
          )}
          <Tooltip>
            <CollapsibleTrigger asChild>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  {isExpanded ? <EyeClosed /> : <Eye />}
                </Button>
              </TooltipTrigger>
            </CollapsibleTrigger>
            <TooltipContent>
              {isExpanded ? "Masquer" : "Afficher"}
            </TooltipContent>
          </Tooltip>
        </div>
      </Collapsible>
      {emblaReinitComponent}
    </>
  );
};

export default ChatProConExpandable;
