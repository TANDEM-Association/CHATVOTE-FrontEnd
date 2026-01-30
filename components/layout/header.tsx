import Image from "next/image";
import Link from "next/link";

import EmbedOpenWebsiteButton from "@/components/embed-open-website-button";
import MobileNavbar from "@/components/navbar/mobile-navbar";
import NavBar from "@/components/navbar/navbar";
import { getAuth } from "@/lib/firebase/firebase-server";
import { getUserDetailsFromUser, IS_EMBEDDED } from "@/lib/utils";

export const Header: React.FC = async () => {
  const auth = await getAuth();
  const userDetails = auth.user ? getUserDetailsFromUser(auth.user) : undefined;

  return (
    <header className="border-border bg-background sticky top-0 z-30 border-b px-4 py-2 md:px-0">
      <div className="relative mx-auto flex max-w-xl items-center justify-start gap-2 md:flex-row">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logos/chatvote.svg"
            alt="chatvote"
            width={0}
            height={0}
            sizes="100vw"
            className="size-8 rounded-md md:size-12"
          />
        </Link>

        {IS_EMBEDDED ? (
          <div className="absolute inset-0 flex items-center justify-center md:hidden">
            <EmbedOpenWebsiteButton />
          </div>
        ) : null}

        <MobileNavbar userDetails={userDetails} />
        <NavBar className="hidden md:flex" />
      </div>
    </header>
  );
};
