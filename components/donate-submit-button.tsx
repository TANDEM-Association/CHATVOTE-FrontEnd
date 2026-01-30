"use client";

import { useFormStatus } from "react-dom";

import { Button } from "./ui/button";

type Props = {
  isDisabled: boolean;
};

export const DonateSubmitButton = ({ isDisabled }: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-40 rounded-md border border-neutral-950 dark:border-neutral-100"
      disabled={isDisabled}
      isLoading={pending}
      type="submit"
    >
      Faire un don
    </Button>
  );
};
