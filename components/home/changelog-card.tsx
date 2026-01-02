import { useTranslations } from 'next-intl';

function ChangelogCard() {
  const t = useTranslations('home');
  return (
    <div className="relative mt-4 flex w-full flex-row items-center gap-4 rounded-md border border-muted-foreground/20 bg-muted-foreground/5 p-4 text-xs">
      <div className="flex flex-col gap-1">
        <h1 className="text-sm font-semibold">{t('changelog-title')}</h1>
        <p className="text-muted-foreground">
          {t.rich('changelog-description', { b: (chunks) => <b>{chunks}</b> })}
        </p>
      </div>
    </div>
  );
}

export default ChangelogCard;
