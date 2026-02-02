"use client";

import { useMemo } from "react";

import Image from "next/image";

import { MailCheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { useAuth, type User } from "../anonymous-auth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
  initialUser: User | null;
};

function KeepUpToDateTeaserCard({ initialUser }: Props) {
  const t = useTranslations("home");
  const { user, updateUser } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;

    toast.promise(handleAddEmail(email), {
      loading: t("newsletter.loading"),
      success: t("newsletter.success"),
      error: t("newsletter.error"),
      duration: 5000,
    });
  };

  const handleAddEmail = async (email: string) => {
    if (user === null) {
      throw new Error("User not found");
    }
    await updateUser({ keep_up_to_date_email: email });
  };

  const normalizedKeepUpToDateEmail = useMemo(() => {
    if (
      user?.keep_up_to_date_email === null ||
      user?.keep_up_to_date_email === undefined
    ) {
      return initialUser?.keep_up_to_date_email ?? null;
    }

    return user.keep_up_to_date_email;
  }, [user, initialUser]);

  if (normalizedKeepUpToDateEmail !== null) {
    return null;
  }

  return (
    <div className="border-border bg-muted relative mt-4 flex flex-col gap-2 overflow-hidden rounded-md border p-4">
      <div className="flex items-center gap-4">
        <Image
          src="/images/logos/chatvote.svg"
          alt="chatvote"
          width={0}
          height={0}
          sizes="100vw"
          className="size-6"
        />
        <div className="flex flex-col">
          <h1 className="text-base font-bold">{t("keepUpToDate.title")}</h1>
          <p className="text-muted-foreground text-sm">
            {t("keepUpToDate.subtitle")}{" "}
            <span className="font-bold">chatvote</span>
          </p>
        </div>
      </div>

      <p className="text-muted-foreground text-sm">
        {t("keepUpToDate.description")}
      </p>

      <form className="flex flex-col gap-2 md:flex-row" onSubmit={handleSubmit}>
        <Input
          name="email"
          placeholder={t("keepUpToDate.emailPlaceholder")}
          type="email"
          autoComplete="email"
          autoCapitalize="off"
          spellCheck="false"
          required
        />

        <Button type="submit">
          <MailCheckIcon />
          {t("keepUpToDate.notifyMe")}
        </Button>
      </form>
    </div>
  );
}

export default KeepUpToDateTeaserCard;
