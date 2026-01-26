import Image from "next/image";
import Link from "next/link";

import { LibraryBigIcon, XIcon } from "lucide-react";

import RtlIcon from "@/components/icons/rtl-icon";
import { Button } from "@/components/ui/button";

function SidebarTvTeaser() {
  return (
    <div className="border-border bg-muted relative mt-4 overflow-hidden rounded-md border p-6 text-center">
      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center justify-center gap-4">
        <Image
          src="/images/logos/chatvote.svg"
          alt="chatvote"
          width={0}
          height={0}
          sizes="100vw"
          className="ml-auto w-12"
        />
        <XIcon className="size-4" />
        <RtlIcon className="mr-auto w-24" />
      </div>

      <p className="mt-2 text-sm text-black/70 dark:text-white/70">
        Vous avez manqué le débat ? <br /> Comparez les sujets chez nous.
      </p>

      <Button className="relative z-10 mt-2" asChild>
        <Link href="/topics">
          <LibraryBigIcon />
          Sujets actuels
        </Link>
      </Button>
    </div>
  );
}

export default SidebarTvTeaser;
