'use client';
import { MailCheckIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Logo from '@/components/chat/logo';
import { Input } from '../ui/input';
import { type FullUser, useAnonymousAuth } from '../anonymous-auth';
import { toast } from 'sonner';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

type Props = {
  initialUser: FullUser | null;
};

function KeepUpToDateTeaserCard({ initialUser }: Props) {
  const t = useTranslations('home');
  const { user, updateUser } = useAnonymousAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('email') as string;

    toast.promise(handleAddEmail(email), {
      loading: t('keep-up-to-date-loading'),
      success: t('keep-up-to-date-success'),
      error: t('keep-up-to-date-error'),
      duration: 5000,
    });
  };

  const handleAddEmail = async (email: string) => {
    if (!user) {
      throw new Error('User not found');
    }
    await updateUser({ keep_up_to_date_email: email });
  };

  const normalizedKeepUpToDateEmail = useMemo(() => {
    if (!user?.keep_up_to_date_email) {
      return initialUser?.keep_up_to_date_email ?? null;
    }

    return user.keep_up_to_date_email;
  }, [user, initialUser]);

  if (normalizedKeepUpToDateEmail) {
    return null;
  }

  return (
    <div className="relative mt-4 flex flex-col gap-2 overflow-hidden rounded-md border border-border bg-muted p-4">
      <div className="flex items-center gap-4">
        <Logo variant="small" className="size-6" />
        <div className="flex flex-col">
          <h1 className="text-base font-bold">{t('coalition-title')}</h1>
          <p className="text-sm text-muted-foreground">
            {t('coalition-subtitle')}
          </p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {t('keep-up-to-date-description')}
      </p>

      <form className="flex flex-col gap-2 md:flex-row" onSubmit={handleSubmit}>
        <Input
          name="email"
          placeholder={t('email-placeholder')}
          type="email"
          autoComplete="email"
          autoCapitalize="off"
          spellCheck="false"
          required
        />

        <Button type="submit">
          <MailCheckIcon />
          {t('notify-me')}
        </Button>
      </form>
    </div>
  );
}

export default KeepUpToDateTeaserCard;
