import { useTranslations } from 'next-intl';

import HomeSocialMediaIcon from '@/components/icons/home-social-media-icon';

function ContactCard() {
  const t = useTranslations('home');

  return (
    <div className="flex flex-col rounded-md border border-border">
      <div className="flex grow flex-col justify-between p-4">
        <div>
          <h2 className="font-bold">{t('contact-title')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('contact-description')}
          </p>
        </div>
        <div className="flex flex-row gap-3 items-center mt-4">
          <HomeSocialMediaIcon type="instagram" />
          <HomeSocialMediaIcon type="linkedin" />
          <HomeSocialMediaIcon type="email" />
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
