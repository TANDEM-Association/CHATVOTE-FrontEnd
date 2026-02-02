"use client";

import Link from "next/link";

import DonationDialog from "@components/donation-dialog";
import { Button } from "@components/ui/button";
import { config } from "@config";
import { HeartHandshakeIcon, UsersRoundIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const websiteUrl = config.websiteUrl;
const aboutPage = `${websiteUrl}/about`;

const SupportUsCard = () => {
  const t = useTranslations("home");
  const tNav = useTranslations("navigation");

  return (
    <div className="border-border flex flex-col overflow-hidden rounded-md border">
      <div className="flex flex-col p-4">
        <h2 className="font-bold">{t("supportUsTitle")}</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          {t("supportUsDescription")}
        </p>
        <div className="flex w-full flex-row gap-2 [&_button]:w-full">
          <DonationDialog>
            <Button>
              <HeartHandshakeIcon /> {tNav("donate")}
            </Button>
          </DonationDialog>
          <Button variant="secondary" className="w-full" asChild>
            <Link href={aboutPage}>
              <UsersRoundIcon />
              {tNav("about")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupportUsCard;
