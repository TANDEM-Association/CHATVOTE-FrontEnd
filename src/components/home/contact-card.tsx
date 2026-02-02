"use client";

import HomeSocialMediaIcon from "@components/icons/home-social-media-icon";
import { useTranslations } from "next-intl";

const ContactCard = () => {
  const t = useTranslations("home");

  return (
    <div className="border-border flex flex-col rounded-md border">
      <div className="flex grow flex-col justify-between p-4">
        <div>
          <h2 className="font-bold">{t("stayInformed")}</h2>
          <p className="text-muted-foreground text-sm">
            {t("stayInformedDescription")}
          </p>
        </div>
        <div className="mt-4 flex flex-row items-center gap-3">
          <HomeSocialMediaIcon type="instagram" />
          <HomeSocialMediaIcon type="linkedin" />
          <HomeSocialMediaIcon type="email" />
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
