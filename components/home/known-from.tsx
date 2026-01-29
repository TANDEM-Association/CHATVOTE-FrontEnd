"use client";

import React from "react";

import Image from "next/image";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

type PressLogo = {
  src: string;
  srcLight?: string;
  alt: string;
};

const pressLogoList: PressLogo[] = [
  {
    src: "/images/logos/press/dna.svg",
    alt: "DNA",
  },
  {
    src: "/images/logos/press/france-2.svg",
    srcLight: "/images/logos/press/france-2-dark.svg",
    alt: "France 2",
  },
  {
    src: "/images/logos/press/la-montagne.svg",
    alt: "La Montagne",
  },
  {
    src: "/images/logos/press/lcl.svg",
    alt: "LCL",
  },
  {
    src: "/images/logos/press/le-figaro.svg",
    alt: "Le Figaro",
  },
  {
    src: "/images/logos/press/le-monde.svg",
    srcLight: "/images/logos/press/Le-monde-dark.svg",
    alt: "Le Monde",
  },
  {
    src: "/images/logos/press/les-echos.svg",
    srcLight: "/images/logos/press/les-echos-dark.svg",
    alt: "Les Echos",
  },
  {
    src: "/images/logos/press/opinionway.svg",
    srcLight: "/images/logos/press/opinionway-dark.svg",
    alt: "Opinionway",
  },
  {
    src: "/images/logos/press/ouest-france.svg",
    alt: "Ouest France",
  },
  {
    src: "/images/logos/press/paris-match.svg",
    alt: "Paris Match",
  },
  {
    src: "/images/logos/press/tf1.svg",
    alt: "TF1",
  },
];

function KnownFrom({ className }: Props) {
  const [containerRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      skipSnaps: false,
    },
    [
      AutoScroll({
        playOnInit: false,
        speed: 0.4,
        direction: "forward",
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
      WheelGesturesPlugin({
        forceWheelAxis: "x",
      }),
    ],
  );

  React.useEffect(() => {
    if (emblaApi === undefined) {
      return;
    }

    const onInit = () => {
      const scrollable = emblaApi.canScrollNext() || emblaApi.canScrollPrev();

      if (scrollable === true) {
        emblaApi.plugins()?.autoScroll?.play();
      }
    };

    emblaApi.on("init", onInit);
    onInit();

    return () => {
      emblaApi.off("init", onInit);
    };
  }, [emblaApi]);

  return (
    <section
      className={cn(
        "my-6 flex w-full flex-col items-center justify-center gap-4 overflow-hidden md:mt-10",
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
      <div className="relative w-full">
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 bg-linear-to-r from-neutral-100 to-transparent dark:from-neutral-950" />
        <div ref={containerRef} className="no-scrollbar overflow-hidden">
          <div className="flex touch-pan-y flex-row gap-10">
            {pressLogoList.map((logo) => {
              return (
                <div
                  key={logo.alt}
                  className="relative flex h-10 w-24 shrink-0 items-center justify-center last:mr-10 md:h-12 md:w-28"
                >
                  {logo.srcLight !== undefined ? (
                    <React.Fragment>
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={112}
                        height={48}
                        className="hidden h-full w-full object-contain dark:block"
                      />
                      <Image
                        src={logo.srcLight}
                        alt={logo.alt}
                        width={112}
                        height={48}
                        className="block h-full w-full object-contain dark:hidden"
                      />
                    </React.Fragment>
                  ) : (
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={112}
                      height={48}
                      className="h-full w-full object-contain"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16 bg-linear-to-l from-neutral-100 to-transparent dark:from-neutral-950" />
      </div>
      <Separator className="mt-2 w-full" />
    </section>
  );
}

export default KnownFrom;
