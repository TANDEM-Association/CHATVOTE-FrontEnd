"use client";

import Link from "next/link";

import { Button } from "@components/ui/button";
import { HomeIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const ChatHeaderHomeButton = () => {
  const t = useTranslations("navigation");

  return (
    <Button
      variant="ghost"
      size="icon"
      asChild
      className="size-8"
      tooltip={t("home")}
    >
      <Link href="/">
        <HomeIcon className="size-4" />
      </Link>
    </Button>
  );
};

export default ChatHeaderHomeButton;
