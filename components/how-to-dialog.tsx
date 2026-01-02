import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from './chat/responsive-drawer-dialog';
import HowTo from './how-to';
import { useTranslations } from 'next-intl';

type Props = {
  children: React.ReactNode;
};

function HowToDialog({ children }: Props) {
  const t = useTranslations('how-to');

  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger asChild>{children}</ResponsiveDialogTrigger>
      <ResponsiveDialogContent className="flex flex-col max-h-[95dvh] overflow-hidden">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>
            {t.rich('dialog-title', {
              underline: (chunks) => (
                <span className="underline">{chunks}</span>
              ),
            })}
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            {t('dialog-description')}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <div className="px-4 md:px-0 overflow-y-auto grow">
          <HowTo />
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export default HowToDialog;
