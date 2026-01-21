import Link from "next/link";

import { PRESS_LINK } from "@/lib/contact-config";

import Logo from "./chat/logo";
import { ThemeModeToggle } from "./chat/theme-mode-toggle";
import FeedbackDialog from "./feedback-dialog";

function Footer() {
  return (
    <footer className="h-footer text-muted-foreground flex w-full flex-col items-center justify-center gap-4 border-t p-4 text-xs md:flex-row">
      <Logo className="size-5" variant="small" />

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
}

export default Footer;
