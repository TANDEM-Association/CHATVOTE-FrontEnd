'use client';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/chat/responsive-drawer-dialog';
import { useEffect, useState } from 'react';

function WahlSwiperExperimentalDisclaimer() {
  const t = useTranslations('swiper');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>{t('disclaimer-title')}</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            {t('disclaimer-subtitle')}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <p className="px-4 text-sm md:px-0">
          {t('disclaimer-intro')}
          <span className="my-2 block rounded-md border border-border bg-muted p-4 font-semibold">
            {t('disclaimer-warning')}
          </span>
          {t('disclaimer-feedback')}
          <span className="mt-2 block font-semibold">
            {t('disclaimer-thanks')}
          </span>
        </p>

        <ResponsiveDialogFooter>
          <ResponsiveDialogClose asChild>
            <Button className="w-full">{t('lets-go')}</Button>
          </ResponsiveDialogClose>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export default WahlSwiperExperimentalDisclaimer;
