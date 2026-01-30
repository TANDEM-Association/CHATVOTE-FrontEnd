'use client';

import { useEffect, useState } from 'react';
import { useTenant } from '../providers/tenant-provider';
import { useTranslations } from 'next-intl';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import Link from 'next/link';

function IframeChecker() {
  const t = useTranslations('common');
  const tenant = useTenant();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    const isInIframe = window.self !== window.top;

    if (isInIframe && !tenant) {
      setShowAlert(true);
    }
  }, [tenant]);

  if (!showAlert) {
    return null;
  }

  return (
    <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('iframe-title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t.rich('iframe-description', {
              email: (chunks) => <Link className="underline" href="mailto:info@wahl.chat">{chunks}</Link>
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{t('iframe-close')}</AlertDialogCancel>
          <Button>
            <Link href="mailto:info@wahl.chat">{t('iframe-contact')}</Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default IframeChecker;
