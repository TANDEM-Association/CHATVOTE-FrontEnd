import Link from "next/link";

import { ArrowRightIcon } from "lucide-react";

import Logo from "@/components/chat/logo";
import { Button } from "@/components/ui/button";

import ChatvoteSwiperTeaserVector from "./chatvote-swiper-teaser-vector";

const SwiperTeaserCard = () => {
  return (
    <div className="border-border bg-muted relative h-[250px] overflow-hidden rounded-md border p-6 text-center md:col-span-2 md:h-[174px] md:text-left">
      <div className="flex items-center justify-center gap-2 md:justify-normal">
        <Logo className="w-6" variant="small" />
        <p className="text-lg font-bold italic">Swiper</p>
      </div>

      <p className="mt-2 text-sm text-black/70 dark:text-white/70">
        Trouvez maintenant le parti qui vous correspond.
      </p>

      <Button className="relative z-10 mt-2" asChild>
        <Link href="/swiper">
          Chatvote Swiper
          <ArrowRightIcon className="size-4" />
        </Link>
      </Button>

      <div className="absolute inset-x-0 bottom-[-36px] mx-auto w-[90%] max-w-[285px] md:absolute md:top-0 md:right-0 md:bottom-auto md:left-auto md:mx-0 md:w-1/3 md:scale-125 md:rotate-12">
        <ChatvoteSwiperTeaserVector />
      </div>
    </div>
  );
};

export default SwiperTeaserCard;
