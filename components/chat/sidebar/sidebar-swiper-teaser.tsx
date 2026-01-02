import Logo from '@/components/chat/logo';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

function SidebarSwiperTeaser() {
  const t = useTranslations('home');

  return (
    <div className="mt-4 flex flex-col items-center justify-center overflow-hidden rounded-md border border-border bg-muted p-4 text-center">
      <div className="flex items-center justify-center gap-2">
        <Logo className="w-6" variant="small" />
        <p className="text-lg font-bold italic">Swiper</p>
      </div>

      <p className="mt-2 text-center text-sm text-black/70 dark:text-white/70">
        {t('swiper-description')}
      </p>

      <Button className="relative z-10 mt-2" asChild>
        <Link href="/swiper">
          {t('swiper-button')}
          <ArrowRightIcon className="size-4" />
        </Link>
      </Button>
    </div>
  );
}

export default SidebarSwiperTeaser;
