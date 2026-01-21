import Link from "next/link";

import Logo from "@/components/chat/logo";
import { getCurrentUser } from "@/lib/firebase/firebase-server";
import { getUserDetailsFromUser, IS_EMBEDDED } from "@/lib/utils";

import ChatvoteSwiperTeaserTag from "./chatvote-swiper/chatvote-swiper-teaser-tag";
import MobileNavbar from "./navbar/mobile-navbar";
import NavBar from "./navbar/navbar";
import EmbedOpenWebsiteButton from "./embed-open-website-button";

async function Header() {
  const user = await getCurrentUser();
  const userDetails = user ? getUserDetailsFromUser(user) : undefined;

  return (
    <header className="border-border bg-background sticky top-0 z-30 border-b px-4 py-2 md:px-0">
      <div className="relative mx-auto flex max-w-xl items-center justify-between gap-2 md:flex-row">
        <Link href="/">
          <Logo className="size-12 md:size-16" />
        </Link>

        {IS_EMBEDDED ? (
          <div className="absolute inset-0 flex items-center justify-center md:hidden">
            <EmbedOpenWebsiteButton />
          </div>
        ) : (
          <ChatvoteSwiperTeaserTag />
        )}

        <MobileNavbar userDetails={userDetails} />
        <NavBar className="hidden md:flex" />
      </div>
    </header>
  );
}

export default Header;
