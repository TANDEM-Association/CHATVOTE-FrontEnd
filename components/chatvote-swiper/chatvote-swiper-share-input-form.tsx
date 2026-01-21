"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useParams } from "next/navigation";

import { track } from "@vercel/analytics/react";
import { ShareIcon } from "lucide-react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

import CopyButton from "@/components/chat/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setChatvoteSwiperResultToPublic } from "@/lib/firebase/firebase";

const ChatvoteSwiperShareLinkInputForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { resultId } = useParams();

  const link = useMemo(() => {
    return `${window.location.origin}/swiper/results/${resultId}`;
  }, [resultId]);

  const loadShareableSession = useCallback(async () => {
    try {
      setIsLoading(true);
      await setChatvoteSwiperResultToPublic(resultId as string);

      track("share_link_generated");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [resultId]);

  useEffect(() => {
    loadShareableSession();
  }, [loadShareableSession]);

  const handleNativeShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title: "Résultat Chatvote Swiper",
        url: link,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="link" className="sr-only">
            Lien
          </Label>
          <Input id="link" value={link} readOnly disabled={isLoading} />
        </div>
        <CopyButton size="icon" text={link} loading={isLoading} />
      </div>
      <div className="flex items-center gap-2">
        <WhatsappShareButton
          className="aspect-square w-fit"
          url={link}
          title="Résultat Chatvote Swiper"
          separator=" - "
        >
          <WhatsappIcon size={30} borderRadius={10} />
        </WhatsappShareButton>
        <TwitterShareButton
          url={link}
          title="Résultat Chatvote Swiper"
          hashtags={["Chatvote", "Elections"]}
          via="chatvote_fr"
        >
          <XIcon size={30} borderRadius={10} />
        </TwitterShareButton>
        <LinkedinShareButton url={link} title="Résultat Chatvote Swiper">
          <LinkedinIcon size={30} borderRadius={10} />
        </LinkedinShareButton>
        <FacebookShareButton url={link} hashtag="#Chatvote">
          <FacebookIcon size={30} borderRadius={10} />
        </FacebookShareButton>
        <Button
          variant="secondary"
          size="icon"
          className="size-8"
          onClick={handleNativeShare}
        >
          <ShareIcon />
        </Button>
      </div>
    </div>
  );
};

export default ChatvoteSwiperShareLinkInputForm;
