import ComputerBildIcon from "@/components/icons/computer-bild-icon";
import HandelsblattIcon from "@/components/icons/handelsblatt-icon";
import SWRIcon from "@/components/icons/swr-icon";
import ZdfHeuteIcon from "@/components/icons/zdf-heute-icon";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

function KnownFrom({ className }: Props) {
  const iconClassNames =
    "size-full px-[0%] opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 ease-in-out";

  return (
    <section
      className={cn(
        "my-6 flex w-full flex-col items-center justify-center gap-4 md:mt-10",
        className,
      )}
    >
      <div className="flex w-full flex-row items-center gap-4">
        <Separator className="w-auto grow" />
        <p className="text-muted-foreground text-xs font-medium opacity-50">
          Vu dans :
        </p>
        <Separator className="w-auto grow" />
      </div>
      <div className="grid h-16 w-full grid-cols-4 items-center justify-center gap-8">
        <HandelsblattIcon className={iconClassNames} />
        <ZdfHeuteIcon className={iconClassNames} />
        <SWRIcon className={iconClassNames} />
        <ComputerBildIcon className={iconClassNames} />
        {/* <SWRIcon className={iconClassNames} />
        <SueddeutscheZeitungIcon className={iconClassNames} /> */}
      </div>
      <Separator className="mt-2 w-full" />
    </section>
  );
}

export default KnownFrom;
