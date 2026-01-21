import { UserIcon, UsersIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { type PartyDetails } from "@/lib/party-details";

type Props = {
  parties: PartyDetails[];
};

function PartyDetailPopover({ parties }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="size-7">
          {parties.length > 1 ? <UsersIcon /> : <UserIcon />}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="text-muted-foreground max-h-[70vh] w-72 overflow-y-auto text-xs md:w-80"
        collisionPadding={{ right: 12 }}
      >
        {parties.map((party, index) => (
          <div key={party.party_id}>
            <h1 className="text-foreground text-sm font-bold">
              {party.long_name}
            </h1>
            <p className="text-muted-foreground">{party.description}</p>
            <Separator className="my-2" />
            <p>
              Tête de liste :{" "}
              <span className="font-bold">{party.candidate}</span>
            </p>
            <p>
              En savoir plus sur le parti sur{" "}
              <a href={party.website_url} target="_blank" className="underline">
                {party.website_url}
              </a>
            </p>
            <p>
              Ou consultez le{" "}
              <a
                href={party.election_manifesto_url}
                target="_blank"
                className="underline"
              >
                programme électoral
              </a>
            </p>
            {index < parties.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default PartyDetailPopover;
