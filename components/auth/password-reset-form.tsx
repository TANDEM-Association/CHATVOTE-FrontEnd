import { useState } from "react";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  onChangeView: () => void;
};

const PasswordResetForm = ({ onChangeView }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    setIsLoading(false);
    toast.success("E-mail de réinitialisation du mot de passe envoyé.");

    onChangeView();
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="mb-4">
        <h2 className="text-center text-2xl font-bold md:text-left">
          Mot de passe oublié ?
        </h2>
        <p className="text-muted-foreground text-center text-sm md:text-left">
          Entrez votre e-mail et nous vous enverrons un lien pour réinitialiser
          votre mot de passe.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="mt-4 grid gap-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jean@exemple.fr"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          Envoyer le lien
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Vous avez déjà un compte ?{" "}
        <Button
          size="sm"
          type="button"
          variant="link"
          onClick={onChangeView}
          className="p-0 underline underline-offset-4"
        >
          Se connecter
        </Button>
      </div>
    </form>
  );
};

export default PasswordResetForm;
