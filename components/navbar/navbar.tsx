import React from "react";

import LoginButton from "@/components/auth/login-button";
import UserAvatar from "@/components/auth/user-avatar";
import EmbedOpenWebsiteButton from "@/components/embed-open-website-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAuth } from "@/lib/firebase/firebase-server";
import { cn, getUserDetailsFromUser, IS_EMBEDDED } from "@/lib/utils";

import NavbarItem from "./navbar-item";
import { type NavbarItemDetails } from "./navbar-item";

type Props = {
  className?: string;
};

export default async function NavBar({ className }: Props) {
  const tabs: NavbarItemDetails[] = [
    {
      label: "Accueil",
      href: "/",
    },
    {
      label: "Guide",
      href: "/how-to",
    },
  ];

  const auth = await getAuth();
  const userDetails = auth.user ? getUserDetailsFromUser(auth.user) : undefined;

  return (
    <nav
      className={cn(
        "flex flex-col items-center justify-between md:w-full md:flex-row",
        className,
      )}
    >
      <div className="flex w-full items-center">
        {!IS_EMBEDDED ? (
          <React.Fragment>
            {tabs.map((tab) => {
              return <NavbarItem key={tab.href} details={tab} />;
            })}
          </React.Fragment>
        ) : (
          <EmbedOpenWebsiteButton />
        )}
      </div>

      <div className="flex w-full items-center justify-end">
        <Separator orientation="vertical" className="hidden h-8 md:block" />
        <LoginButton
          userDetails={userDetails}
          noUserChildren={
            <Button variant="default" size="sm">
              Se connecter
            </Button>
          }
          userChildren={<UserAvatar details={userDetails} />}
        />
      </div>
    </nav>
  );
}
