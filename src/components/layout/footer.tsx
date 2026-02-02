"use client";

import Image from "next/image";
import Link from "next/link";

import { ThemeModeToggle } from "@components/chat/theme-mode-toggle";
import FeedbackDialog from "@components/feedback-dialog";
import { config } from "@config";
import { PRESS_LINK } from "@lib/contact-config";
import { useTranslations } from "next-intl";

const websiteUrl = config.websiteUrl;
const aboutPage = `${websiteUrl}/about`;

export const Footer: React.FC = () => {
  const t = useTranslations("navigation");

  return (
    <footer className="h-footer text-muted-foreground flex w-full flex-col items-center justify-center gap-4 border-t p-4 text-xs md:flex-row">
      <Image
        src="/images/logos/chatvote.svg"
        alt="chatvote"
        width={0}
        height={0}
        sizes="100vw"
        className="size-5"
      />

      <section className="flex grow flex-wrap items-center justify-center gap-2 underline md:justify-end">
        <Link href="/guide">{t("guide")}</Link>
        <Link href="/donate">{t("donate")}</Link>
        <Link href={aboutPage}>{t("about")}</Link>
        <Link href="/sources">{t("sources")}</Link>
        <Link href={PRESS_LINK} target="_blank">
          {t("press")}
        </Link>
        <FeedbackDialog>
          <button type="button">{t("feedback")}</button>
        </FeedbackDialog>
        <Link href="/legal-notice">{t("legalNotice")}</Link>
        <Link href="/privacy-policy">{t("privacyPolicy")}</Link>
      </section>

      <ThemeModeToggle />
    </footer>
  );
};
