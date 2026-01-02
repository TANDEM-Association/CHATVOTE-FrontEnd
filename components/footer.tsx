import { Link } from '@/i18n/routing';
import { PRESS_LINK } from '@/lib/contact-config';
import { ThemeModeToggle } from './chat/theme-mode-toggle';
import Logo from './chat/logo';
import FeedbackDialog from './feedback-dialog';
import { getTranslations } from 'next-intl/server';

async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="flex h-footer w-full flex-col items-center justify-center gap-4 border-t p-4 text-xs text-muted-foreground md:flex-row">
      <Logo className="size-5" variant="small" />

      <section className="flex grow flex-wrap items-center justify-center gap-2 underline md:justify-end">
        <Link href="/how-to">{t('how-to')}</Link>
        <Link href="/donate">{t('donate')}</Link>
        <Link href="/about-us">{t('about-us')}</Link>
        <Link href="/sources">{t('sources')}</Link>
        <Link href={PRESS_LINK} target="_blank">
          {t('press')}
        </Link>
        <FeedbackDialog>
          <button type="button">{t('feedback')}</button>
        </FeedbackDialog>
        <Link href="/impressum">{t('imprint')}</Link>
        <Link href="/datenschutz">{t('privacy')}</Link>
      </section>

      <ThemeModeToggle />
    </footer>
  );
}

export default Footer;
