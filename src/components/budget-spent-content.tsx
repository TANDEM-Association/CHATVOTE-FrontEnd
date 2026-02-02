"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import DonationDialog from "@components/donation-dialog";
import { Button } from "@components/ui/button";
import { config } from "@config";
import { BadgeEuroIcon, HeartHandshakeIcon } from "lucide-react";

const websiteUrl = config.websiteUrl;
const aboutPage = `${websiteUrl}/about`;

const BudgetSpentContent = () => {
  const t = useTranslations("budgetSpent");
  const tNav = useTranslations("navigation");

  return (
    <section className="mx-auto flex h-full max-w-lg flex-col items-center justify-center space-y-4 p-4 text-center">
      <BadgeEuroIcon className="size-12" />
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p>{t("description")}</p>
      <p>{t("supportUs")}</p>
      <div className="flex justify-center gap-2">
        <DonationDialog>
          <Button>
            <HeartHandshakeIcon />
            {tNav("supportUs")}
          </Button>
        </DonationDialog>
        <Button variant="outline" asChild>
          <Link href={aboutPage} target="_blank">
            {tNav("about")}
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default BudgetSpentContent;
