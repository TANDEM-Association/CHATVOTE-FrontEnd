"use client";

import { useState } from "react";

import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/chat/responsive-drawer-dialog";
import { Button } from "@/components/ui/button";

const ChatvoteSwiperExperimentalDisclaimer = () => {
  const [open, setOpen] = useState(true);

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>⚠️ Avertissement</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Fonctionnalité expérimentale
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <p className="px-4 text-sm md:px-0">
          Vous avez souhaité une sorte de comparateur politique – voici une
          première tentative de mettre en œuvre vos retours.
          <span className="border-border bg-muted my-2 block rounded-md border p-4 font-semibold">
            Nous tenons à souligner expressément qu&lsquo;il ne s&lsquo;agit que
            d&lsquo;une première ébauche et non d&lsquo;une recommandation de
            vote officielle.
          </span>
          Vos retours nous aident à développer une version finale pour les
          prochaines élections qui résout les problèmes existants.
          <span className="mt-2 block font-semibold">
            Merci pour votre compréhension 🙏 - nous attendons vos retours avec
            impatience ! 🤗
          </span>
        </p>

        <ResponsiveDialogFooter>
          <ResponsiveDialogClose asChild>
            <Button className="w-full">C&apos;est parti !</Button>
          </ResponsiveDialogClose>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default ChatvoteSwiperExperimentalDisclaimer;
