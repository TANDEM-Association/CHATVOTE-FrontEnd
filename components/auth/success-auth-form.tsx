import { track } from "@vercel/analytics/react";
import { HeartHandshakeIcon, XIcon } from "lucide-react";

import { useAnonymousAuth } from "@/components/anonymous-auth";
import { Button } from "@/components/ui/button";
import { userAllowNewsletter } from "@/lib/firebase/firebase";

type Props = {
  onSuccess: () => void;
};

function SuccessAuthForm({ onSuccess }: Props) {
  const { user } = useAnonymousAuth();

  const handleSubscribe = async () => {
    track("newsletter_subscribe");
    if (user) {
      await userAllowNewsletter(user.uid, true);
    }

    onSuccess();
  };

  const handleUnsubscribe = async () => {
    track("newsletter_unsubscribe");

    if (user) {
      await userAllowNewsletter(user.uid, false);
    }

    onSuccess();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-bold">
          S&lsquo;abonner à la newsletter ?
        </h1>
        <p className="text-muted-foreground text-center text-sm">
          Pouvons-nous vous envoyer de temps en temps un e-mail avec les
          nouveautés de chatvote ?
        </p>
      </div>
      <div className="grid w-full grid-cols-2 gap-2">
        <Button onClick={handleSubscribe}>
          <HeartHandshakeIcon />
          Oui
        </Button>
        <Button variant="outline" onClick={handleUnsubscribe}>
          <XIcon />
          Non
        </Button>
      </div>
    </div>
  );
}

export default SuccessAuthForm;
