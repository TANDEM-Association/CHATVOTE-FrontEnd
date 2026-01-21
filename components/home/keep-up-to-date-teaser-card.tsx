"use client";

import { useMemo } from "react";

import { MailCheckIcon } from "lucide-react";
import { toast } from "sonner";

import Logo from "@/components/chat/logo";

import { type FullUser, useAnonymousAuth } from "../anonymous-auth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
  initialUser: FullUser | null;
};

function KeepUpToDateTeaserCard({ initialUser }: Props) {
  const { user, updateUser } = useAnonymousAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;

    toast.promise(handleAddEmail(email), {
      loading: "Un moment, nous ajoutons votre e-mail...",
      success:
        "Merci ! Nous vous informerons lorsque les programmes seront disponibles.",
      error: "Une erreur s&lsquo;est produite. Veuillez réessayer plus tard.",
      duration: 5000,
    });
  };

  const handleAddEmail = async (email: string) => {
    if (!user) {
      throw new Error("User not found");
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
    <div className="border-border bg-muted relative mt-4 flex flex-col gap-2 overflow-hidden rounded-md border p-4">
      <div className="flex items-center gap-4">
        <Logo variant="small" className="size-6" />
        <div className="flex flex-col">
          <h1 className="text-base font-bold">Les programmes électoraux !</h1>
          <p className="text-muted-foreground text-sm">
            Bientôt sur <span className="font-bold">chatvote</span>
          </p>
        </div>
      </div>

      <p className="text-muted-foreground text-sm">
        Partagez votre e-mail pour être notifié lorsque les programmes seront
        disponibles sur chatvote.
      </p>

      <form className="flex flex-col gap-2 md:flex-row" onSubmit={handleSubmit}>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          autoComplete="email"
          autoCapitalize="off"
          spellCheck="false"
          required
        />

        <Button type="submit">
          <MailCheckIcon />
          Me notifier
        </Button>
      </form>
    </div>
  );
}

export default KeepUpToDateTeaserCard;
