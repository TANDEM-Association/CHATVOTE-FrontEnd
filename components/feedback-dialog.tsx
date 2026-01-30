import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from './chat/responsive-drawer-dialog';
import { Button } from './ui/button';
import { MailIcon, MessageSquareHeart } from 'lucide-react';
type Props = {
  children: React.ReactNode;
};

async function FeedbackDialog({ children }: Props) {
  const t = await getTranslations('feedback');
  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger asChild>{children}</ResponsiveDialogTrigger>

      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>{t('title')}</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            {t('description')}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <div className="flex w-full flex-col gap-2 p-4 md:p-0">
          <Button asChild variant="outline">
            <Link href="mailto:info@wahl.chat">
              <MailIcon />
              {t('email-button')}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              href="https://forms.fillout.com/t/cGozfJUor9us"
              target="_blank"
            >
              <MessageSquareHeart />
              {t('form-button')}
            </Link>
          </Button>
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export default FeedbackDialog;
