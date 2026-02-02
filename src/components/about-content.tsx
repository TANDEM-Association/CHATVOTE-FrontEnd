"use client";

import { useTranslations } from "next-intl";

const AboutContent = () => {
  const t = useTranslations("about");

  return (
    <div>
      <h1>{t("title")}</h1>
    </div>
  );
};

export default AboutContent;
