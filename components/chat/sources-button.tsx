import { useMemo } from "react";

import { BookMarkedIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Source } from "@/lib/stores/chat-store.types";
import { buildPdfUrl, cn, prettyDate } from "@/lib/utils";

import { ChatMessageIcon } from "./chat-message-icon";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "./responsive-drawer-dialog";

type Props = {
  sources: Source[];
  messageContent: string;
};

type SourceWithIndex = Source & { index: number };

function SourcesButton({ sources, messageContent }: Props) {
  const buildSourceKey = (source: Source, index: number) =>
    `${source.source}-${source.page}-${index}`;

  const [sourcesReferenced, sourcesNotReferenced] = useMemo(() => {
    const regex = /\[(\d+(?:\s*,\s*\d+)*)\]/g;
    const matches = messageContent.match(regex);

    const numbers = matches?.flatMap((match) => {
      const numbers = match.match(/^\[(\d+(?:\s*,\s*\d+)*)\]$/);

      if (!numbers) return [];
      const numbersArray = numbers[1].split(",");
      return numbersArray.map((number) => Number.parseInt(number));
    });

    const uniqueNumbers = [...new Set(numbers)];

    const sourcesReferenced = uniqueNumbers.map((number) => ({
      ...sources[number],
      index: number,
    }));

    const notReferencedNumbers = sources
      .map((_, index) => index)
      .filter((number) => !uniqueNumbers.includes(number));

    const sourcesNotReferenced = notReferencedNumbers.map((number) => ({
      ...sources[number],
      index: number,
    }));

    return [
      sourcesReferenced.sort((a, b) => a.index - b.index),
      sourcesNotReferenced.sort((a, b) => a.index - b.index),
    ];
  }, [messageContent, sources]);

  if (sourcesReferenced.length === 0 && sourcesNotReferenced.length === 0) {
    return null;
  }

  return (
    <ResponsiveDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <ResponsiveDialogTrigger asChild>
            <Button
              variant="outline"
              className="h-8 px-2 text-xs group-data-[has-message-background]:bg-zinc-100 group-data-[has-message-background]:hover:bg-zinc-200 group-data-[has-message-background]:dark:bg-zinc-900 group-data-[has-message-background]:dark:hover:bg-zinc-800"
            >
              <BookMarkedIcon />
              Sources
            </Button>
          </ResponsiveDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Sources</TooltipContent>
      </Tooltip>
      <ResponsiveDialogContent className="flex max-h-[95dvh] flex-col">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Sources</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Cliquez sur une source pour l&lsquo;ouvrir dans une nouvelle
            fenêtre.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <div className={cn("flex grow flex-col overflow-y-auto p-4 md:p-0")}>
          {sourcesReferenced.length > 0 && (
            <p className="text-sm font-bold">Référencé dans le texte :</p>
          )}
          {sourcesReferenced.map((source, index) => (
            <SourceItem key={buildSourceKey(source, index)} source={source} />
          ))}
          {sourcesNotReferenced.length > 0 && (
            <p
              className={cn(
                "text-sm font-bold",
                sourcesReferenced.length > 0 && "mt-4",
              )}
            >
              Analysé en plus :
            </p>
          )}
          {sourcesNotReferenced.map((source, index) => (
            <SourceItem key={buildSourceKey(source, index)} source={source} />
          ))}
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

function SourceItem({ source }: { source: SourceWithIndex }) {
  const onSourceClick = (source: Source) => {
    const url = buildPdfUrl(source);
    return window.open(url.toString(), "_blank");
  };

  return (
    <button
      className="hover:bg-muted/50 flex flex-row items-center justify-between gap-2 rounded-md p-2 transition-colors"
      onClick={() => onSourceClick(source)}
      type="button"
    >
      <div className="flex grow flex-col justify-start overflow-hidden">
        <div className="flex grow flex-row items-center gap-2">
          <div className="bg-muted inline-flex size-5 items-center justify-center rounded-full text-xs">
            {source.index + 1}
          </div>{" "}
          <p className="grow truncate text-start">{source.source}</p>
        </div>
        {source.document_publish_date && (
          <span className="text-muted-foreground text-left text-xs">
            Publié le :{" "}
            <span className="font-bold">
              {prettyDate(source.document_publish_date)}
            </span>
          </span>
        )}
      </div>
      <p className="bg-muted text-muted-foreground flex h-8 items-center justify-center rounded-md px-2 text-xs whitespace-nowrap">
        S. {source.page}
      </p>
      {source.party_id && <ChatMessageIcon partyId={source.party_id} />}
    </button>
  );
}

export default SourcesButton;
