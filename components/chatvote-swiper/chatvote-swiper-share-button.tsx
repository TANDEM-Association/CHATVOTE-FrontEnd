"use client";

import { ShareIcon } from "lucide-react";

import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/chat/responsive-drawer-dialog";
import { Button } from "@/components/ui/button";
import {} from "@/components/ui/tooltip";

import ChatvoteSwiperShareLinkInputForm from "./chatvote-swiper-share-input-form";

const ChatvoteSwiperShareButton = () => {
  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger asChild>
        <Button variant="secondary">
          <ShareIcon />
          Partager
        </Button>
      </ResponsiveDialogTrigger>

      <ResponsiveDialogContent className="sm:max-w-md">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>
            Partager le résultat du Swiper
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Toute personne disposant de ce lien pourra voir ce résultat.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <div className="p-4 md:p-0">
          <ChatvoteSwiperShareLinkInputForm />
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default ChatvoteSwiperShareButton;
