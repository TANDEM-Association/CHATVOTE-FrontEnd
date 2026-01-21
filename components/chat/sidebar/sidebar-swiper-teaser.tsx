import Link from "next/link";

import { ArrowRightIcon } from "lucide-react";

import Logo from "@/components/chat/logo";
import { Button } from "@/components/ui/button";

function SidebarSwiperTeaser() {
  return (
    <div className="border-border bg-muted mt-4 flex flex-col items-center justify-center overflow-hidden rounded-md border p-4 text-center">
      <div className="flex items-center justify-center gap-2">
        <Logo className="w-6" variant="small" />
        <p className="text-lg font-bold italic">Swiper</p>
      </div>

      <p className="mt-2 text-center text-sm text-black/70 dark:text-white/70">
        Trouvez le parti qui vous correspond.
      </p>

      <Button className="relative z-10 mt-2" asChild>
        <Link href="/swiper">
          Chatvote Swiper
          <ArrowRightIcon className="size-4" />
        </Link>
      </Button>
    </div>
  );
}

export default SidebarSwiperTeaser;
