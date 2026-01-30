import Image from "next/image";
import Link from "next/link";

import { ThemeModeToggle } from "@/components/chat/theme-mode-toggle";
import FeedbackDialog from "@/components/feedback-dialog";
import { PRESS_LINK } from "@/lib/contact-config";

export const Footer: React.FC = () => {
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
        <Link href="/how-to">Guide</Link>
        <Link href="/donate">Faire un don</Link>
        <Link href="/about-us">À propos</Link>
        <Link href="/sources">Sources</Link>
        <Link href={PRESS_LINK} target="_blank">
          Presse
        </Link>
        <FeedbackDialog>
          <button type="button">Feedback</button>
        </FeedbackDialog>
        <Link href="/legal-notice">Mentions légales</Link>
        <Link href="/privacy-policy">Confidentialité</Link>
      </section>

      <ThemeModeToggle />
    </footer>
  );
};
