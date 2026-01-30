import {
  AlertCircleIcon,
  AlertTriangleIcon,
  CpuIcon,
  GitBranch,
} from 'lucide-react';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/chat/responsive-drawer-dialog';
import { useTranslations } from 'next-intl';

function AiDisclaimerContent() {
  const t = useTranslations('ai-disclaimer');

  return (
    <div className="px-4 pb-4 md:px-0 md:pb-0 text-sm text-foreground">
      <p>
        {t.rich('introduction', {
          ai: (chunks) => <span className="font-semibold">{chunks}</span>,
          public: (chunks) => <span className="font-semibold">{chunks}</span>,
          programs: (chunks) => <span className="font-semibold">{chunks}</span>,
        })}
      </p>

      <ul className="flex list-inside flex-col gap-4 py-4 *:flex *:items-center *:gap-2">
        <li>
          <CpuIcon className="mr-2 size-6 shrink-0" />
          <span className="inline-block">
            {t.rich('point1', {
              processing: (chunks) => (
                <span className="font-semibold">{chunks}</span>
              ),
              auto: (chunks) => <span className="font-semibold">{chunks}</span>,
            })}
          </span>
        </li>
        <li>
          <AlertCircleIcon className="mr-2 size-6 shrink-0" />
          <span className="inline-block">
            {t.rich('point2', {
              not: (chunks) => <span className="font-semibold">{chunks}</span>,
            })}
          </span>
        </li>
        <li>
          <GitBranch className="mr-2 size-6 shrink-0" />
          <span className="inline-block">
            {t.rich('point3', {
              complex: (chunks) => (
                <span className="font-semibold">{chunks}</span>
              ),
            })}
          </span>
        </li>
        <li>
          <AlertTriangleIcon className="mr-2 size-6 shrink-0" />
          <span className="inline-block">
            {t.rich('point4', {
              inaccuracies: (chunks) => (
                <span className="font-semibold">{chunks}</span>
              ),
              misinterpretations: (chunks) => (
                <span className="font-semibold">{chunks}</span>
              ),
            })}
          </span>
        </li>
      </ul>

      <p>
        {t.rich('conclusion', {
          tool: (chunks) => <span className="font-semibold">{chunks}</span>,
          binding: (chunks) => <span className="font-semibold">{chunks}</span>,
          official: (chunks) => <span className="font-semibold">{chunks}</span>,
        })}
      </p>
    </div>
  );
}

function AiDisclaimer() {
  const t = useTranslations('ai-disclaimer');

  return (
    <ResponsiveDialog>
      <p className="my-2 text-center text-xs text-muted-foreground">
        {t('disclaimer')}{' '}
        <ResponsiveDialogTrigger className="font-semibold underline">
          {t('learn-more')}
        </ResponsiveDialogTrigger>
      </p>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>{t('title')}</ResponsiveDialogTitle>
        </ResponsiveDialogHeader>
        <AiDisclaimerContent />
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export default AiDisclaimer;
