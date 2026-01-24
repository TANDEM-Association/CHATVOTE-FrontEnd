"use client";

import React, { useState } from "react";

import { getAuth, signOut } from "firebase/auth";
import { LogOutIcon } from "lucide-react";

import { useAnonymousAuth } from "@/components/anonymous-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { type UserDetails } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  details?: UserDetails;
};

const UserDialog = ({ children, details }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAnonymousAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const auth = getAuth();
    await signOut(auth);
    setIsOpen(false);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <div onClick={() => setIsOpen(true)}>{children}</div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-full max-w-md p-6"
      >
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Compte</h2>
          <p className="text-muted-foreground text-sm">
            Consultez vos informations personnelles ici.
          </p>
        </div>

        <section className="flex flex-col gap-4">
          {details?.displayName ? (
            <div className="flex flex-col gap-2">
              <Label htmlFor="displayName">Name</Label>
              <Input
                disabled
                id="displayName"
                type="text"
                value={details.displayName}
              />
            </div>
          ) : null}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input disabled id="email" type="email" value={user?.email ?? ""} />
          </div>
        </section>

        <div className="mt-4">
          <Button
            onClick={handleLogout}
            className="w-full"
            disabled={isLoading}
          >
            <LogOutIcon className="size-4" />
            Déconnexion
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default UserDialog;
