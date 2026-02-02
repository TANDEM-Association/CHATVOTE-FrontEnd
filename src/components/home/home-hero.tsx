"use client";

import ChatGroupPartySelect from "@components/chat/chat-group-party-select";
import { Button } from "@components/ui/button";
import { GitCompareIcon, MousePointerClickIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export const HomeHero = () => {
  const t = useTranslations("home");

  return (
    <div className="mt-4 flex w-full flex-row items-center justify-center gap-2">
      <MousePointerClickIcon />
      <h1 className="text-center text-sm font-semibold">{t("selectParty")}</h1>
    </div>
  );
};

export const HomeCompareButton = () => {
  const t = useTranslations("home");

  return (
    <div className="w-full">
      <ChatGroupPartySelect>
        <Button
          className="border-border mt-4 w-full max-w-xl border whitespace-normal"
          variant="secondary"
        >
          <GitCompareIcon />
          {t("compareParties")}
        </Button>
      </ChatGroupPartySelect>
    </div>
  );
};
