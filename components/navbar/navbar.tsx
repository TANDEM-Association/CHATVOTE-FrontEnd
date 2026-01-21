import { SparklesIcon } from "lucide-react";

import LoginButton from "@/components/auth/login-button";
import UserAvatar from "@/components/auth/user-avatar";
import EmbedOpenWebsiteButton from "@/components/embed-open-website-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/lib/firebase/firebase-server";
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
      label: "Chatvote Swiper",
      href: "/swiper",
      highlight: true,
      icon: <SparklesIcon className="size-3" />,
    },
    {
      label: "Guide",
      href: "/how-to",
    },
  ];

  const user = await getCurrentUser();
  const userDetails = user ? getUserDetailsFromUser(user) : undefined;

  return (
    <nav
      className={cn(
        "flex flex-col items-center justify-center gap-2 md:flex-row",
        className,
      )}
    >
      {!IS_EMBEDDED ? (
        <>
          {tabs.map((tab) => (
            <NavbarItem key={tab.href} details={tab} />
          ))}
        </>
      ) : (
        <EmbedOpenWebsiteButton />
      )}

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
    </nav>
  );
}
