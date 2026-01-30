'use client';

import {
  ResponsiveDialogDescription,
  ResponsiveDialogTitle,
} from '@/components/chat/responsive-drawer-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

type Props = {
  onChangeView: () => void;
};

function PasswordResetForm({ onChangeView }: Props) {
  const t = useTranslations('auth');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    setIsLoading(false);
    toast.success(t('password-reset-email-sent'));

    onChangeView();
  };

  return (
    <form className="flex flex-col p-4 md:p-0" onSubmit={handleSubmit}>
      <div className="mb-4">
        <ResponsiveDialogTitle className="text-center text-2xl font-bold md:text-left">
          {t('forgot-password-title')}
        </ResponsiveDialogTitle>
        <ResponsiveDialogDescription className="text-center text-sm text-muted-foreground md:text-left">
          {t('forgot-password-description')}
        </ResponsiveDialogDescription>
      </div>

      <div className="flex flex-col gap-4">
        <div className="mt-4 grid gap-1">
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t('email-placeholder')}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {t('send-link')}
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        {t('already-have-account')}{' '}
        <Button
          size="sm"
          type="button"
          variant="link"
          onClick={onChangeView}
          className="p-0 underline underline-offset-4"
        >
          {t('login')}
        </Button>
      </div>
    </form>
  );
}

export default PasswordResetForm;
