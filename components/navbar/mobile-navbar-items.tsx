import LoginButton from "@/components/auth/login-button";
import UserAvatar from "@/components/auth/user-avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, type UserDetails } from "@/lib/utils";

import NavbarItem from "./navbar-item";
import { type NavbarItemDetails } from "./navbar-item";

type Props = {
  userDetails?: UserDetails;
  mobileClose?: () => void;
};

function MobileNavbarItems({ userDetails, mobileClose }: Props) {
  const tabs: NavbarItemDetails[] = [
    {
      label: "Accueil",
      href: "/",
    },
    {
      label: "Guide",
      href: "/how-to",
    },
    {
      label: "Soutenez-nous",
      href: "/donate",
    },
    {
      label: "À propos",
      href: "/about-us",
    },
  ];

  return (
    <nav
      className={cn(
        "flex flex-col items-center justify-center gap-2 md:flex-row",
      )}
    >
      {tabs.map((tab) => (
        <NavbarItem key={tab.href} details={tab} mobileClose={mobileClose} />
      ))}

      <Separator orientation="horizontal" className="my-4 w-1/2" />
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

export default MobileNavbarItems;
